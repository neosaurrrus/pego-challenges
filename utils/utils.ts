export const convertUnixTimeToHumanTime = (unixTime: number) => {
  if (!unixTime) {
    return "";
  }
  const date = new Date(unixTime * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = String("0" + date.getMinutes()).substr(-2);
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
