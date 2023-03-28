const http = require('http');
const { spawn } = require('child_process');
const echarts = require('echarts');
const { rm, writeFile } = require('fs/promises');

function sleep(s) {
  return new Promise((resolve) => {
    setTimeout(resolve, s * 1000);
  });
}

function measureStartTime(cmd, args) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const child = spawn(cmd, args, { cwd: process.cwd() });

    const port = 3456;
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
    const child = spawn(cmd, args, {
      cwd: process.cwd(),
      env: { ...process.env, NODE_ENV: 'production' },
    });
    child.on('exit', () => {
      const end = Date.now();
      resolve((end - start) / 1000);
    });
  });
}

async function benchmark() {

  const isWindows = os.platform() === 'win32';
  const cmdExt = isWindows ? '.cmd' : '';

  // Define command file paths
  const rspackCmd = `./node_modules/.bin/rspack${cmdExt}`;
  const viteCmd = `./node_modules/.bin/vite${cmdExt}`;
  const parcelCmd = `./node_modules/.bin/parcel${cmdExt}`;
  const webpackDevServerCmd = `./node_modules/.bin/webpack-dev-server${cmdExt}`;
  const webpackCmd = `./node_modules/.bin/webpack${cmdExt}`;


  // Rspack
  await rm('./node_modules/.ignored', { recursive: true, force: true });
  await rm('./node_modules/.ignored_react-refresh', {
    recursive: true,
    force: true,
  });
  const rspackColdStart = await measureStartTime(rspackCmd, [
    'serve',
  ]);
  console.log(`rspack cold start ${rspackColdStart}s`);

  await sleep(3);
  const rspackWarmStart = await measureStartTime(rspackCmd, [
    'serve',
  ]);
  console.log(`rspack warm start ${rspackWarmStart}s`);

  await sleep(3);
  await rm('./node_modules/.ignored', { recursive: true, force: true });
  await rm('./node_modules/.ignored_react-refresh', {
    recursive: true,
    force: true,
  });
  const rspackBuild = await measureBuildTime(rspackCmd, [
    'build',
  ]);
  console.log(`rsbpack prod build ${rspackBuild}s`);
  await sleep(3);

  // Vite
  await rm('./node_modules/.vite', { recursive: true, force: true });
  const viteColdStart = await measureStartTime(viteCmd, [
    '--open',
  ]);
  console.log(`vite cold start ${viteColdStart}s`);

  await sleep(3);
  const viteWarmStart = await measureStartTime(viteCmd, [
    '--open',
  ]);
  console.log(`vite warm start ${viteWarmStart}s`);

  await sleep(3);
  await rm('./node_modules/.vite', { recursive: true, force: true });
  const viteBuild = await measureBuildTime(viteCmd, [
    'build',
  ]);
  console.log(`vite prod build ${viteBuild}s`);

  await sleep(3);

  // Parcel
  await rm('./.parcel-cache', { recursive: true, force: true });
  const parcelColdStart = await measureStartTime(parcelCmd, [
    'codebase/index.html',
    '--open',
  ]);
  console.log(`parcel cold start ${parcelColdStart}s`);
  await sleep(3);
  const parcelWarmStart = await measureStartTime(parcelCmd, [
    'codebase/index.html',
    '--open',
  ]);
  console.log(`parcel warm start ${parcelWarmStart}s`);
  await sleep(3);
  await rm('./.parcel-cache', { recursive: true, force: true });
  const parcelBuild = await measureBuildTime(parcelCmd, [
    'build',
    'codebase/index.html',
  ]);
  console.log(`parcel prod build ${parcelBuild}s`);
  await sleep(3);

  // Webpack + SWC
  await rm('./node_modules/.cache', { recursive: true, force: true });
  const webpackSwcColdStart = await measureStartTime(
    webpackDevServerCmd,
    ['--config', 'webpack-swc.config.js', '--open']
  );
  console.log(`webpack swc cold start ${webpackSwcColdStart}s`);
  await sleep(3);
  const webpackSwcWarmStart = await measureStartTime(
    webpackDevServerCmd,
    ['--config', 'webpack-swc.config.js', '--open']
  );
  console.log(`webpack swc warm start ${webpackSwcWarmStart}s`);
  await sleep(3);
  await rm('./node_modules/.cache', { recursive: true, force: true });
  const webpackSwcBuild = await measureBuildTime(
    webpackCmd,
    ['--config', 'webpack-swc.config.js']
  );
  console.log(`webpack swc prod build ${webpackSwcBuild}s`);
  await sleep(3);

  // Webpack
  await rm('./node_modules/.cache', { recursive: true, force: true });
  const webpackColdStart = await measureStartTime(
    webpackDevServerCmd,
    ['--open']
  );
  console.log(`webpack cold start ${webpackColdStart}s`);
  await sleep(3);
  const webpackWarmStart = await measureStartTime(
    webpackDevServerCmd,
    ['--open']
  );
  console.log(`webpack warm start ${webpackWarmStart}s`);
  await sleep(3);
  await rm('./node_modules/.cache', { recursive: true, force: true });
  const webpackBuild = await measureBuildTime(
    webpackCmd,
    []
  );
  console.log(`webpack prod build ${webpackBuild}s`);

  await sleep(3);

  // echarts render
  const chart = echarts.init(null, null, {
    renderer: 'svg',
    ssr: true,
    width: 830,
    height: 400,
  });

  chart.setOption({
    backgroundColor: '#fff',
    legend: {},
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: ['rspack', 'vite', 'parcel', 'webpack\n+swc', 'webpack'],
    },
    series: [
      {
        name: 'dev-server cold start',
        type: 'bar',
        data: [
          rspackColdStart,
          viteColdStart,
          parcelColdStart,
          webpackSwcColdStart,
          webpackColdStart,
        ],
        label: {
          show: true,
          position: 'right',
        },
      },
      {
        name: 'dev-server warm start',
        type: 'bar',
        data: [
          rspackWarmStart,
          viteWarmStart,
          parcelWarmStart,
          webpackSwcWarmStart,
          webpackWarmStart,
        ],
        label: {
          show: true,
          position: 'right',
        },
      },
      {
        name: 'production build',
        type: 'bar',
        data: [
          rspackBuild,
          viteBuild,
          parcelBuild,
          webpackSwcBuild,
          webpackBuild,
        ],
        label: {
          show: true,
          position: 'right',
        },
      },
    ],
    animation: false,
  });

  // Output a string
  await writeFile('chart.svg', chart.renderToSVGString(), 'utf-8');
  chart.dispose();
}

benchmark();
