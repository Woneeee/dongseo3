import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Table from "../../assets/icon/Table.png";
import { BsPlus } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { API_URL } from "../../config/export/API";
import Modal from "../../components/management/company/Modal";
import { Loading } from "../../components/Loading/Loading";

const Company = () => {
  const [Click_IDX, setClick_IDX] = useState(0);
  const [Open, setOpen] = useState(false);
  const [Mode, setMode] = useState("Edit");

  const TOKEN = Cookies.get("KEWP_TK");
  const Level = Cookies.get("KEWP_Level");

  const [Filter_Option, setFilter_Option] = useState("");
  const [Filter_Data, setFilter_Data] = useState("");

  const [Data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, max: 1 });
  const [loading, setLoading] = useState(false);
  const [Page_Range, setPage_Range] = useState({ start: 0, end: 9 });

  const GET_Company = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/factories`, {
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
      setData(result.factories);
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
    GET_Company(1);
  };

  const Calc_Page_Range = (Start_Idx = 0, max) => {
    return {
      start: Start_Idx,
      end: Math.min(Start_Idx + 9, max - 1),
    };
  };

  const handlePageClick = (page) => {
    setPagination((prev) => ({ ...prev, current: page }));
    GET_Company(page);
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

  useEffect(() => {
    GET_Company(pagination.current);
  }, [Level]);

  useEffect(() => {
    setPage_Range(Calc_Page_Range(0, pagination.max));
  }, [pagination.max]);
  return (
    <>
      <section className="Management_Sec Company Sec">
        <div className="Inner">
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="Title">
                <h2>업체 관리 페이지</h2>
                <p>기존 기업 수정, 신규 기업 등록이 가능합니다</p>
              </div>

              <div className="Main_Data">
                <div className="Left">
                  <div className="Title">
                    <div className="Name">
                      <img src={Table} alt="" className="ICON" />
                      <span>참여 기업 리스트</span>
                    </div>

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

                    <button
                      className="Add_BTN"
                      onClick={() => {
                        setOpen(true);
                        setMode("Add");
                      }}
                    >
                      <BsPlus />
                      신규 기업 추가
                    </button>
                  </div>
                  <div className="Desc">
                    <table className="Table">
                      <thead>
                        <tr>
                          <th>기업명</th>
                          <th>주소</th>
                          <th>사업자번호</th>
                          <th>법인번호</th>
                          <th>업태</th>
                          <th>종목</th>
                          <th className="Center">수정</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Data.map((item, idx) => {
                          return (
                            <>
                              <tr key={item.idx}>
                                <td>{item.name}</td>
                                <td>{item.addr}</td>
                                <td>{item.corp_reg_no}</td>
                                <td>{item.biz_reg_no}</td>
                                <td>{item.industry}</td>
                                <td>{item.sector}</td>
                                <td className="BTN">
                                  <button
                                    className="Edit"
                                    onClick={() => {
                                      setClick_IDX(idx);
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
      <Modal Click_Data={Data[Click_IDX]} Open={Open} setOpen={setOpen} Mode={Mode} GET_Company={GET_Company} />
    </>
  );
};

export default Company;
