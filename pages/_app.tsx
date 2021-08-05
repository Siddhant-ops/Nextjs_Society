import "../styles/globals.scss";
import { ProvideAuth } from "../Utils/Firebase/Auth/auth";
import Navbar from "../Components/Nav/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <ProvideAuth>
      <Navbar />
      <Component {...pageProps} />
    </ProvideAuth>
  );
}

export default MyApp;
