import React, { useState } from "react";
import { styled } from "styled-components";
// DatePicker 라이브러리
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
// DatePicker CSS
import "react-datepicker/dist/react-datepicker.css";
// 언어변경
import { ko } from "date-fns/esm/locale";
import moment from "moment";

const CustomInput = styled.input`
  text-align: center;
  background-color: var(--box-title-color);
  font-size: 14px;
  color: #333;
  cursor: pointer;
  padding: 10px 0 10px 10px !important;
  border: 1px solid ${(props) => (props.isOpen ? "var(--blue-color)" : "transparent")};
  border-radius: 5px;
  transition: 0.4s;
  outline: none;
  width: 200px;

  &:focus {
    border-color: var(--blue-color);
  }
`;

// 단일선택
export const DatePickerDay = ({ onChange }) => {
  const [Day, setDay] = useState(new Date());

  const handleDateChange = (date) => {
    setDay(date);
    onChange(date);
  };
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return <DatePicker showIcon locale={ko} selected={Day} onChange={handleDateChange} customInput={<CustomInput />} dateFormat="yyyy-MM-dd" />;
};

export function DatePickerMonth({ onChange }) {
  const currentDate = new Date();
  const [Month, setMonth] = useState(currentDate);

  const handleDateChange = (date) => {
    setMonth(date);
    onChange(date);
  };
  return <DatePicker showIcon locale={ko} selected={Month} onChange={handleDateChange} dateFormat="yyyy-MM" customInput={<CustomInput />} showMonthYearPicker showFullMonthYearPicker />;
}
export function DatePickerYear({ onChange }) {
  const currentDate = new Date();
  const [Year, setYear] = useState(currentDate);

  const handleDateChange = (date) => {
    setYear(date);
    onChange(date);
  };
  return <DatePicker showIcon locale={ko} selected={Year} onChange={handleDateChange} showYearPicker dateFormat="yyyy" customInput={<CustomInput />} />;
}

// 단일선택 DAY 7일전부터 시작
export const DatePickerDayStart7 = ({ onChange }) => {
  const [start, setStart] = useState(() => addDays(new Date(), -7));

  const handleDateChange = (date) => {
    setStart(date);
    // 선택된 날짜를 부모 컴포넌트로 전달
    onChange(date);
  };

  return <DatePicker showIcon locale={ko} selected={start} onChange={handleDateChange} customInput={<CustomInput />} dateFormat="yyyy-MM-dd" />;
};

export const DatePickerDayEnd = ({ onChange }) => {
  const [end, setEnd] = useState(new Date());

  const handleDateChange = (date) => {
    setEnd(date);
    // 선택된 날짜를 부모 컴포넌트로 전달
    onChange(date);
  };

  return <DatePicker showIcon locale={ko} selected={end} onChange={handleDateChange} customInput={<CustomInput />} dateFormat="yyyy-MM-dd" />;
};

// 다중선택 DAY
export const DatePickerDay2 = ({ onChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      const Format_Start = moment(start).format("YYYY-MM-DD");
      const Format_End = moment(end).format("YYYY-MM-DD");
      onChange(Format_Start, Format_End);
    }
  };

  return (
    <DatePicker showIcon locale={ko} selected={startDate} dateFormat="yyyy-MM-dd" customInput={<CustomInput />} onChange={handleDateChange} startDate={startDate} endDate={endDate} selectsRange />
  );
};

// 월 시작
export function DatePickerStartMonth({ onChange }) {
  const [SMonth, setSMonth] = useState(new Date());

  const handleDateChange = (date) => {
    setSMonth(date);
    // 선택된 날짜를 부모 컴포넌트로 전달
    onChange(date);
  };
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  lastDayOfMonth.setHours(23, 59, 59, 999);

  return (
    <DatePicker locale={ko} selected={SMonth} onChange={handleDateChange} customInput={<CustomInput />} dateFormat="yyyy-MM" showMonthYearPicker showFullMonthYearPicker maxDate={lastDayOfMonth} />
  );
}

// 월 종료
export function DatePickerEndMonth({ onChange }) {
  const [EMonth, setEMonth] = useState(new Date());

  const handleDateChange = (date) => {
    setEMonth(date);
    // 선택된 날짜를 부모 컴포넌트로 전달
    onChange(date);
  };

  return <DatePicker showIcon locale={ko} selected={EMonth} onChange={handleDateChange} customInput={<CustomInput />} dateFormat="yyyy-MM" showMonthYearPicker showFullMonthYearPicker />;
}

// 다중선택 MONTH2
export const DatePickerMonth1 = ({ onChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      const Format_Start = moment(start).format("YYYY-MM");
      const Format_End = moment(end).format("YYYY-MM");
      onChange(Format_Start, Format_End);
    }
  };
  return (
    <DatePicker
      showIcon
      locale={ko}
      selected={startDate}
      dateFormat="yyyy-MM"
      customInput={<CustomInput />}
      onChange={handleDateChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      showMonthYearPicker
      showFullMonthYearPicker
    />
  );
};

// 다중선택 MONTH2
export function DatePickerMonth2() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <DatePicker
      showIcon
      locale={ko}
      selected={startDate}
      dateFormat="yyyy-MM"
      customInput={<CustomInput />}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      // excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
      selectsRange
      showMonthYearPicker
      showFullMonthYearPicker
    />
  );
}
