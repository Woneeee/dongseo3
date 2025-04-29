import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

// 리덕스
import { Provider } from "react-redux";
import store from "./redux/store.js";

// 로그인
import Login from "./Login.jsx";

// 레이아웃
import Header from "./layout/Header.jsx";
import Banner from "./layout/Banner.jsx";
// import Footer from "./layout/Footer.jsx";

// 페이지
import Main from "./page/main/Index.jsx";
import Company from "./page/main/Company.jsx";
import CompanyDetail from "./page/main/Detail.jsx";

import Report from "./page/report/Index.jsx";

import MProcess from "./page/management/Process.jsx";
import MCompany from "./page/management/Company.jsx";
import MBusiness from "./page/management/Business.jsx";
import MAccount from "./page/management/Account.jsx";

import { User_Info_Cookies } from "./config/export/Cookie";

const App = () => {
  const My_Data = User_Info_Cookies;
  const ID = Cookies.get("KEWP_ID");
  const AUTH = Cookies.get("KEWP_AUTH");

  const [isLogin, setIsLogin] = useState(!!ID);

  useEffect(() => {
    const CheckLoginStatus = () => {
      const ID = Cookies.get("KEWP_ID");
      const TK = Cookies.get("KEWP_TK");

      if (!ID || !TK) {
        My_Data.forEach((cookieName) => {
          Cookies.remove(cookieName);
        });

        setIsLogin(false);
      } else {
        setIsLogin(true);
      }
    };

    CheckLoginStatus();
  }, []);

  return (
    <Provider store={store}>
      {isLogin ? (
        <div id="Wrap">
          <Header />
          <Banner />
          <main id="Main">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/company/:id" element={<Company />} />
              <Route
                path="/company/detail/:name/:id"
                element={<CompanyDetail />}
              />

              <Route path="/report" element={<Report />} />

              {AUTH !== "U" ? (
                <>
                  <Route path="/management/processs" element={<MProcess />} />
                  <Route path="/management/company" element={<MCompany />} />
                  <Route path="/management/business" element={<MBusiness />} />
                  <Route path="/management/account" element={<MAccount />} />
                </>
              ) : (
                ""
              )}
            </Routes>
          </main>
          {/* <Footer /> */}
        </div>
      ) : (
        <Login onLogin={() => setIsLogin(true)} />
      )}
    </Provider>
  );
};

export default App;
