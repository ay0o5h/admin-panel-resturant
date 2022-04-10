import ProgressBar from "@badrap/bar-of-progress";
import 'antd/dist/antd.css';
import "devextreme/dist/css/dx.light.css";
import Cookies from "js-cookie";
import { NextIntlProvider } from 'next-intl';
import Router from "next/router";
import React, { useEffect } from "react";
import FullLayout from "../src/layouts/FullLayout";
import '../styles/globals.scss';
const progress = new ProgressBar({
  size: 3,
  color: "#FB4B53",
  className: "bar-of-progress",
  delay: 100,
});
Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);
function MyApp({ Component, pageProps }) {
    useEffect(() => {
    getAndSet();
    }, []);
    const getAndSet = async () => {
    const token = await Cookies.get("Admintoken");

    if (!token && window.location.pathname !== "/login") {
      if (
        window.location.pathname == "/register" ||
        window.location.pathname == "/forgotPassword"
      )
        return;
      window.location.href = "/login";
    }

    if (token && window.location.pathname == "/login")
      window.location.href = "/";
  };

  return (
    <NextIntlProvider messages={pageProps.messages}>
      <FullLayout>
        <Component {...pageProps} />
        </FullLayout>
      </NextIntlProvider>
  )
}


export default MyApp
