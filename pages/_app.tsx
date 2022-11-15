import type { AppProps } from 'next/app'
import { ThemeProvider } from "next-themes";
import { AuthContextProvider } from "../context/AuthContext";
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthContextProvider>
  );  
}
