import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { BsXLg } from "react-icons/bs";
import { API_URL } from "../../../config/export/API";

const Modal = ({ Open, setOpen, Mode, GET_User, Data }) => {
  const IDX = Cookies.get("KEWP_IDX");
  const TOKEN = Cookies.get("KEWP_TK");
  const AUTH = Cookies.get("KEWP_AUTH");

  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const [Auth, setAuth] = useState("");
  const [Change_Auth, setChange_Auth] = useState("");
  const [Name, setName] = useState("");

  const User_Join = async () => {
    const Confirm = window.confirm(`${Name}님의 ID:${Id} 계정을 생성하시겠습니까?`);

    if (!Confirm) return;
    try {
      const res = await axios.post(
        `${API_URL}/users/dongsa/join`,
        {
          id: Id,
          pwd: Password,
          auth: Auth,
          user_name: Name,
          factory_idx: IDX,
        },
        {
          headers: { token: TOKEN },
        }
      );
      const result = res.data;
      alert(`${result.detail}`);
    } catch (error) {
      console.error("계정 생성 실패:", error);
      alert(`${Name}님의 계정 생성 과정에서 문제가 발생하였습니다.`);
    } finally {
      setOpen(false);
      GET_User();
    }
  };

  const User_Auth_Change = async () => {
    const Confirm = window.confirm(`${Data.user_name}님의 계정 권한을 수정하시겠습니까?`);

    if (!Confirm) return;
    try {
      const res = await axios.patch(
        `${API_URL}/users/dongsa/user/auth`,
        [
          {
            id: Data.id,
            auth: Change_Auth,
          },
        ],
        {
          headers: { token: TOKEN },
        }
      );
      const result = res.data;
      alert(`${result.detail}`);
    } catch (error) {
      console.error("권한 수정 실패:", error);
      alert(`${Data.user_name}님의 권한 수정 과정에서 문제가 발생하였습니다.`);
    } finally {
      setOpen(false);
      GET_User();
    }
  };

  return (
    <div className={`Modal Account ${Open ? "on" : ""}`}>
      <div className="Inner">
        <div className="Title">
          <span>{Mode === "Insert" ? "신규 계정 생성" : "계정 권한 수정"}</span>
          <BsXLg className="Close" onClick={() => setOpen(false)} title="닫기" />
        </div>

        <div className="Select_Data">
          {Mode === "Insert" ? (
            <>
              <div className="INP_BOX Two_Data">
                <div className="Items">
                  <span>아이디</span>
                  <input type="text" value={Id} onChange={(e) => setId(e.target.value)} />
                </div>
                <div className="Items">
                  <span>패스워드</span>
                  <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
              <div className="Sel_BOX INP_BOX Two_Data">
                <div className="Items">
                  <span>이름</span>
                  <input type="text" value={Name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="Items">
                  <span>권한</span>
                  <select name="" id="" className="" value={Auth} onChange={(e) => setAuth(e.target.value)}>
                    <option value="">권한부여 선택</option>
                    <option value="A">관리자</option>
                    <option value="U">유저</option>
                  </select>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="Select_Data" style={{ width: "250px" }}>
                <div className="Sel_BOX">
                  <span>권한</span>
                  <select name="" id="" className="" style={{ gridColumn: "span 2" }} value={Change_Auth} onChange={(e) => setChange_Auth(e.target.value)}>
                    <option value="">권한부여 선택</option>
                    {AUTH === "M" && <option value="M">마스터</option>}
                    <option value="A">관리자</option>
                    <option value="U">유저</option>
                  </select>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="Save_BTN">
          <button
            className="BTN"
            onClick={() => {
              if (Mode === "Insert") {
                User_Join();
              } else {
                User_Auth_Change();
              }
            }}
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
