import dayjs from "dayjs";

export const getLiveTime = () => {
  return dayjs().format("hh:mm A"); // Example: "12:48 PM"
};

export const getFormattedDate = () => {
  return dayjs().format("MMM D, YYYY"); // Example: "Aug 17, 2021"
};

export const formatExpirationDate = (timestamp: number) => {
  return dayjs.unix(timestamp).format("MMM D, YYYY"); // Example: "Aug 17, 2021"
};
