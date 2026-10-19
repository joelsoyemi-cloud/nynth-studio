import type {Metadata} from 'next';
import './studio.css';
export const metadata:Metadata={title:'NYNTH Studio',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';
export default function Layout({children}:{children:React.ReactNode}){return <div className="studio-shell">{children}</div>;}
