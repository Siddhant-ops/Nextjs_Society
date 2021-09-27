import "../styles/globals.scss";
import { ProvideAuth } from "../Utils/Firebase/Auth/auth";
import Navbar from "../Components/Nav/Navbar";
// import type { AppProps /*, AppContext */ } from "next/app";

// export function reportWebVitals(metric) {
//   console.log(metric);
// }

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <Navbar />
      <Component {...pageProps} />
    </ProvideAuth>
  );
}

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <ProvideAuth>
//       <Navbar />
//       <Component {...pageProps} />
//     </ProvideAuth>
//   );
// }

export default MyApp;
