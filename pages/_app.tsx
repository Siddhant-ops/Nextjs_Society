import "../styles/globals.scss";
import {
  authReducer,
  InitialState,
  returnCookieValue,
} from "../Utils/AuthContext/reducer";
import { StateProvider } from "../Utils/AuthContext/stateProvider";
import Navbar from "../Utils/Nav/Navbar";
import { getCookieServerSide } from "../Utils/Helpers/auth";

function MyApp({ Component, pageProps, tokenCookie }) {
  const initialState: InitialState = {
    user: returnCookieValue(tokenCookie),
  };

  return (
    <StateProvider initialState={initialState} reducer={authReducer}>
      <Navbar />
      <Component {...pageProps} />
    </StateProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};
  const tokenCookie: string | null = getCookieServerSide(ctx);
  return { pageProps, tokenCookie };
};

export default MyApp;
