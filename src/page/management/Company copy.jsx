import React from "react";
import Table from "../../assets/icon/Table.png";
import { DummyCompany } from "../../config/Dummy";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Company = () => {
  return (
    <section className="Management_Sec Company Sec">
      <div className="Inner">
        <div className="Title">
          <h2>업체 관리 페이지</h2>
          <p>기존 업체 수정, 신규 업체 등록이 가능합니다</p>
        </div>

        <div className="Main_Data">
          <div className="Left">
            <div className="Title">
              <div className="Name">
                <img src={Table} alt="" className="ICON" />
                <span>참여 업체 리스트</span>
              </div>
            </div>
            <div className="Desc">
              <table className="Table">
                <thead>
                  <tr>
                    <th className="Num">번호</th>
                    <th>업체명</th>
                    <th>주소</th>
                    <th>사업명</th>
                    <th>진행여부</th>
                    <th>수정</th>
                  </tr>
                </thead>
                <tbody>
                  {DummyCompany.map((item, idx) => {
                    return (
                      <tr key={idx} className={idx === 0 ? "active" : ""}>
                        <td className="Num">{idx + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        <td>{item.business}</td>
                        <td>{item.progress}</td>
                        <td>
                          <button>Edit</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

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
          </div>

          <div className="Right">
            <div className="Title">
              <span>업체 정보 수정</span>
              <div className="Save_BTN">
                <button className="BTN">저장하기</button>
              </div>
            </div>

            <div className="Select_Data">
              <div className="Sel_BOX INP_BOX Company">
                <div className="Items">
                  <span>업체명</span>
                  <input type="text" value={DummyCompany[0].name} />
                </div>
                <select name="" id="" className="Count">
                  <option value="">차수 선택</option>
                  <option value="">1차</option>
                  <option value="">2차</option>
                  <option value="">3차</option>
                </select>
              </div>
              <div className="INP_BOX Two_Data">
                <div className="Items">
                  <span>사업자등록번호</span>
                  <input type="text" value={"606-81-82037"} />
                </div>
                <div className="Items">
                  <span>법인등록번호</span>
                  <input type="text" value={"180111-0456392"} />
                </div>
              </div>
              <div className="INP_BOX Two_Data">
                <div className="Items">
                  <span>업태</span>
                  <input type="text" value={"제조"} />
                </div>
                <div className="Items">
                  <span>종목</span>
                  <input type="text" value={"기계, 자동차부품 외"} />
                </div>
              </div>

              <div className="INP_BOX">
                <span>우편번호</span>
                <div className="Add_Search">
                  <input type="text" />
                  <button>검색</button>
                </div>
              </div>

              <div className="INP_BOX">
                <span>주소</span>
                <input type="text" value={DummyCompany[0].address} />
              </div>
              <div className="INP_BOX">
                <span>사업명</span>
                <input type="text" value={DummyCompany[0].business} />
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Company;
