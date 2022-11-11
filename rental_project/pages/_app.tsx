import type { AppProps } from 'next/app'
import { initializeIcons } from "@fluentui/react/lib/Icons";
initializeIcons();

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
