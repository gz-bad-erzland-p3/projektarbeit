import type { AppProps } from 'next/app'
import { ThemeProvider } from "next-themes";
import { AuthContextProvider } from "../context/AuthContext";
import '../styles/globals.css'
import "../styles/datepicker.css"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <AuthContextProvider>
      <ThemeProvider attribute="class">
        <ToastContainer pauseOnFocusLoss={false} />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthContextProvider>
  );
}

