-- Dedicated NYNTH project only. Membership is provisioned by a trusted operator.
create table public.editorial_members (
 user_id uuid primary key references auth.users(id) on delete cascade,
 role text not null check (role in ('admin','contributor'))
);
alter table public.editorial_members enable row level security;
grant select on public.editorial_members to authenticated;
revoke all on public.editorial_members from anon;
revoke insert,update,delete on public.editorial_members from authenticated;
create policy member_reads_own_role on public.editorial_members for select to authenticated using (user_id=(select auth.uid()));

create table public.journal_stories (
 id text primary key check (id ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and length(id)<=100),
 author_id uuid not null references auth.users(id),
 title text not null check (length(title) between 1 and 200),
 summary text not null default '' check(length(summary)<=600),
 body text[] not null check(cardinality(body)>0 and length(array_to_string(body,''))<=60000),
 category text not null check(length(category) between 1 and 80),
 section text not null check(section in ('people','pieces')),
 edit text check(edit in ('Lookbook','Drops','Studio') or edit is null),
 image text check(image ~ '^https://' or image is null),
 alt text not null default '' check(length(alt)<=500),
 cover_path text,
 status text not null default 'draft' check(status in ('draft','submitted','published')),
 featured boolean not null default false,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create index journal_public_order on public.journal_stories(featured desc,updated_at desc) where status='published';
create index journal_author on public.journal_stories(author_id);
alter table public.journal_stories enable row level security;
grant select on public.journal_stories to anon;
grant select,insert,update on public.journal_stories to authenticated;
revoke delete on public.journal_stories from anon,authenticated;
create policy public_reads_published on public.journal_stories for select to anon,authenticated using(status='published');
create policy member_reads_drafts on public.journal_stories for select to authenticated using (
 exists(select 1 from public.editorial_members m where m.user_id=(select auth.uid()) and (m.role='admin' or author_id=m.user_id))
);
create policy member_inserts on public.journal_stories for insert to authenticated with check (
 author_id=(select auth.uid()) and exists(select 1 from public.editorial_members m where m.user_id=(select auth.uid()) and (m.role='admin' or (status in ('draft','submitted') and not featured and (cover_path is null or split_part(cover_path,'/',1)=m.user_id::text))))
);
create policy admin_updates on public.journal_stories for update to authenticated using (
 exists(select 1 from public.editorial_members m where m.user_id=(select auth.uid()) and m.role='admin')
) with check (
 exists(select 1 from public.editorial_members m where m.user_id=(select auth.uid()) and m.role='admin')
);
create policy contributor_updates_own on public.journal_stories for update to authenticated using (
 author_id=(select auth.uid()) and status in ('draft','submitted') and exists(select 1 from public.editorial_members m where m.user_id=(select auth.uid()) and m.role='contributor')
) with check (
 author_id=(select auth.uid()) and status in ('draft','submitted') and not featured and (cover_path is null or split_part(cover_path,'/',1)=(select auth.uid())::text) and exists(select 1 from public.editorial_members m where m.user_id=(select auth.uid()) and m.role='contributor')
);

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('journal-media','journal-media',false,3145728,array['image/jpeg','image/png','image/webp']);
create policy editor_uploads on storage.objects for insert to authenticated with check (
 bucket_id='journal-media' and (storage.foldername(name))[1]=(select auth.uid())::text and exists(select 1 from public.editorial_members m where m.user_id=(select auth.uid()))
);
create policy editor_reads_media on storage.objects for select to authenticated using (
 bucket_id='journal-media' and exists(select 1 from public.editorial_members m where m.user_id=(select auth.uid()) and (m.role='admin' or (storage.foldername(name))[1]=m.user_id::text))
);
create policy public_reads_published_covers on storage.objects for select to anon,authenticated using (
 bucket_id='journal-media' and exists(select 1 from public.journal_stories s where s.cover_path=name and s.status='published')
);
