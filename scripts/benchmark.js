const http = require('http');
const { spawn } = require('child_process');
const { rmSync } = require('fs');
const { rm } = require('fs/promises');

function sleep(s) {
  return new Promise((resolve) => {
    setTimeout(resolve, s * 1000);
  });
}

function measureStartTime(cmd, args) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const child = spawn(cmd, args, { cwd: process.cwd() });

    const port = 8080;
    const server = http
      .createServer(() => {
        const end = Date.now();
        server.closeAllConnections();
        server.close();
        child.kill();
        resolve((end - start) / 1000);
        return;
      })
      .listen(port);
  });
}

function measureBuildTime(cmd, args) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const child = spawn(cmd, args, { cwd: process.cwd() });
    child.on('exit', () => {
      const end = Date.now();
      resolve((end - start) / 1000);
    });
  });
}

async function benchmark() {
  // Vite
  await rm('./node_modules/.vite', { recursive: true, force: true });
  await measureStartTime('./node_modules/.bin/vite', ['--open']).then((s) =>
    console.log(`vite cold start ${s}s`)
  );
  await sleep(3);
  await measureStartTime('./node_modules/.bin/vite', ['--open']).then((s) =>
    console.log(`vite warm start ${s}s`)
  );
  await sleep(3);
  await rm('./node_modules/.vite', { recursive: true, force: true });
  await measureBuildTime('./node_modules/.bin/vite', ['build']).then((s) =>
    console.log(`vite prod build ${s}s`)
  );
  await sleep(3);

  // Parcel
  await rm('./.parcel-cache', { recursive: true, force: true });
  await measureStartTime('./node_modules/.bin/parcel', [
    'codebase/index.html',
    '--open',
  ]).then((s) => console.log(`parcel cold start ${s}s`));
  await sleep(3);
  await measureStartTime('./node_modules/.bin/parcel', [
    'codebase/index.html',
    '--open',
  ]).then((s) => console.log(`parcel warm start ${s}s`));
  await sleep(3);
  await rm('./.parcel-cache', { recursive: true, force: true });
  await measureBuildTime('./node_modules/.bin/parcel', [
    'build',
    'codebase/index.html',
  ]).then((s) => console.log(`parcel prod build ${s}s`));
}

benchmark();
