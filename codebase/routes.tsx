import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const Page1 = lazy(() => import('./pages/page1'));
const Page2 = lazy(() => import('./pages/page2'));
const Page3 = lazy(() => import('./pages/page3'));
const Page4 = lazy(() => import('./pages/page4'));
const Page5 = lazy(() => import('./pages/page5'));
const Page6 = lazy(() => import('./pages/page6'));
const Page7 = lazy(() => import('./pages/page7'));
const Page8 = lazy(() => import('./pages/page8'));
const Page9 = lazy(() => import('./pages/page9'));
const Page10 = lazy(() => import('./pages/page10'));
const Page11 = lazy(() => import('./pages/page11'));
const Page12 = lazy(() => import('./pages/page12'));
const Page13 = lazy(() => import('./pages/page13'));
const Page14 = lazy(() => import('./pages/page14'));
const Page15 = lazy(() => import('./pages/page15'));
const Page16 = lazy(() => import('./pages/page16'));
const Page17 = lazy(() => import('./pages/page17'));
const Page18 = lazy(() => import('./pages/page18'));
const Page19 = lazy(() => import('./pages/page19'));
const Page20 = lazy(() => import('./pages/page20'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/page1" />,
  },
  { path: 'page1', element: <Page1 /> },
  { path: 'page2', element: <Page2 /> },
  { path: 'page3', element: <Page3 /> },
  { path: 'page4', element: <Page4 /> },
  { path: 'page5', element: <Page5 /> },
  { path: 'page6', element: <Page6 /> },
  { path: 'page7', element: <Page7 /> },
  { path: 'page8', element: <Page8 /> },
  { path: 'page9', element: <Page9 /> },
  { path: 'page10', element: <Page10 /> },
  { path: 'page11', element: <Page11 /> },
  { path: 'page12', element: <Page12 /> },
  { path: 'page13', element: <Page13 /> },
  { path: 'page14', element: <Page14 /> },
  { path: 'page15', element: <Page15 /> },
  { path: 'page16', element: <Page16 /> },
  { path: 'page17', element: <Page17 /> },
  { path: 'page18', element: <Page18 /> },
  { path: 'page19', element: <Page19 /> },
  { path: 'page20', element: <Page20 /> },
];

export default routes;
