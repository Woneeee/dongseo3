import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import { BsGraphUp } from "react-icons/bs";
import { DummyMain } from "../../config/Dummy";
import ChartPie from "../../components/main/Company/ChartPie";
import { useSelector } from "react-redux";

import { API_URL } from "../../config/export/API";
import { Commas } from "../../config/export/Format";
import { PuffLoader } from "react-spinners";
import { Loading } from "../../components/Loading/Loading";

const Company = () => {
  const TOKEN = Cookies.get("KEWP_TK");
  const AUTH = Cookies.get("KEWP_AUTH");
  const LEVEL = useState(Cookies.get("KEWP_Level"));
  const Biz_Name = sessionStorage.getItem("Click_Biz_Name");
  const Biz_Process = sessionStorage.getItem("Click_Biz_Process");

  const { id } = useParams();
  const Navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [Data, setData] = useState([]);
  const GET_Business = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/factories`, {
        params: {
          page: 1,
          count: 100,
          dongsa_level: parseInt(LEVEL),
          filter_option: "group_id",
          filter_value: id,
        },
        headers: { token: TOKEN },
      });
      const Data = res.data.data.factories;
      setData(Data);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GET_Business();
  }, [id]);

  const Total_Goal = Data.reduce((sum, item) => sum + (item.reduction_goal || 0), 0);
  const Total_Now = Data.reduce((sum, item) => sum + (item.reduction_now || 0), 0);
  const Total_Remain = Data.reduce((sum, item) => sum + (item.reduction_remain || 0), 0);
  const Total_Percent = Total_Goal > 0 ? (Total_Now / Total_Goal) * 100 : 0;

  return (
    <section className="Main_Company_Sec Sec">
      <div className="Inner">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="Top">
              <div className="Title">
                <h2>{Biz_Name}</h2>
                <div className="Status">
                  <span>진행사항</span>
                  <p>{Biz_Process}</p>
                </div>
              </div>
              <div className="Calculate">
                <div className="Items">
                  <span>목표 감축량</span>
                  <p>
                    {Commas(parseFloat(Total_Goal.toFixed(3)))}
                    <em>tCO₂eq</em>
                  </p>
                </div>
                <div className="Items">
                  <span>진행 감축량</span>
                  <p>
                    {Commas(parseFloat(Total_Now.toFixed(3)))}
                    <em>tCO₂eq</em>
                  </p>
                </div>
                <div className="Items">
                  <span>남은 감축량</span>
                  <p>
                    {Commas(parseFloat(Total_Remain.toFixed(3)))}
                    <em>tCO₂eq</em>
                  </p>
                </div>
                <div className="Items">
                  <span>목표 도달</span>
                  <p>
                    {parseFloat(Total_Percent.toFixed(1))}
                    <em>%</em>
                  </p>
                </div>
                <div className="Comment">
                  <BsGraphUp />
                  <p>현 시점 으로 부터 8년 뒤 목표 수치에 도달할 가능성이 높습니다.</p>
                </div>
              </div>
            </div>

            <div className="Company_Info">
              {Data?.map((item) => {
                return (
                  <div className="Items" key={item.idx}>
                    <div
                      className="Name"
                      onClick={() => {
                        if (AUTH !== "U") {
                          Navigate(`/company/detail/${item.name}/${item.compressors[0].idx}`);
                          sessionStorage.setItem("Click_Addr", item.addr);
                        }
                      }}
                    >
                      {item.main ? <div className="T_ICO">대표</div> : ""}
                      <span>{item.name}</span>
                    </div>
                    <div className="Other">
                      <div className="Data">
                        <em>주소</em>
                        <span>{item.addr}</span>
                      </div>
                      <div className="Data Two">
                        <div className="D_Items">
                          <em>법인</em>
                          <span>{item.corp_reg_no}</span>
                        </div>
                        <div className="D_Items">
                          <em>사업자</em>
                          <span>{item.biz_reg_no}</span>
                        </div>
                      </div>
                    </div>

                    <div className="Emissions">
                      <div className="Left">
                        <div className="Data Total">
                          <span>목표 감축량</span>
                          <p>
                            {Commas(item.reduction_goal)}
                            <em>tCO₂eq</em>
                          </p>
                        </div>
                        <div className="Data Current">
                          <span>진행 감축량</span>
                          <p>
                            {Commas(item.reduction_now)}
                            <em>tCO₂eq</em>
                          </p>
                        </div>
                        <div className="Data Remaining">
                          <span>남은 감축량</span>
                          <p>
                            {Commas(item.reduction_remain)}
                            <em>tCO₂eq</em>
                          </p>
                        </div>
                      </div>

                      <div className="Right">
                        <ChartPie Target={item.reduction_goal} Cur={item.reduction_now} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Company;
