# Front-end Builder Benchmark

## Standard

The front-end builder must match the following standard

- It is actively maintained. (at least 1 release in last 6 month)
- It is able to build production assets.
- It has a dev server with HMR.
- It supports common technology like Sass, LESS, CSS modules, code splitting.
- It supports plugins.
- It does NOT restrict UI framework to use.
- It does NOT bundle unnecessary runtime, like Redux.

## Candidates

- webpack + babel + terser
- webpack + swc
- parcel
- vite
- rspack

## Unqualified

- esbuild, doesn't support HMR.
- swc/swcpack, doesn't support HMR.
- create-react-app/react-scripts, only supports React.
- icejs and umijs, only supports React and has too many runtime.
- turbopack, only supports Next.js.

## Test Code Base

- 420 React components
- 420 css files
- 20 code splitting bundles
- react & react-dom 18
- react-router-dom 6
- @mui/material 5
- typescript 5

## Test Result

| builder | dev-server cold start | dev server warm start | production build |
| ------- | --------------------- | --------------------- | ---------------- |
| vite    | 4.3s                  | 1.3s                  | 6.5s             |
| parcel  | 13.0s                 | 1.3s                  | 15.7s            |
| webpack | 14.2s                 | 14.2s                 | 15.8s            |
