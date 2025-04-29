import React from "react";
import { Commas } from "../../../config/export/Format";
import { Pie, PieChart, Tooltip } from "recharts";

const ChartPie = ({ Target, Cur }) => {
  const Calc = Target - Cur;
  const Percent = parseFloat((((Target - Calc) / Target) * 100).toFixed(0));

  return (
    <PieChart width={100} height={100}>
      <defs>
        <linearGradient id="gradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#1782ff" stopOpacity={1} />
          <stop offset="50%" stopColor="#00dcf1" stopOpacity={0.5} />
          <stop offset="100%" stopColor="#1782ff" stopOpacity={1} />
        </linearGradient>
      </defs>

      <Tooltip
        formatter={(value, name, props) => {
          // 단위 넣기
          const formattedValue = Commas(value);
          const customText = `${formattedValue} %`;
          return customText;
        }}
        itemStyle={{ color: "var(--blue-color)" }}
      />
      <Pie
        data={[
          { name: "진행 감축률", value: Number(Percent), fill: "url(#gradient)" },
          { name: "남은 감축률", value: 100 - Percent, fill: "var(--white-color-1)" },
        ]}
        cx={45}
        cy={45}
        innerRadius={45}
        outerRadius={50}
        fill="transparent"
        paddingAngle={5}
        dataKey="value"
        stroke="0"
        startAngle={90}
        endAngle={-450}
        cornerRadius={0}
      />
      <text x={50} y={50} textAnchor="middle" dominantBaseline="middle" fontSize="18" fill="var(--blue-color)">
        {Percent}%
      </text>
    </PieChart>
  );
};

export default ChartPie;
