import cookies from "next-cookies";
import { AUTH_TOKEN } from "../constants";
import getServiceUrl from "../utils/fetchHelper";
import fetchWrapper from "../utils/fetchWrapper";
import GlobalContextProvider from "../stores/global/Context";

function MyApp({ Component, user, pageProps }) {
  return (
    <GlobalContextProvider user={user}>
      <Component {...pageProps} />
    </GlobalContextProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  // console.log("headers", ctx);
  let user = null;
  const cookiesVal = cookies(ctx);
  console.log("ctxx", cookies(ctx));
  console.log(".........ctxx");
  if (cookiesVal[AUTH_TOKEN]) {
    // validate the auth token
    console.log("found token in cookie..", cookiesVal[AUTH_TOKEN]);
    const userInfoUrl = getServiceUrl("getUserProfile");
    const userInfo = await fetchWrapper(userInfoUrl, {
      headers: {
        authorization: cookiesVal[AUTH_TOKEN],
      },
    });
    console.log("response found token in cookie..", userInfo);

    if (!userInfo.error) {
      // set userInfo in context
      user = userInfo;
    } else {
      // token is wrong so remove the cookie (auth_token)
    }
  }

  return {
    user,
    pageProps: {},
  };
};

export default MyApp;
