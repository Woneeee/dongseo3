import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";

import { BsFillGearFill, BsInfoCircle, BsXLg } from "react-icons/bs";
import Search from "../../assets/icon/Search.png";

import { API_URL } from "../../config/export/API";

import { DummyCompany, DummyList } from "../../config/Dummy";
import { Commas } from "../../config/export/Format";
import { CompDataInsert } from "../../config/export/DataText";
import { DatePickerDay, DatePickerMonth } from "../../config/library/DatePicker";
import { NextBizCompCalc } from "../../config/export/BizCalc";
import { Loading } from "../../components/Loading/Loading";

const Detail = () => {
  const [Info_Modal, setInfo_Modal] = useState(false);

  const TOKEN = Cookies.get("KEWP_TK");
  const LEVEL = useState(Cookies.get("KEWP_Level"));
  const { name, id } = useParams();

  const [loading, setLoading] = useState(false);
  const [DataComp, setDataComp] = useState([]);
  const [DataLog, setDataLog] = useState([]);
  const [CompanyName, setCompanyName] = useState([]);
  const [Date, setDate] = useState(moment().format("YYYY-MM"));
  const [InsertDate, setInsertDate] = useState(moment().format("YYYY-MM-DD"));

  const [CompIdx, setCompIdx] = useState(id);

  const GET_Compressor = async () => {
    try {
      const res = await axios.get(`${API_URL}/compressor/${parseInt(CompIdx)}`, {
        headers: { token: TOKEN },
      });
      const Data = res.data;
      setDataComp(Data);
    } catch (error) {
      console.error("공압기 조회 실패:", error);
    }
  };

  const GET_Company = async () => {
    try {
      const res = await axios.get(`${API_URL}/factories`, {
        params: {
          dongsa_level: parseInt(LEVEL),
          filter_option: "name",
          filter_value: name,
        },
        headers: { token: TOKEN },
      });
      const Data = res.data.data.factories;
      setCompanyName(Data);
      // setData(Data);
    } catch (error) {
      console.error("업체 조회 실패:", error);
    }
  };

  const GET_Log = async () => {
    try {
      const res = await axios.get(`${API_URL}/compressor/${parseInt(CompIdx)}/write_logs`, {
        params: {
          year_month: Date,
        },
        headers: { token: TOKEN },
      });
      const Data = res.data.data;
      setDataLog(Data);
    } catch (error) {
      console.error("로그 조회 실패:", error);
    }
  };

  useEffect(() => {
    const API = async () => {
      setLoading(true);
      try {
        await GET_Compressor();
        await GET_Company();
        await GET_Log();
      } finally {
        setLoading(false);
      }
    };
    API();
  }, [name, id]);

  const [CompValue, setCompValue] = useState({
    run_time: null,
    load_time: null,
    load_percent: null,
    hp: DataComp.hp ? DataComp.hp : null,
    write_date: null,
    total_air: null,
    total_kwh: null,
    total_emissions: null,
  });
  // 부하율 계산
  useEffect(() => {
    const Run = parseFloat(CompValue.run_time);
    const Load = parseFloat(CompValue.load_time);

    if (!isNaN(Run) && !isNaN(Load) && Run > 0) {
      const percent = ((Load / Run) * 100).toFixed(2);
      setCompValue((prev) => ({ ...prev, load_percent: percent }));
    }
  }, [CompValue.run_time, CompValue.load_time]);

  // 토탈 계산
  const [CompCalc, setCompCalc] = useState({ Total_Air: 0, Total_Kwh: 0, Emissions: 0 });

  const handleCompCalc = () => {
    const Calc = NextBizCompCalc(DataComp.max_output, CompValue.load_time, DataComp.kw_by_flow);
    setCompCalc({ Total_Air: Calc.Total_Air, Total_Kwh: Calc.Total_Kwh, Emissions: Calc.Emissions });
  };

  // 검색 시 요청
  const GET_All = async () => {
    setLoading(true);
    try {
      await GET_Compressor();
      await GET_Company();
      await GET_Log();
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="Main_Detail_Sec Sec">
      <div className="Inner">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="Top">
              <div className="Title">
                <h2>{name}</h2>
                <address>{sessionStorage.getItem("Click_Addr")}</address>
              </div>
              <div className="Search">
                <select className="Select" value={CompIdx} onChange={(e) => setCompIdx(e.target.value)}>
                  {CompanyName.map((item) => (
                    <option key={item.compressors[0].idx} value={item.compressors[0].idx}>
                      {item.compressors[0].model}
                    </option>
                  ))}
                </select>
                <button className="BTN" onClick={GET_All}>
                  검색
                </button>
              </div>
            </div>

            <div className="Main_Data">
              <div className="Left">
                <div className="Title">
                  <div className="Name">
                    <img src={Search} alt="" className="ICON" />
                    <span>작성 기록 조회</span>
                  </div>
                  <div className="Search">
                    <div className="Date">
                      <DatePickerMonth onChange={(date) => setDate(moment(date).format("YYYY-MM"))} />
                    </div>
                    <button className="BTN" onClick={GET_Log}>
                      검색
                    </button>
                  </div>
                </div>
                <ul className="List">
                  {DataLog.length === 0 ? (
                    <li style={{ minHeight: "68px" }}>
                      <em></em>
                      <div className="Val">
                        <p>조회한 기간에 데이터가 존재하지 않습니다.</p>
                      </div>
                    </li>
                  ) : (
                    DataLog.map((item, idx) => (
                      <li key={idx}>
                        <em></em>
                        <div className="Val">
                          <span>등록일</span>
                          <p>{item.date}</p>
                        </div>
                        <div className="Val">
                          <span>작성자</span>
                          <p>{item.name}</p>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
                <div className="Data">
                  <div className="Val">
                    <span>총 가동시간</span>
                    <div className="INP_Box">
                      <input type="text" />
                      <em>hour</em>
                    </div>
                  </div>
                  <div className="Val">
                    <span>부하 운전 시간</span>
                    <div className="INP_Box">
                      <input type="text" />
                      <em>hour</em>
                    </div>
                  </div>
                  <div className="Val">
                    <span>부하율</span>
                    <div className="INP_Box">
                      <input type="text" />
                      <em>%</em>
                    </div>
                  </div>
                  <div className="Val">
                    <span>유량당 소비전력</span>
                    <div className="INP_Box">
                      <input type="text" />
                      <em>kWh/Nm³</em>
                    </div>
                  </div>
                  <div className="Val">
                    <span>분당 최대 토출 용량</span>
                    <div className="INP_Box">
                      <input type="text" />
                      <em>m³/min</em>
                    </div>
                  </div>
                </div>

                <div className="Calculate">
                  <div className="Inner">
                    <div className="Val">
                      <span>총 토출량</span>
                      <div className="INP_Box">
                        <input type="text" disabled />
                        <em>Nm³</em>
                      </div>
                    </div>
                    <div className="Val">
                      <span>총 전력량</span>
                      <div className="INP_Box">
                        <input type="text" disabled />
                        <em>kwh</em>
                      </div>
                    </div>
                    <div className="Val">
                      <span>총 배출량</span>
                      <div className="INP_Box">
                        <input type="text" disabled />
                        <em>tCO₂eq</em>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="Right">
                <div className="Title">
                  <div className="Name">
                    <span>
                      {DataComp?.model}
                      <BsInfoCircle className={`Info_Ico ${Info_Modal ? "on" : ""}`} title="자세히" onClick={() => setInfo_Modal(true)} />
                    </span>
                    <p>SN : {DataComp?.serial_number}</p>
                  </div>
                  <div className="Date">
                    <span>등록 날짜</span>
                    <DatePickerDay onChange={(date) => setDate(moment(date).format("YYYY-MM-DD"))} />
                  </div>
                </div>

                <div className="Info">
                  <div className="IMG_Box">
                    <img src={`${process.env.PUBLIC_URL}/img/comp/${DataComp.image_model}.png`} alt="" />
                  </div>

                  <ul className="Data_List">
                    <li>
                      <span>유량당 소비 전력</span>
                      <p>
                        {DataComp.kw_by_flow}
                        <em>kwh/Nm³</em>
                      </p>
                    </li>
                    <li>
                      <span>분당 최대 토출 용량</span>
                      <p>
                        {DataComp.max_output}
                        <em>m³/min</em>
                      </p>
                    </li>
                    <li>
                      <span>총 가동시간</span>
                      <div className="INP_Box">
                        <input type="number" value={CompValue.run_time || ""} onChange={(e) => setCompValue({ ...CompValue, run_time: e.target.value })} />
                        <em>hour</em>
                      </div>
                    </li>
                    <li>
                      <span>부하 운전 시간</span>
                      <div className="INP_Box">
                        <input type="number" value={CompValue.load_time || ""} onChange={(e) => setCompValue({ ...CompValue, load_time: e.target.value })} />
                        <em>hour</em>
                      </div>
                    </li>
                    <li>
                      <span>부하율</span>
                      <div className="INP_Box">
                        <input type="number" value={CompValue.load_percent || ""} onChange={(e) => setCompValue({ ...CompValue, load_percent: e.target.value })} />
                        <em>%</em>
                      </div>
                    </li>
                    <li>
                      <span>장비 마력</span>
                      <div className="INP_Box">
                        <input type="number" value={CompValue.hp || ""} onChange={(e) => setCompValue({ ...CompValue, hp: e.target.value })} />
                        <em>hp</em>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="Calculate">
                  <div className="Calc_Title">
                    <button onClick={handleCompCalc}>계산 클릭</button>
                  </div>
                  <div className="Inner">
                    <div className="Val">
                      <span>총 토출량</span>
                      <div className="INP_Box">
                        <input type="text" value={Commas(parseFloat(CompCalc.Total_Air).toFixed(3))} disabled />
                        <em>Nm³</em>
                      </div>
                    </div>
                    <div className="Val">
                      <span>총 전력량</span>
                      <div className="INP_Box">
                        <input type="text" value={Commas(parseFloat(CompCalc.Total_Kwh).toFixed(3))} disabled />
                        <em>kwh</em>
                      </div>
                    </div>
                    <div className="Val">
                      <span>총 배출량</span>
                      <div className="INP_Box">
                        <input type="text" value={Commas(parseFloat(CompCalc.Emissions).toFixed(3))} disabled />
                        <em>tCO₂eq</em>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`Modal_Info ${Info_Modal ? "on" : ""}`}>
                  <div className="Inner">
                    <div className="Title">
                      <div className="Name">
                        <span>데이터 등록 설명</span>
                        <BsXLg className="Close_Ico" title="닫기" onClick={() => setInfo_Modal(false)} />
                      </div>
                      <p>이 내용은 입력 된 유량 토출, 소비전력, 운전시간을 토대로 유량, 전력, 배출량을 구하는 시스템입니다.</p>
                    </div>

                    <div className="Desc">
                      <div className="Info_List">
                        <div className="Sub_Title">
                          <span>
                            명칭 설명
                            <em>
                              ( <BsFillGearFill className="Gear" /> 표시된 데이터의 경우 <b>설비관리</b> 에서만 수정이 가능합니다.)
                            </em>
                          </span>
                        </div>

                        {CompDataInsert[0]?.map((item, idx) => {
                          return (
                            <div className="Items" key={idx}>
                              <span>
                                {item.label} {item.import ? <BsFillGearFill className="Gear" /> : ""}
                              </span>
                              <p>{item.desc}</p>
                            </div>
                          );
                        })}
                      </div>

                      <div className="Info_List Calc">
                        <div className="Sub_Title">
                          <span>계산식 설명</span>
                        </div>

                        {CompDataInsert[1]?.map((item, idx) => {
                          return (
                            <div className="Items" key={idx}>
                              <span>
                                {idx + 1}. {item.label}
                              </span>
                              <p>{item.desc}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Detail;
