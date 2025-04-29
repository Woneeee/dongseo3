import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { PuffLoader } from "react-spinners";

import { Commas } from "../../config/export/Format";
import { API_URL } from "../../config/export/API";

import Map from "../../components/main/Map";
import { setMainClick } from "../../redux/slice/Main";
import { Loading } from "../../components/Loading/Loading";

const Index = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const TOKEN = Cookies.get("KEWP_TK");
  const Level = Cookies.get("KEWP_Level");

  const [Filter_Option, setFilter_Option] = useState("");
  const [Filter_Data, setFilter_Data] = useState("");

  const [Data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, max: 1 });
  const [loading, setLoading] = useState(false);
  const [Page_Range, setPage_Range] = useState({ start: 0, end: 9 });

  const GET_Business = async (page = 1) => {
    dispatch(setMainClick([]));
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/biz/factories`, {
        params: {
          page,
          count: 10,
          dongsa_level: parseInt(Level),
          ...(Filter_Option !== "" && { filter_option: Filter_Option }),
          ...(Filter_Option !== "" && { filter_value: Filter_Data }),
        },
        headers: { token: TOKEN },
      });
      const result = res.data.data;
      setData(result.biz_list);
      setPagination({ current: result.page, max: result.max_page });
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, current: 1 }));
    setPage_Range(Calc_Page_Range(0, pagination.max));
    GET_Business(1);
  };

  const Calc_Page_Range = (Start_Idx = 0, max) => {
    return {
      start: Start_Idx,
      end: Math.min(Start_Idx + 9, max - 1),
    };
  };

  const handlePageClick = (page) => {
    setPagination((prev) => ({ ...prev, current: page }));
    GET_Business(page);
  };

  const handleNextPage = () => {
    if (Page_Range.end + 1 < pagination.max) {
      const nextStart = Page_Range.start + 10;
      setPage_Range(Calc_Page_Range(nextStart, pagination.max));
    }
  };

  const handlePrevPage = () => {
    const prevStart = Page_Range.start - 10;
    setPage_Range(prevStart >= 0 ? Calc_Page_Range(prevStart, pagination.max) : Calc_Page_Range(0, pagination.max));
  };

  const RenderPage = () => {
    return [...Array(pagination.max)].map((_, idx) => {
      const pageNum = idx + 1;
      if (pageNum >= Page_Range.start + 1 && pageNum <= Page_Range.end + 1) {
        return (
          <button key={idx} className={pagination.current === pageNum ? "view" : ""} onClick={() => handlePageClick(pageNum)}>
            {pageNum}
          </button>
        );
      }
      return null;
    });
  };

  const handleBizClick = (idx) => {
    dispatch(setMainClick(Data[idx]));
  };

  useEffect(() => {
    GET_Business(pagination.current);
  }, [Level]);

  useEffect(() => {
    setPage_Range(Calc_Page_Range(0, pagination.max));
  }, [pagination.max]);

  return (
    <section className="Main_Sec Sec">
      <div className="Inner">
        {loading ? (
          <Loading />
        ) : (
          <div className="Main_Data">
            <div className="Left">
              <div className="Company">
                {Data.map((item, idx) => {
                  // const Total_Air = item.max_flow_rate * item.run_time;
                  // const Total_Kwh = item.specific_power * Total_Air;
                  // const Emissions = (Total_Kwh / 1000) * 0.45941;
                  const Biz_State = item.biz_process === "착수신고" ? "G" : item.biz_process.includes("문서재제출") ? "Y" : item.biz_process.includes("문서보완") ? "O" : "";
                  return (
                    <div className="Item" key={idx}>
                      <div
                        className="Title"
                        onClick={() => {
                          handleBizClick(idx);
                          Navigate(`/company/${item.biz_group_idx}`);
                          sessionStorage.setItem("Click_Biz_Name", `${item.representative} 외 ${item.factories.length - 1}개사 ${item.biz_name}`);
                          sessionStorage.setItem("Click_Biz_Process", `${item.biz_process} ${item.biz_level === 0 ? "" : `${item.biz_level}차`}`);
                        }}
                      >
                        <div className="Name">
                          <span>
                            {item.representative} 외 {item.factories.length - 1}개사
                          </span>
                          <p>{item.biz_name}</p>
                        </div>
                        <div className={`Biz_S Items ${Biz_State}`}>
                          <em>진행</em>
                          <p>
                            {item.biz_process} {item.biz_level === 0 ? "" : `${item.biz_level} 차`}
                          </p>
                        </div>
                      </div>
                      <div className="Desc">
                        <div className="Emissions">
                          <div className="Data Total">
                            <span>목표 감축량</span>
                            <p>
                              {item.reduction_goal}
                              <em>tCO₂eq</em>
                            </p>
                          </div>
                          <div className="Data Current">
                            <span>진행 감축량</span>
                            <p>
                              {item.reduction_now}
                              <em>tCO₂eq</em>
                            </p>
                          </div>
                          <div className="Data Remaining">
                            <span>남은 감축량</span>
                            <p>
                              {item.reduction_remain}
                              <em>tCO₂eq</em>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="Paging">
                <button onClick={handlePrevPage}>
                  <FaChevronLeft />
                </button>
                <div className="Number">{RenderPage()}</div>
                <button onClick={handleNextPage}>
                  <FaChevronRight />
                </button>
              </div>
            </div>

            <div className="Right">
              <div className="Search">
                <select className="Select" value={Filter_Option} onChange={(e) => setFilter_Option(e.target.value)}>
                  <option value="">필터 선택</option>
                  <option value="name">업체명</option>
                  <option value="addr">업체주소</option>
                </select>
                <input type="text" placeholder="검색 내용을 입력해주세요..." value={Filter_Data || ""} onChange={(e) => setFilter_Data(e.target.value)} />
                <button className="BTN" onClick={handleSearch}>
                  검색
                </button>
              </div>

              <Map Data={Data} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Index;
