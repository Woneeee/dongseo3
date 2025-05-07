import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Table from "../../assets/icon/Table.png";
import { BsPlus } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import Modal from "../../components/management/business/Modal";
import { DummyMain } from "../../config/Dummy";
import { Loading } from "../../components/Loading/Loading";
import axios from "axios";
import { API_URL } from "../../config/export/API";
import { Commas } from "../../config/export/Format";

const Business = () => {
  const TOKEN = Cookies.get("KEWP_TK");
  const Level = Cookies.get("KEWP_Level");

  const [Click_Idx, setClick_Idx] = useState(0);
  const [Open, setOpen] = useState(false);
  const [Mode, setMode] = useState("Edit");

  const [Filter_Option, setFilter_Option] = useState("");
  const [Filter_Data, setFilter_Data] = useState("");

  const [Data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, max: 1 });
  const [loading, setLoading] = useState(false);
  const [Page_Range, setPage_Range] = useState({ start: 0, end: 9 });
  // start, end 는 idx 인거고, current, max 는 페이지 그 자체라서 idx 가 X
  // start, end 는 각각 말 그대로 보여지는 페이지 그룹의 시작값, 끝 값 인거임
  // current, max 는 내가 보고 있는 페이지, 그리고 전체 페이지 개수를 나타냄

  const GET_Business = async (page = 1) => {
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

  const Change_Representative = async () => {
    try {
      const res = await axios.patch(
        `${API_URL}/biz-group/representative/change`,
        {
          group_idx: 24, // 교체할 그룹의 인덱스 값
          representative_idx: 174, // 교체하고 싶은 기업의 인덱스 값
        },
        { headers: { token: TOKEN } }
      );
      console.log("그룹 내 대표 업체 변경 성공:", res.data);
    } catch (error) {
      console.error("그룹 내 대표 업체 변경 실패:", error);
    }
  };

  const Swap_Representative = async () => {
    try {
      const res = await axios.patch(
        `${API_URL}/biz-group/representative/swap`,
        {
          swap_target_idx1: 89, // 교체할 그룹1 대표 기업의 인덱스 값
          swap_target_idx2: 81, // 교체할 그룹2 대표 기업의 인덱스 값
        },
        { headers: { token: TOKEN } }
      );
      console.log("그룹 대표 교환 성공:", res.data);
    } catch (error) {
      console.error("그룹 대표 교환 실패:", error);
    }
  };
  // 두개 그룹의 대표기업 끼리만 교체

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
    setPage_Range(
      prevStart >= 0
        ? Calc_Page_Range(prevStart, pagination.max)
        : Calc_Page_Range(0, pagination.max) // 초기로 돌려줌
    );
  };

  const RenderPage = () => {
    return [...Array(pagination.max)].map((_, idx) => {
      const pageNum = idx + 1;
      if (pageNum >= Page_Range.start + 1 && pageNum <= Page_Range.end + 1) {
        return (
          <button
            key={idx}
            className={pagination.current === pageNum ? "view" : ""}
            onClick={() => handlePageClick(pageNum)}
          >
            {pageNum}
          </button>
        );
      }
      return null;
    });
  };

  useEffect(() => {
    GET_Business(pagination.current);
  }, [Level]);

  useEffect(() => {
    Change_Representative();
  }, []);

  useEffect(() => {
    Swap_Representative();
  }, []);

  useEffect(() => {
    setPage_Range(Calc_Page_Range(0, pagination.max));
  }, [pagination.max]);

  console.log(Data);

  return (
    <>
      <section className="Management_Sec Company Sec">
        <div className="Inner">
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="Title">
                <h2>사업 관리 페이지</h2>
                <p>기존 사업 수정, 신규 사업 등록이 가능합니다</p>
              </div>

              <div className="Main_Data">
                <div className="Left">
                  <div className="Title">
                    <div className="Name">
                      <img src={Table} alt="" className="ICON" />
                      <span>진행 사업 리스트</span>
                    </div>
                    <div className="Search">
                      <select
                        className="Select"
                        value={Filter_Option}
                        onChange={(e) => setFilter_Option(e.target.value)}
                      >
                        <option value="">필터 선택</option>
                        <option value="name">업체명</option>
                        <option value="addr">업체주소</option>
                      </select>
                      <input
                        type="text"
                        placeholder="검색 내용을 입력해주세요..."
                        value={Filter_Data || ""}
                        onChange={(e) => setFilter_Data(e.target.value)}
                      />
                      <button className="BTN" onClick={handleSearch}>
                        검색
                      </button>
                    </div>
                    <button
                      className="Add_BTN"
                      onClick={() => {
                        setOpen(true);
                        setMode("Add");
                      }}
                    >
                      <BsPlus />
                      신규 사업 추가
                    </button>
                  </div>
                  <div className="Desc">
                    <table className="Table">
                      <thead>
                        <tr>
                          <th>대표기업</th>
                          <th>사업명</th>
                          <th className="Center">참여기업수</th>
                          <th className="Center">목표감축량</th>
                          <th>진행여부</th>
                          <th className="Center">수정</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Data.map((item, idx) => {
                          // const Biz_State = item.biz_process === "착수신고" ? "G" : item.biz_process.includes("문서재제출") ? "Y" : item.biz_process.includes("문서보완") ? "O" : "";
                          return (
                            <>
                              <tr
                                key={idx}
                                className={idx === Click_Idx ? "active" : ""}
                              >
                                <td>{item.representative}</td>
                                <td>{item.biz_name}</td>
                                <td className="Center">
                                  {item.factories.length - 1}
                                </td>
                                <td className="Center">
                                  {Commas(item.reduction_goal)} <em>tCO₂eq</em>
                                </td>
                                <td>
                                  {item.biz_process}{" "}
                                  {item.biz_level === 0
                                    ? ""
                                    : `${item.biz_level} 차`}
                                </td>
                                <td className="BTN">
                                  <button
                                    className="Edit"
                                    onClick={() => {
                                      setClick_Idx(idx);
                                      setOpen(true);
                                      setMode("Edit");
                                    }}
                                  >
                                    Edit
                                  </button>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>

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
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      <Modal Idx={Click_Idx} Open={Open} setOpen={setOpen} Mode={Mode} />
    </>
  );
};

export default Business;
