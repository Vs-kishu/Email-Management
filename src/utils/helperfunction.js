export const getDateTime = (date) => {
  const timestamp = date; // Unix timestamp in milliseconds
  const newdate = new Date(timestamp);
  const year = newdate.getFullYear();
  const month = newdate.getMonth() + 1;
  const day = newdate.getDate();
  const hours = newdate.getHours();
  let amOrPm;

  if (hours < 12) {
    amOrPm = "AM";
  } else {
    amOrPm = "PM";
  }
  const minutes = newdate.getMinutes();
  return { year, month, day, hours, amOrPm, minutes };
};
