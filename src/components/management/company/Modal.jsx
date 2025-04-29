import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { BsXLg } from "react-icons/bs";
import Address from "./Address";
import { API_URL } from "../../../config/export/API";

const Modal = ({ Click_Data, Open, setOpen, Mode, GET_Company }) => {
  const TOKEN = Cookies.get("KEWP_TK");
  const [Data, setData] = useState({
    idx: null,
    name: "",
    addr: "",
    addr_pos_x: null,
    addr_pos_y: null,
    biz_reg_no: "",
    corp_reg_no: "",
    industry: "",
    sector: "",
    post_addr: "",
    dongsa_level: null,
    main: "",
    reduction_goal: 0,
    reduction_now: 0,
    reduction_remain: 0,
  });

  useEffect(() => {
    if (Mode !== "Edit") {
      setData({
        idx: null,
        name: "",
        addr: "",
        addr_pos_x: null,
        addr_pos_y: null,
        biz_reg_no: "",
        corp_reg_no: "",
        industry: "",
        sector: "",
        post_addr: "",
        dongsa_level: null,
        main: "",
        reduction_goal: 0,
        reduction_now: 0,
        reduction_remain: 0,
      });
    } else if (Click_Data) {
      setData({
        idx: Click_Data.idx,
        name: Click_Data.name,
        addr: Click_Data.addr,
        addr_pos_x: Click_Data.addr_pos_x,
        addr_pos_y: Click_Data.addr_pos_y,
        biz_reg_no: Click_Data.biz_reg_no,
        corp_reg_no: Click_Data.corp_reg_no,
        industry: Click_Data.industry,
        sector: Click_Data.sector,
        post_addr: Click_Data.post_addr,
        dongsa_level: Click_Data.dongsa_level,
        main: Click_Data.main,
        reduction_goal: Click_Data.reduction_goal,
        reduction_now: Click_Data.reduction_now,
        reduction_remain: Click_Data.reduction_remain,
      });
    }
  }, [Click_Data, Mode]);

  const [ShowAddress, setShowAddress] = useState(false);
  const ShowAddress_Close = () => {
    setShowAddress(false);
  };

  const handleForm_Add = (data) => {
    setData((prev) => ({
      ...prev,
      addr: data.address,
      post_addr: data.zone,
      addr_pos_y: data.lat,
      addr_pos_x: data.lng,
    }));
    console.log(data);
  };

  const Company_Update = async () => {
    const Confirm = window.confirm(`작성한 내용으로 수정 하시겠습니까?`);

    if (!Confirm) return;
    try {
      const res = await axios.put(`${API_URL}/factory`, Data, {
        headers: { token: TOKEN },
      });
      const result = res.data;
      alert(`${result.detail}`);
    } catch (error) {
      console.error("업체 수정 실패:", error);
      alert(`업체 수정 과정에서 문제가 발생하였습니다.`);
    } finally {
      GET_Company();
    }
  };

  const Company_Add = async () => {
    const Confirm = window.confirm(`${Data.name} 업체를 추가 하시겠습니까?`);

    if (!Confirm) return;
    try {
      const res = await axios.post(`${API_URL}/factory`, Data, {
        headers: { token: TOKEN },
      });
      const result = res.data;
      alert(`${result.detail}`);
    } catch (error) {
      console.error("업체 추가 실패:", error);
      alert(`업체 추가 과정에서 문제가 발생하였습니다.`);
    } finally {
      GET_Company();
    }
  };

  const handleSave = () => {
    if (Mode === "Edit") {
      Company_Update();
    } else {
      Company_Add();
    }
  };

  return (
    <>
      <div className={`Modal Company ${Open ? "on" : ""}`} style={{ gap: "20px" }}>
        <div className="Inner">
          <div className="Title">
            <span>{Mode === "Edit" ? "기업 정보 수정" : "신규 기업 등록"}</span>
            <BsXLg className="Close" onClick={() => setOpen(false)} title="닫기" />
          </div>

          <div className="Select_Data">
            <div className="Sel_BOX INP_BOX Company">
              <div className="Items">
                <span>기업명</span>
                <input type="text" value={Data.name} onChange={(e) => setData({ ...Data, name: e.target.value })} />
              </div>
              <select name="" id="" className="Count" value={Data.dongsa_level} onChange={(e) => setData({ ...Data, dongsa_level: Number(e.target.value) })}>
                <option value="">차수 선택</option>
                <option value="1">동서발전 1차</option>
                <option value="2">동서발전 2차</option>
                <option value="3">동서발전 3차</option>
              </select>
            </div>

            <div className="INP_BOX">
              <span>우편번호</span>
              <div className="Add_Search">
                <input type="text" className="Address" value={Data.post_addr} onChange={(e) => setData({ ...Data, post_addr: e.target.value })} />
                <button
                  type="button"
                  onClick={() => {
                    setShowAddress((prevShowAddress) => !prevShowAddress);
                  }}
                  className={ShowAddress ? "on" : ""}
                >
                  {ShowAddress ? "닫기" : "주소 검색"}
                </button>
              </div>
            </div>

            <div className="INP_BOX" style={{ position: "relative" }}>
              <span>주소</span>
              <input type="text" className="Address" value={Data.addr} onChange={(e) => setData({ ...Data, addr: e.target.value })} />
            </div>

            <div className="INP_BOX Two_Data">
              <div className="Items">
                <span>사업자등록번호</span>
                <input type="text" value={Data.corp_reg_no} onChange={(e) => setData({ ...Data, corp_reg_no: e.target.value })} />
              </div>
              <div className="Items">
                <span>법인등록번호</span>
                <input type="text" value={Data.biz_reg_no} onChange={(e) => setData({ ...Data, biz_reg_no: e.target.value })} />
              </div>
            </div>
            <div className="INP_BOX Two_Data">
              <div className="Items">
                <span>업태</span>
                <input type="text" value={Data.industry} onChange={(e) => setData({ ...Data, industry: e.target.value })} />
              </div>
              <div className="Items">
                <span>종목</span>
                <input type="text" value={Data.sector} onChange={(e) => setData({ ...Data, sector: e.target.value })} />
              </div>
            </div>
          </div>
          <div className="Save_BTN">
            <button className="BTN" onClick={Company_Update}>
              저장하기
            </button>
          </div>
        </div>
        {ShowAddress && <Address onAddData={handleForm_Add} onClose={ShowAddress_Close} />}
      </div>
    </>
  );
};

export default Modal;
