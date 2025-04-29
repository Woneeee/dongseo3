import moment from "moment";

export const getLoadTime = () => {
  const month = moment().month() + 1; // 현재 월 (1 ~ 12)
  const hour = moment().hour(); // 현재 시간의 시간값 (0 ~ 23)

  // 여름 (6월 ~ 8월)
  if (month >= 6 && month <= 8) {
    if ((hour >= 22 && hour < 24) || (hour >= 0 && hour < 8)) {
      return { timeRange: "08:00 ~ 22:00", label: "Low", label_kr: "경부하" };
    } else if ((hour >= 8 && hour < 11) || (hour >= 12 && hour < 13) || (hour >= 18 && hour < 22)) {
      return { timeRange: "08:00 ~ 11:00, 12:00 ~ 13:00, 18:00 ~ 22:00", label: "Middle", label_kr: "중부하" };
    } else if ((hour >= 11 && hour < 12) || (hour >= 13 && hour < 18)) {
      return { timeRange: "11:00 ~ 12:00, 13:00 ~ 18:00", label: "High", label_kr: "최대부하" };
    }
  }
  // 겨울 (11월 ~ 2월)
  else if (month === 11 || month === 12 || month === 1 || month === 2) {
    if ((hour >= 22 && hour < 24) || (hour >= 0 && hour < 8)) {
      return { timeRange: "08:00 ~ 22:00", label: "Low", label_kr: "경부하" };
    } else if ((hour >= 8 && hour < 9) || (hour >= 12 && hour < 16) || (hour >= 19 && hour < 22)) {
      return { timeRange: "08:00 ~ 09:00, 12:00 ~ 16:00, 19:00 ~ 22:00", label: "Middle", label_kr: "중부하" };
    } else if ((hour >= 9 && hour < 12) || (hour >= 16 && hour < 19)) {
      return { timeRange: "09:00 ~ 12:00, 16:00 ~ 19:00", label: "High", label_kr: "최대부하" };
    }
  }
  // 봄, 가을 (3월 ~ 5월, 9월 ~ 10월)
  else {
    if ((hour >= 22 && hour < 24) || (hour >= 0 && hour < 8)) {
      return { timeRange: "08:00 ~ 22:00", label: "Low", label_kr: "경부하" };
    } else if ((hour >= 8 && hour < 11) || (hour >= 12 && hour < 13) || (hour >= 18 && hour < 22)) {
      return { timeRange: "08:00 ~ 11:00, 12:00 ~ 13:00, 18:00 ~ 22:00", label: "Middle", label_kr: "중부하" };
    } else if ((hour >= 11 && hour < 12) || (hour >= 13 && hour < 18)) {
      return { timeRange: "11:00 ~ 12:00, 13:00 ~ 18:00", label: "High", label_kr: "최대부하" };
    }
  }

  return { timeRange: "", label: "", label_kr: "" };
};
