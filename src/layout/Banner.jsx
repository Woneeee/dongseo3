import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import Cookies from "js-cookie";
import { User_Info_Cookies } from "../config/export/Cookie";
import { getLoadTime } from "../config/export/Load";
import { API_URL } from "../config/export/API";
import { Date_Select } from "../config/library/Select";

const Banner = () => {
  const NAME = Cookies.get("KEWP_NAME");
  const TOKEN = Cookies.get("KEWP_TK");

  const My_Data = User_Info_Cookies;
  const options = [
    { value: 3, label: "동서발전 3차" },
    { value: 2, label: "동서발전 2차" },
    { value: 1, label: "동서발전 1차" },
  ];

  const levelCookie = parseInt(Cookies.get("KEWP_Level")) || 3;
  const [Business_Num, setBusiness_Num] = useState({
    value: levelCookie,
    label: `동서발전 ${levelCookie}차`,
  });

  const [LoadTime, setLoadTime] = useState(getLoadTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadTime(getLoadTime());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const Change_List = (option) => {
    setBusiness_Num(option);
    Cookies.set("KEWP_Level", option.value);
    window.location.reload();
  };

  useEffect(() => {
    if (Business_Num?.value) {
      Cookies.set("KEWP_Level", Business_Num.value);
    }
  }, [Business_Num]);

  const API_Logout = async () => {
    const Confirm = window.confirm("로그아웃 하시겠습니까?");
    if (!Confirm) return;

    try {
      const res = await axios.post(
        `${API_URL}/users/dongsa/logout`,
        {},
        {
          headers: { token: TOKEN },
        }
      );
      if (res.data.status_code === 200) {
        My_Data.forEach((cookieName) => {
          Cookies.remove(cookieName);
        });
        window.location.href = "/";
      } else {
        const ForceConfirm = window.confirm("현재 문제가 발생하여 로그아웃에 실패하였습니다.\n강제 로그아웃을 진행하시겠습니까?");
        if (ForceConfirm) {
          My_Data.forEach((cookieName) => {
            Cookies.remove(cookieName);
          });
          window.location.href = "/";
        }
      }
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <div className="Banner">
      <div className="B_Inner">
        <div className="Load">
          <span className={LoadTime.label}>{LoadTime.label_kr}</span>
        </div>
        <div className="Info">
          <Select options={options} value={Business_Num} onChange={Change_List} styles={Date_Select} className="Filter_Select" />
          <div className="My_Data">
            <span>{NAME}</span>
            <ul>
              <li onClick={API_Logout}>로그아웃</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
