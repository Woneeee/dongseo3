import React from "react";
import { DummyCompany } from "../../../config/Dummy";
import { BsXLg } from "react-icons/bs";

const Modal = ({ Idx, Open, setOpen, Mode }) => {
  return (
    <div className={`Modal Business ${Open ? "on" : ""}`}>
      <div className="Inner">
        <div className="Title">
          <span>신규 사업 등록</span>
          <BsXLg
            className="Close"
            onClick={() => setOpen(false)}
            title="닫기"
          />
        </div>

        <div className="Select_Data">
          <div className="Sel_BOX INP_BOX Company">
            <div className="Items">
              <span>사업명</span>
              <input type="text" value={DummyCompany[Idx].business} />
            </div>
            <div className="Items">
              <span>대표업체</span>
              <select name="" id="" className="Progress">
                <option value="">대표업체 선택</option>
                <option value="">경성하이테크</option>
                <option value="">경한코리아</option>
                <option value="">금강부러쉬</option>
                <option value="">넥스턴바이오사이언스</option>
                <option value="">다스코</option>
                <option value="">대립</option>
                <option value="">대산금속</option>
                <option value="">대연정공</option>
                <option value="">대영에스앤씨</option>
                <option value="">대일테크</option>
                <option value="">대한캐스팅</option>
                <option value="">대한테크</option>
                <option value="">덕성인더스트리</option>
                <option value="">동산테크</option>
                <option value="">동호</option>
                <option value="">동화정밀공업</option>
                <option value="">부국</option>
                <option value="">수성기체산업</option>
                <option value="">신성에스앤티</option>
                <option value="">신한단조</option>
              </select>
            </div>
          </div>

          <div className="Sel_BOX">
            <span>진행여부</span>
            <select name="" id="" className="Progress">
              <option value="">진행여부 선택</option>
              <option value="">문서재재출</option>
              <option value="">문서보완</option>
              <option value="">착수신고</option>
            </select>
            <select name="" id="" className="Count">
              <option value="">횟수 선택</option>
              <option value="">1차</option>
              <option value="">2차</option>
              <option value="">3차</option>
              <option value="">4차</option>
              <option value="">5차</option>
            </select>
          </div>
        </div>
        <div className="Save_BTN">
          <button className="BTN">저장하기</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
