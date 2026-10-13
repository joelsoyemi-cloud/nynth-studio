import fs from 'node:fs';
const targets = await (await fetch('http://127.0.0.1:9224/json/list')).json();
const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
await new Promise(resolve => ws.addEventListener('open', resolve, { once: true }));
let id = 0;
const pending = new Map();
const errors = [];
ws.addEventListener('message', event => {
  const data = JSON.parse(event.data);
  if (data.id) { const request = pending.get(data.id); pending.delete(data.id); if (data.error) request.reject(data.error); else request.resolve(data.result); }
  if (data.method === 'Runtime.exceptionThrown') errors.push(data.params.exceptionDetails.text);
  if (data.method === 'Log.entryAdded' && data.params.entry.level === 'error') errors.push(data.params.entry.text);
});
function send(method, params = {}) { return new Promise((resolve, reject) => { const key = ++id; pending.set(key, { resolve, reject }); ws.send(JSON.stringify({ id: key, method, params })); }); }
async function evaluate(expression) { const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }); if (result.exceptionDetails) throw new Error(result.exceptionDetails.text); return result.result.value; }
await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
async function navigate(path) { await send('Page.navigate', { url: `http://127.0.0.1:3100${path}` }); await sleep(1800); await evaluate('document.fonts.ready.then(()=>true)'); }
fs.mkdirSync('artifacts/phase1', { recursive: true });
const results = [];
for (const width of process.argv.includes('--interactions') ? [] : [1440, 768, 390]) {
  await send('Emulation.setDeviceMetricsOverride', { width, height: 960, deviceScaleFactor: 1, mobile: width < 500 });
  for (const path of ['/', '/stories', '/stories/winners', '/stories/newman', '/stories/michael-spyder']) {
    await navigate(path);
    results.push({ width, path, ...await evaluate(`({title:document.title,overflow:document.documentElement.scrollWidth>innerWidth,heading:document.querySelector('h1')?.textContent,images:[...document.querySelectorAll('.article-image')].map(i=>({src:i.src,natural:[i.naturalWidth,i.naturalHeight],rendered:[i.width,i.height],fit:getComputedStyle(i).objectFit,left:i.getBoundingClientRect().left,headingLeft:document.querySelector('h1').getBoundingClientRect().left})),broken:[...document.images].filter(i=>i.loading!=='lazy'&&i.complete&&!i.naturalWidth).map(i=>i.src)})`) });
    const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
    fs.writeFileSync(`artifacts/phase1/${width}-${path === '/' ? 'home' : path.replaceAll('/', '-')}.png`, Buffer.from(screenshot.data, 'base64'));
  }
}
await navigate('/stories');
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 960, deviceScaleFactor: 1, mobile: true });
await evaluate(`[...document.querySelectorAll('.filters button')].find(b=>b.textContent==='The founder').click()`);
await sleep(250);
results.push({ filters: await evaluate(`({pressed:document.querySelector('[aria-pressed=true]').textContent,visible:[...document.querySelectorAll('.story-grid>div')].filter(d=>!d.hidden).length})`) });
await navigate('/');
await send('Page.bringToFront');
await evaluate(`document.querySelector('.mobile-menu summary').focus()`);
await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: ' ', code: 'Space', windowsVirtualKeyCode: 32 });
await send('Input.dispatchKeyEvent', { type: 'keyUp', key: ' ', code: 'Space', windowsVirtualKeyCode: 32 });
await sleep(200);
results.push({ keyboardMenu: await evaluate(`document.querySelector('.mobile-menu').open`) });
await evaluate(`[...document.querySelectorAll('button')].find(b=>b.textContent==='Share your perspective').click()`);
results.push({ dialog: await evaluate(`({open:document.querySelector('dialog').open,focus:document.activeElement.tagName})`) });
await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
await sleep(200);
results.push({ dialogClosed: await evaluate(`!document.querySelector('dialog').open`) });
await evaluate(`[...document.querySelectorAll('.filters button')].find(b=>b.textContent==='Drops').click()`);
await sleep(200);
results.push({ piecesFilter: await evaluate(`({visible:[...document.querySelectorAll('.stories>div')].filter(d=>!d.hidden).length,title:[...document.querySelectorAll('.stories>div')].find(d=>!d.hidden).textContent})`) });
await evaluate(`document.querySelector('#email').value='preview@example.com';document.querySelector('.subscribe').requestSubmit()`);
await sleep(200);
results.push({ newsletterDemo: await evaluate(`document.querySelector('.newsletter .form-note').textContent.includes('No email was saved or sent')`) });
await evaluate(`[...document.querySelectorAll('button')].find(b=>b.textContent==='Share your perspective').click();document.querySelector('#creator-name').value='Preview';document.querySelector('#pitch-title').value='Test perspective';document.querySelector('#pitch').value='Preview only';document.querySelector('dialog form').requestSubmit()`);
await sleep(200);
results.push({ contributionDemo: await evaluate(`document.querySelector('dialog').textContent.includes('Nothing has been sent or saved')`) });
await evaluate(`document.querySelector('dialog').close()`);
await evaluate(`Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{});})).then(()=>true)`);
results.push({ homepageImages: await evaluate(`[...document.images].map(i=>({src:i.src,natural:[i.naturalWidth,i.naturalHeight]}))`) });
await send('Runtime.evaluate', { expression: 'document.querySelector("#our-stories").scrollIntoView()' });
await sleep(200);
const lowerScreenshot = await send('Page.captureScreenshot', { format: 'png' });
fs.writeFileSync('artifacts/phase1/mobile-people.png', Buffer.from(lowerScreenshot.data, 'base64'));
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await navigate('/');
results.push({ reducedMotion: await evaluate(`({matches:matchMedia('(prefers-reduced-motion:reduce)').matches,text:document.querySelector('.decrypt').textContent,transition:getComputedStyle(document.querySelector('.card img')).transitionDuration})`) });
await send('Emulation.setScriptExecutionDisabled', { value: true });
await navigate('/stories/winners');
results.push({ noJs: await evaluate(`document.querySelector('.article-body').textContent.includes('Some pieces say everything')`) });
await send('Emulation.setScriptExecutionDisabled', { value: false });
for (const path of ['/stories/missing-story','/reference/admin.html', '/stories/city','/stories/culture','/stories/details','/stories/white','/stories/uniform','/stories/sound','/stories/nynth-perspective']) {
 const response = await fetch(`http://127.0.0.1:3100${path}`); results.push({ path, status: response.status });
}
fs.writeFileSync(`artifacts/phase1/${process.argv.includes('--interactions') ? 'interactions' : 'results'}.json`, JSON.stringify({ results, errors }, null, 2));
console.log(JSON.stringify({ results, errors }, null, 2)); ws.close();
if (errors.length || results.some(r => r.overflow || r.broken?.length || r.keyboardMenu === false || r.noJs === false || r.dialogClosed === false || r.newsletterDemo === false || r.contributionDemo === false)) process.exitCode = 1;
