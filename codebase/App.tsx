import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { green } from '@mui/material/colors';
import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';

const theme = createTheme({
  palette: {
    primary: {
      main: green[400],
    },
  },
});

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <Suspense fallback="Loading">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Suspense>
  );
}
