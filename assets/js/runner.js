/* Pure JS runs in a disposable Worker. DOM examples run in an opaque sandbox. */
(() => {
  function runtime() {
    const format = value => {
      if (typeof value === 'string') return value;
      if (typeof value === 'undefined') return 'undefined';
      if (typeof value === 'bigint') return value + 'n';
      if (typeof value === 'number' && !Number.isFinite(value)) return String(value);
      if (typeof value === 'function') return '[Function ' + (value.name || 'anonymous') + ']';
      if (typeof value === 'symbol') return String(value);
      if (value instanceof Error) return value.name + ': ' + value.message;
      try { return JSON.stringify(value, (_, v) => typeof v === 'bigint' ? v + 'n' : v); }
      catch { return '[Circular object]'; }
    };
    return format;
  }
  const formatSource = runtime.toString();
  const workerSource = `
    const format = (${formatSource})();
    let lines = 0, pending = 0, finished = false;
    const send = (type, text) => self.postMessage({type,text});
    const output = (...args) => { if(lines++ < 200) send('log',args.map(format).join(' ').slice(0,12000)); };
    self.console = {log:output,info:output,warn:output,error:output,debug:output,table:output,clear:()=>send('clear','')};
    const nativeTimeout = self.setTimeout.bind(self);
    const nativeClear = self.clearTimeout.bind(self);
    const nativeInterval = self.setInterval.bind(self);
    const timers = new Set();
    const check = () => { if (finished && pending === 0) nativeTimeout(()=>send('done',''),0); };
    self.setTimeout = (fn,delay,...args) => {
      pending++;
      const id = nativeTimeout(()=>{ timers.delete(id); try{fn(...args);}catch(e){send('error',e.name+': '+e.message);}finally{pending--;check();}},delay);
      timers.add(id); return id;
    };
    self.clearTimeout = id => { if(timers.delete(id)) pending--; nativeClear(id); check(); };
    self.setInterval = (fn,delay,...args) => {
      pending++;
      const id = nativeInterval(()=>{try{fn(...args);}catch(e){send('error',e.name+': '+e.message);}},delay);
      timers.add(id);return id;
    };
    self.clearInterval = self.clearTimeout;
    self.addEventListener('unhandledrejection', e=>{e.preventDefault();send('error',format(e.reason));});
    self.onmessage = async event => {
      try {
        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        await new AsyncFunction('"use strict";\\n' + event.data.code)();
        finished = true; check();
      } catch(e) {send('error',e.name+': '+e.message); send('done','');}
    };
  `;
  let worker = null, workerURL = null, timer = null, messageHandler = null, frame = null, generation = 0;
  function stop() {
    generation++;
    if (worker) worker.terminate();
    if (workerURL) URL.revokeObjectURL(workerURL);
    clearTimeout(timer);
    if (messageHandler) window.removeEventListener('message', messageHandler);
    if (frame) { frame.srcdoc = ''; frame = null; }
    worker = workerURL = messageHandler = timer = null;
  }
  function runJS(code, onEvent) {
    stop();
    const current = generation;
    try {
      workerURL = URL.createObjectURL(new Blob([workerSource], {type:'text/javascript'}));
      worker = new Worker(workerURL);
      worker.onmessage = event => {
        if (current !== generation) return;
        onEvent(event.data);
        if (event.data.type === 'done') stop();
      };
      worker.onerror = event => { onEvent({type:'error',text:event.message}); onEvent({type:'done'}); stop(); };
      timer = setTimeout(() => { stop(); onEvent({type:'error',text:'หยุดการรันเมื่อเกิน 2 วินาที ตรวจลูปหรือ Promise ที่ยังไม่จบ'}); onEvent({type:'done'}); }, 2000);
      worker.postMessage({code});
    } catch (e) { stop(); onEvent({type:'error',text:e.message}); onEvent({type:'done'}); }
  }
  function runDOM(code, html, target, onEvent) {
    stop();
    frame = target;
    const token = 'study-' + Math.random().toString(36).slice(2);
    let lines = 0;
    const current = generation;
    messageHandler = event => {
      if (current !== generation || event.source !== target.contentWindow || event.data?.token !== token) return;
      if (++lines <= 200 || event.data.type === 'done') onEvent(event.data);
      if(event.data.type === 'done') clearTimeout(timer);
    };
    window.addEventListener('message', messageHandler);
    const payload = JSON.stringify(code).replace(/</g, '\\u003c');
    const script = `const format=(${formatSource})();const send=(type,text)=>parent.postMessage({token:${JSON.stringify(token)},type,text},'*');
      const output=(...args)=>send('log',args.map(format).join(' ').slice(0,12000));
      console.log=console.info=console.warn=console.error=output;
      window.alert=(value)=>output('alert:',value);
      window.addEventListener('error',e=>{e.preventDefault();send('error',e.message);});
      window.addEventListener('unhandledrejection',e=>{e.preventDefault();send('error',format(e.reason));});
      (async()=>{try{const AF=Object.getPrototypeOf(async function(){}).constructor;await new AF(${payload})();send('done','');}catch(e){send('error',e.name+': '+e.message);send('done','');}})();`;
    target.srcdoc = `<!doctype html><html lang="th"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval'; style-src 'unsafe-inline'; img-src data:; form-action 'none'; base-uri 'none'"><style>body{font:15px/1.8 Tahoma,sans-serif;color:#28382f;padding:16px;margin:0}button,input{font:inherit;padding:7px 12px}button{cursor:pointer;border:1px solid #bbc9b3;border-radius:5px;background:#e7eddf}button:disabled{opacity:.5}h3{margin:0 0 15px}li{margin:8px 0}</style></head><body>${html}<script>${script}<\/script></body></html>`;
    timer = setTimeout(()=>{onEvent({type:'error',text:'ตัวอย่าง DOM ยังไม่จบ กดหยุดหรือเริ่มใหม่ได้'});},2000);
  }
  window.StudyRunner = {runJS, runDOM, stop};
})();
