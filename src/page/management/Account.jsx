import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { API_URL } from "../../config/export/API";
import Table from "../../assets/icon/Table.png";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { BsPlus } from "react-icons/bs";
import { Loading } from "../../components/Loading/Loading";
import moment from "moment";
import Modal from "../../components/management/Account/Modal";
const Account = () => {
  const TOKEN = Cookies.get("KEWP_TK");
  const Level = Cookies.get("KEWP_Level");

  const [Open, setOpen] = useState(false);
  const [Mode, setMode] = useState("Insert");

  const [Data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, max: 1 });
  const [Page_Range, setPage_Range] = useState({ start: 0, end: 9 });
  const [Click_Idx, setClick_Idx] = useState(0);
  const [loading, setLoading] = useState(false);

  const GET_User = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/users/dongsa/users`, {
        params: {
          page,
          count: 10,
        },
        headers: { token: TOKEN },
      });
      const result = res.data.data;

      setData(result.users);
      setPagination({ current: result.page, max: result.max_page });
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const Calc_Page_Range = (Start_Idx = 0, max) => {
    return {
      start: Start_Idx,
      end: Math.min(Start_Idx + 9, max - 1),
    };
  };

  const handlePageClick = (page) => {
    setPagination((prev) => ({ ...prev, current: page }));
    GET_User(page);
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
    GET_User(pagination.current);
  }, [Level]);

  const Auth_Name = (name) => {
    switch (name) {
      case "M":
        return "마스터";
      case "A":
        return "관리자";
      case "U":
        return "유저";
      default:
        return "알 수 없음";
    }
  };

  const GET_User_Del = async (id, name) => {
    const Confirm = window.confirm(`${name}님의 ID:${id} 삭제하시겠습니까?`);

    if (!Confirm) return;
    try {
      const res = await axios.delete(`${API_URL}/users/dongsa/user`, {
        headers: { token: TOKEN },
        data: [{ id: id }],
      });
      const result = res.data;
      alert(`${result.detail}`);
    } catch (error) {
      console.error("유저 삭제 실패:", error);
      alert(`${name}님의 계정 삭제 과정에서 문제가 발생하였습니다.`);
    } finally {
      GET_User();
    }
  };

  return (
    <>
      <section className="Management_Sec Account Sec">
        <div className="Inner">
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="Title">
                <h2>계정 관리 페이지</h2>
                <p>기존 계정 수정 및 삭제, 신규 계정 생성이 가능합니다</p>
              </div>

              <div className="Main_Data">
                <div className="Left">
                  <div className="Title">
                    <div className="Name">
                      <img src={Table} alt="" className="ICON" />
                      <span>계정 리스트</span>
                    </div>
                    <button
                      className="Add_BTN"
                      onClick={() => {
                        setOpen(true);
                        setMode("Insert");
                      }}
                    >
                      <BsPlus />
                      신규 계정 추가
                    </button>
                  </div>
                  <div className="Desc">
                    <table className="Table">
                      <thead>
                        <tr>
                          <th>아이디</th>
                          <th>이름</th>
                          <th>회사</th>
                          <th>권한</th>
                          <th>로그인 시간</th>
                          <th>로그아웃 시간</th>
                          <th>삭제</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Data.map((item, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{item.id}</td>
                              <td>{item.user_name}</td>
                              <td>{item.factory_name}</td>
                              <td
                                onClick={() => {
                                  setOpen(true);
                                  setClick_Idx(idx);
                                  setMode("Auth");
                                }}
                              >
                                {Auth_Name(item.auth)}
                              </td>
                              <td>{item.login_time ? moment(item.login_time).format("YYYY-MM-DD HH:mm:ss") : "-"}</td>
                              <td>{item.logout_time ? moment(item.logout_time).format("YYYY-MM-DD HH:mm:ss") : "-"}</td>
                              <td className="BTN">
                                <button className="Del" onClick={() => GET_User_Del(item.id, item.user_name)}>
                                  삭제
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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
              </div>
            </>
          )}
        </div>
      </section>
      <Modal Open={Open} setOpen={setOpen} Mode={Mode} GET_User={GET_User} Data={Data[Click_Idx]} />
    </>
  );
};

export default Account;
