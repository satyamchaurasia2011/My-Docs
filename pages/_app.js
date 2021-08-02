import 'tailwindcss/tailwind.css'
import "@material-tailwind/react/tailwind.css";
import Head from 'next/head';
import NProgress from "nprogress"
import { Provider } from 'next-auth/client'
import Router from "next/router"
import '../styles.css'
import { route } from 'next/dist/next-server/server/router';
Router.onRouteChangeStart = url => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => NProgress.done()

Router.onRouteChangeError = () => NProgress.done()
function MyApp({ Component, pageProps }) {
  return (
  <>
    <Head>
    <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
    />
      <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
       />
    </Head>
    <Provider session={pageProps.session}>
       <Component {...pageProps} key={route} />
    </Provider>
  
  </>
  )
  
}

export default MyApp
