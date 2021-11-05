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

## Measurement Methods

### Build time without cache

```
rm -rf node_modules/.cache node_modules/.vite .parcel-cache  && time npm run build
```

### Build time with cache

```
time npm run build
```

### Dev server start time without cache

```
rm -rf node_modules/.cache node_modules/.vite .parcel-cache src/.umi* && npm start | ts '[%H:%M:%S]'
```

### Dev server start time with cache

```
npm start | ts '[%H:%M:%S]'
```

### Dev server hot module reload time

```
npm start | ts '[%H:%M:%S]'
```

add one line `<div/>` into `src/test-app/App.tsx`

## Test Results

### Device A: MacBook Pro (16-inch, 2019)

- CPU: Intel(R) Core(TM) i7-9750H CPU @ 2.6 GHz
- RAM: 16 GB 2667 MHz DDR4
- SSD: 500 GB Apple SSD
- OS: macOS Big Sur 11.6

| Task                           | create-react-app | parceljs | snowpack | icejs-webpack | icejs-vite | umijs |
| ------------------------------ | ---------------- | -------- | -------- | ------------- | ---------- | ----- |
| Build without cache            | 30s              | 15s      | 12s      | 30s           | 16s        | 20s   |
| Build with cache               | 14s              | 2s       | 12s      | 30s           | 16s        | 13s   |
| Dev server start without cache | 14s              | 2s       | 17s      | 11s           | 5s         | 10s   |
| Dev server start with cache    | 8s               | <1s      | 3s       | 8s            | 4s         | 8s    |
| Dev server hot-reload          | <1s              | <1s      | <1s      | <1s           | <1s        | ~1s   |
| Dev server RAM usage           |

### Device B: ThinkPad T480

- CPU: Intel(R) Core(TM) i7-8550U CPU @ 1.8 GHz
- RAM: 32 GB 2667 MHz DDR4
- SSD: 500 GB Sumsang SSD
- OS: openSUSE Tumbleweed (Linux 5.15)

| Task                | create-react-app | parceljs | snowpack | icejs-webpack | icejs-vite |
| ------------------- | ---------------- | -------- | -------- | ------------- | ---------- |
| Build without cache | -                | -        | -        | -             | -          |
| Build with cache    | -                | -        | -        | -             | -          |
