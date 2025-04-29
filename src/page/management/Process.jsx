import React, { useState } from "react";
import Comp from "../../assets/icon/Comp.png";
import { DummyComp } from "../../config/Dummy";

const Process = () => {
  const [Click_Idx, setClick_Idx] = useState(0);
  return (
    <section className="Management_Sec Process Sec">
      <div className="Inner">
        <div className="Title">
          <h2>설비 관리 페이지</h2>
          <p>기존 공기압축기 수정, 신규 등록이 가능합니다</p>
        </div>

        <div className="Main_Data">
          <div className="Left">
            <div className="Title">
              <div className="Name">
                <img src={Comp} alt="" className="ICON" />
                <span>설비 리스트</span>
              </div>
            </div>

            <div className="Grid_Data">
              {DummyComp.map((item, idx) => {
                return (
                  <div className={`Items ${idx === Click_Idx ? "on" : ""}`}>
                    <div className="Names">
                      <span>{item.name}</span>
                    </div>

                    <button className={`Select_BTN ${idx === Click_Idx ? "on" : ""}`} onClick={() => setClick_Idx(idx)}></button>

                    <div className="Comp_Data">
                      <div className="IMG_Box">
                        <img src={`${process.env.PUBLIC_URL}${item.img}`} alt="" />
                      </div>
                      <ul className="Info_Data">
                        <li>
                          <span>제조사</span>
                          <p>{item.maker}</p>
                        </li>
                        <li>
                          <span>S/N</span>
                          <p>{item.serial}</p>
                        </li>
                        <li>
                          <span>제조일</span>
                          <p>{item.year}</p>
                        </li>
                        <li>
                          <span>마력</span>
                          <p>
                            {item.hp}
                            <em>hp</em>
                          </p>
                        </li>
                        <li className="Colum">
                          <span>유량당 소비 전력</span>
                          <p>
                            {item.power_use}
                            <em>kWh/Nm³</em>
                          </p>
                        </li>
                        <li className="Colum">
                          <span>분당 최대 토출 용량</span>
                          <p>
                            {item.flow_min}
                            <em>m³/min</em>
                          </p>
                        </li>
                        <li className="Colum">
                          <span>목표 감축량</span>
                          <p>
                            {0}
                            <em>tCO₂eq</em>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="Right">
            <div className="Title">
              <span>설비 데이터 수정</span>
              <div className="Save_BTN">
                <button className="BTN">저장하기</button>
              </div>
            </div>
            <div className="Select_Data">
              <div className="INP_BOX">
                <span>설비명</span>
                <input type="text" value={DummyComp[Click_Idx].name} />
              </div>

              <div className="INP_BOX Two_Data">
                <div className="Items">
                  <span>S/N</span>
                  <input type="text" value={DummyComp[Click_Idx].serial} />
                </div>
                <div className="Items">
                  <span>이미지</span>
                  <select name="" id="" value={DummyComp[Click_Idx].img.split("/").pop().replace(".png", "")}>
                    <option value="GA18">GA18</option>
                    <option value="GA22">GA22</option>
                    <option value="GA30">GA30</option>
                    <option value="GA37">GA37</option>
                    <option value="GA55">GA55</option>
                    <option value="GA75">GA75</option>
                    <option value="GA90">GA90</option>
                    <option value="GA110">GA110</option>
                    <option value="ES">ES</option>
                    <option value="MGC">MGC</option>
                  </select>
                </div>
              </div>

              <div className="INP_BOX Two_Data">
                <div className="Items">
                  <span>제조사</span>
                  <input type="text" value={DummyComp[Click_Idx].maker} />
                </div>
                <div className="Items">
                  <span>제조일</span>
                  <input type="text" value={DummyComp[Click_Idx].year} />
                </div>
              </div>

              <div className="INP_BOX">
                <span>마력</span>
                <label htmlFor="">
                  <input type="text" value={DummyComp[Click_Idx].hp} />
                  <em>hp</em>
                </label>
              </div>
              <div className="INP_BOX">
                <span>유량당 소비 전력</span>
                <label htmlFor="">
                  <input type="text" value={DummyComp[Click_Idx].power_use} />
                  <em>kwh/Nm³</em>
                </label>
              </div>
              <div className="INP_BOX">
                <span>분당 최대 토출 용량</span>
                <label htmlFor="">
                  <input type="text" value={DummyComp[Click_Idx].flow_min} />
                  <em>m³/min</em>
                </label>
              </div>
              <div className="INP_BOX">
                <span>목표 감축량</span>
                <label htmlFor="">
                  <input type="text" value={0} />
                  <em>tCO₂eq</em>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
