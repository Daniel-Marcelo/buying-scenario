import type { AppProps } from 'next/app';
import '../styles/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { defaultTheme, ThemeProvider, Preflight } from '@xstyled/styled-components';

const theme = {
  ...defaultTheme,
  // Customize your theme here
};
export default function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Preflight />
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
