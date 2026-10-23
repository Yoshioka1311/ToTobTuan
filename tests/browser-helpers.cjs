const path=require('node:path'),{pathToFileURL}=require('node:url');
const {chromium}=require(process.env.STUDY_PLAYWRIGHT||path.join(process.env.USERPROFILE,'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
const root=path.resolve(__dirname,'..'),base=pathToFileURL(path.join(root,'index.html')).href;
async function launch(){return chromium.launch({headless:true,...(process.env.STUDY_BROWSER?{executablePath:process.env.STUDY_BROWSER}:{channel:'msedge'})});}
async function go(page,hash){await page.goto(base+hash);await page.waitForFunction(h=>document.querySelector('#main')?.dataset.route===h,hash);}
module.exports={launch,go,root,base};
