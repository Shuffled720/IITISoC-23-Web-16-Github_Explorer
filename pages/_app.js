import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import {NavBar} from '../components/componentsindex'
export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <NavBar/>
    <Component {...pageProps} />
  </SessionProvider>
  )
}
