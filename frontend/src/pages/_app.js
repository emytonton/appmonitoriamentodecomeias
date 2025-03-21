import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/react-query';

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
