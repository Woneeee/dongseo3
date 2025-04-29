import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { RiLock2Fill, RiUser2Fill } from "react-icons/ri";
import { RingLoader } from "react-spinners";
import { API_URL } from "./config/export/API";
import EWP from "./assets/img/login/EWP-W.png";

const Login = ({ onLogin }) => {
  const Navigate = useNavigate();

  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Time, setTime] = useState(0);

  // 로딩 스피너 2초 보여주고 false 실행 ===> 기존 finally는 삭제
  const API_Login = async () => {
    setLoading(true);
    setTime(0);
    try {
      const BODY = {
        id: Id,
        pwd: Password,
      };

      const res = await axios.post(`${API_URL}/users/dongsa/login`, BODY);
      const Data = res.data;
      console.log(Data);

      if (Data.status_code === 200) {
        Cookies.set("KEWP_ID", Data.data.id);
        Cookies.set("KEWP_NAME", Data.data.user_name);
        Cookies.set("KEWP_TK", Data.data.token);
        Cookies.set("KEWP_AUTH", Data.data.auth);
        Cookies.set("KEWP_IDX", Data.data.factory_idx);

        let progress = 0;
        const interval = setInterval(() => {
          progress += 5;
          setTime(progress);
          if (progress >= 100) {
            clearInterval(interval);
            setLoading(false);
            onLogin();
            // Navigate("/");
          }
        }, 100);
      } else if (Data.status_code === 500) {
        alert("서버에서 오류가 발생하였습니다.");
        setLoading(false);
      } else {
        alert("로그인에 실패하였습니다. 계정 정보를 다시 확인해주세요");
        setLoading(false);
      }
    } catch (error) {
      console.error("로그인 실패: ", error);
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      API_Login();
    }
  };

  return (
    <div className="Login_Wrap">
      <div className="Inner">
        <div className="Left">
          <div className="Title">
            <span>회원 로그인</span>
          </div>
          <div className="Desc">
            <div className="INP_Box">
              {/* <img src={ID} alt="" /> */}
              <RiUser2Fill className="Login_ICON" />
              <input type="text" placeholder="ID" value={Id} onChange={(e) => setId(e.target.value)} onKeyDown={handleKeyDown} />
            </div>
            <div className="INP_Box">
              {/* <img src={PW} alt="" /> */}
              <RiLock2Fill className="Login_ICON" />
              <input type="password" placeholder="PASSWORD" value={Password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} />
            </div>

            <button className="Login_BTN" onClick={API_Login}>
              LOGIN
            </button>
          </div>
        </div>
        <div className="Right">
          <div className="Title">
            <img src={EWP} alt="" className="EWP_IMG" />
            <p>KOREA EAST-WEST POWER Tertiary</p>
          </div>
        </div>
      </div>

      <div className={`Spinner ${Loading ? "on" : ""}`}>
        <RingLoader color="var(--blue-color)" size={200} />
        <p>
          LOADING... <em>{Time}%</em>
        </p>
      </div>
    </div>
  );
};

export default Login;
