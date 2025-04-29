import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import moment from "moment";
import Cookies from "js-cookie";
import "moment/locale/ko";
import { BsBarChart, BsBuildingCheck, BsChevronDown, BsClipboardData, BsCpu, BsDiagram3, BsFileEarmarkText, BsGrid1X2 } from "react-icons/bs";

import logo from "../assets/img/logo.svg";

const Header = () => {
  const AUTH = Cookies.get("KEWP_AUTH");

  const [CurrentTime, setCurrentTime] = useState({
    date: moment().locale("ko").format("YYYY년 MM월 DD일"),
    day: moment().locale("ko").format("ddd"),
    meridiem: moment().locale("ko").format("A"),
    time: moment().format("HH:mm:ss"),
    hour: moment().hour(),
    month: moment().month() + 1,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime({
        date: moment().locale("ko").format("YYYY년 MM월 DD일"),
        day: moment().locale("ko").format("ddd"),
        meridiem: moment().locale("ko").format("A"),
        time: moment().format("HH:mm:ss"),
        hour: moment().hour(),
        month: moment().month() + 1,
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="Header">
      <div className="H_Inner">
        <h1 className="Logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </h1>
        <nav className="Gnb">
          <ul>
            <li>
              <NavLink to="/">
                <span>
                  <BsGrid1X2 />
                  대시보드
                </span>
                <em>
                  <BsChevronDown />
                </em>
              </NavLink>
            </li>
            <li>
              <NavLink to="/search">
                <span>
                  <BsBarChart />
                  데이터 조회
                </span>
                <em>
                  <BsChevronDown />
                </em>
              </NavLink>
            </li>
            <li>
              <NavLink to="/report">
                <span>
                  <BsClipboardData />
                  보고서 출력
                </span>
                <em>
                  <BsChevronDown />
                </em>
              </NavLink>
            </li>
            {AUTH !== "U" ? (
              <>
                <li>
                  <NavLink to="/management/process">
                    <span>
                      <BsCpu />
                      설비 관리
                    </span>
                    <em>
                      <BsChevronDown />
                    </em>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/management/company">
                    <span>
                      <BsBuildingCheck />
                      기업 관리
                    </span>
                    <em>
                      <BsChevronDown />
                    </em>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/management/business">
                    <span>
                      <BsFileEarmarkText />
                      사업 관리
                    </span>
                    <em>
                      <BsChevronDown />
                    </em>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/management/account">
                    <span>
                      <BsDiagram3 />
                      계정 관리
                    </span>
                    <em>
                      <BsChevronDown />
                    </em>
                  </NavLink>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        </nav>

        <div className="Time">
          <div className="Top">
            <span>{CurrentTime.date}</span>
          </div>
          <div className="Bottom">
            <span>
              {CurrentTime.meridiem} {CurrentTime.time}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
