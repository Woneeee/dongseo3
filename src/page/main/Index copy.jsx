import React from "react";
import { DummyCompany } from "../../config/Dummy";
import { Commas } from "../../config/export/Format";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Map from "../../components/main/Map";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const Navigate = useNavigate();

  return (
    <section className="Main_Sec Sec">
      <div className="Inner">
        <div className="Main_Data">
          <div className="Left">
            {DummyCompany.map((item, idx) => {
              const Total_Air = item.max_flow_rate * item.run_time;
              const Total_Kwh = item.specific_power * Total_Air;
              const Emissions = (Total_Kwh / 1000) * 0.4781;
              const Biz_State = item.progress === "착수신고" ? "G" : item.progress.includes("문서재제출") ? "Y" : item.progress.includes("문서보완") ? "O" : "";
              return (
                <div className="Item" key={idx}>
                  <div className="Title" onClick={() => Navigate("/company")}>
                    <div className="Name">
                      <span>{item.name}</span>
                      <p>{item.address}</p>
                    </div>
                    <div className="Count">
                      {item.count}
                      <em>EA</em>
                    </div>
                  </div>
                  <div className="Desc">
                    <div className="Info">
                      <div className="Addr Items">
                        <em>사업</em> <p>{item.business}</p>
                      </div>
                      <div className={`Biz_S Items ${Biz_State}`}>
                        <em>진행</em> <p>{item.progress}</p>
                      </div>
                    </div>

                    <div className="Data G">
                      <span>배출량</span>
                      <p>
                        {Commas(parseFloat(Emissions?.toFixed(2)))}
                        <em>tCO₂eq</em>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="Paging">
              <button>
                <FaChevronLeft />
              </button>
              <div className="Number">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
                  return <button key={item}>{item}</button>;
                })}
              </div>
              <button>
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div className="Right">
            <div className="Search">
              <select className="Select">
                <option value="">필터 선택</option>
                <option value="">업체명</option>
                <option value="">업체주소</option>
              </select>
              <input type="text" placeholder="검색 내용을 입력해주세요..." />
              <button>검색</button>
            </div>

            <Map />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
