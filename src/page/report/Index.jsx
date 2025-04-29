import React, { useRef, useState } from "react";
import logo from "../../assets/img/logo.png";
import Elec from "../../assets/icon/Elec.png";
import Flow from "../../assets/icon/Flow.png";
import Co2 from "../../assets/icon/Co2.png";
import { Bar, CartesianGrid, ComposedChart, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DummyReportChart } from "../../config/Dummy";
import { Commas } from "../../config/export/Format";
import { BsPrinterFill, BsTriangleFill } from "react-icons/bs";
import { useReactToPrint } from "react-to-print";

const Index = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "연간 보고서",
  });

  const [Mode, setMode] = useState(false);

  return (
    <>
      {/* <button className="Print" onClick={handlePrint}> */}
      <button
        onClick={() => {
          setMode(true);
        }}
      >
        {/* <BsPrinterFill /> */}
        출력 모드
      </button>
      <section className="Report_Sec Sec" ref={componentRef}>
        <div className={`Inner ${Mode ? "Mode" : ""}`}>
          <div className="Title">
            <div className="Name">
              <span>2025 연간 보고서</span>
              <h2>
                <img src={logo} alt="" />
              </h2>
            </div>
          </div>

          <div className="Total_Data">
            <div className="Items">
              <img src={Elec} alt="" />
              <span>총 전력량</span>
              <p>
                795,754<em>kwh</em>
              </p>
            </div>
            <div className="Items">
              <img src={Flow} alt="" />
              <span>총 토출량</span>
              <p>
                8,861,403<em>Nm³</em>
              </p>
            </div>
            <div className="Items">
              <img src={Co2} alt="" />
              <span>총 배출량</span>
              <p>
                380.45<em>tCO₂eq</em>
              </p>
            </div>
          </div>

          <div className="Chart_Data">
            <div className="Items Bar_Chart">
              <div className="Name">
                <span>월별 배출량</span>
              </div>
              <div className="Chart">
                <ResponsiveContainer>
                  <ComposedChart margin={{ top: 0, right: 0, left: -20, bottom: 0 }} data={DummyReportChart}>
                    <Tooltip
                      formatter={(value, name, props) => {
                        const unit = "tCO₂eq";
                        return `${value} ${unit}`;
                      }}
                    />

                    <XAxis
                      dataKey="date"
                      axisLine={{ stroke: "var(--white-color-2)", strokeWidth: 2 }}
                      tick={{ fill: "var(--white-color-5)" }}
                      tickLine={false}
                      dy={0}
                      textAnchor="middle"
                      angle={0}
                      fontSize={12}
                    />
                    <YAxis axisLine={{ stroke: "", strokeWidth: 2 }} tick={{ fill: "var(--white-color-5)" }} tickLine={false} dy={0} dx={-5} textAnchor="middle" angle={0} fontSize={12} />
                    <CartesianGrid vertical={false} horizontal={true} strokeDasharray="3 0" />
                    {/* <Legend verticalAlign="top" height={30} /> */}

                    {/* <Area type="monotone" dataKey={Chart_Change === "Min" ? "kw" : "lastKwh"} name={Name} {...Area_B} /> */}
                    <Bar dataKey={"data"} barSize={15} fill="var(--blue-color)" stroke="0" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="Data">
              <div className="Items">
                <div className="Name">
                  <span>전년 대비</span>
                  <BsTriangleFill className="ICON" />
                </div>
                <div className="Chart">
                  <PieChart width={150} height={150}>
                    <defs>
                      <linearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
                        <stop offset="0%" stopColor="#1782ff" stopOpacity={1} />
                        <stop offset="50%" stopColor="#00dcf1" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#1782ff" stopOpacity={1} />
                      </linearGradient>
                    </defs>

                    <Tooltip formatter={(Value) => `${Commas(Value)} %`} itemStyle={{ color: "var(--blue-color)" }} />
                    <Pie
                      data={[
                        { name: "현재", Value: 43.53, fill: "var(--blue-color)" },
                        { name: "이전", Value: 100 - 43.53, fill: "rgba(140, 150, 165, 0.2)" },
                      ]}
                      // cx={25}
                      // cy={25}
                      innerRadius={65}
                      outerRadius={75}
                      fill="transparent"
                      paddingAngle={0}
                      dataKey="Value"
                      stroke="0"
                      startAngle={90}
                      endAngle={-270}
                      cornerRadius={0}
                    />
                    <text x={75} y={75} textAnchor="middle" dominantBaseline="middle" fontSize="20" fill="var(--blue-color)">
                      {43.53} %
                    </text>
                  </PieChart>
                  <div className="Increase">
                    <span>배출량</span>
                    <p>{Math.abs(43.53 - (100 - 43.53)).toFixed(2)}</p>
                    <em>%</em>
                    <span>감소</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <table className="Table">
            <thead>
              <tr>
                <th>날짜</th>
                <th>총 전력량</th>
                <th>총 토출량</th>
                <th>총 배출량</th>
              </tr>
            </thead>
            <tbody>
              {DummyReportChart.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td>2025년 {item.date}월</td>
                    <td>
                      {Commas(item.total_elec)}
                      <em>kwh</em>
                    </td>
                    <td>
                      {Commas(item.total_air)}
                      <em>Nm³</em>
                    </td>
                    <td>
                      {Commas(item.data)}
                      <em>tCO₂eq</em>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Index;
