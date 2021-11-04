# Front-end Builder Benchmark

## Test Targets

- create-react-app: the most popular react development tool based on webpack
- parceljs: zero-config front-end bundler
- snowpack: very fast esbuild based front-end bundler
- icejs-webpack: alibaba's front-end tooling solution, using webpack 5
- icejs-vite: alibaba's front-end tooling solution, using vite and rollup

## Test Code Base

- React 17
- React Router 5.3 (icejs doesn't support react-router 6.x)
- React PDF 5.5
- Fusion Design 1.25
- Lodash 4.17
- TypeScript 4.4
- CSS, SCSS, images, SVGs
- 10 pages with forms, lists and more

## Test Results

### Device A: MacBook Pro (16-inch, 2019)

- CPU: Intel(R) Core(TM) i7-9750H CPU @ 2.6 GHz
- RAM: 16 GB 2667 MHz DDR4
- SSD: 500 GB Apple SSD
- OS: macOS Big Sur 11.6

| Task                | create-react-app | parceljs | snowpack | icejs-webpack | icejs-vite |
| ------------------- | ---------------- | -------- | -------- | ------------- | ---------- |
| Build without cache | 30.0s            | 15.4s    | -        | 33.0s         | 17.8       |
| Build with cache    | 14.5s            | 1.73s    | -        | 31.3s         | 16.8       |

### Device B: ThinkPad T480

- CPU: Intel(R) Core(TM) i7-8550U CPU @ 1.8 GHz
- RAM: 32 GB 2667 MHz DDR4
- SSD: 500 GB Sumsang SSD
- OS: openSUSE Tumbleweed (Linux 5.15)

| Task                | create-react-app | parceljs | snowpack | icejs-webpack | icejs-vite |
| ------------------- | ---------------- | -------- | -------- | ------------- | ---------- |
| Build without cache | -                | -        | -        | -             | -          |
| Build with cache    | -                | -        | -        | -             | -          |
