exports.removeSecondsFromTime = timestamp => {
  // timestamp = "8:39:04 PM"
  const splitTimeStamp = timestamp.split(" ");
  // splitTime = "8:39:04"
  const splitTime = splitTimeStamp[0].split(":");
  // period = "PM" or "AM"
  const period = splitTimeStamp[1];
  // time is now "8:39"
  splitTime.pop();

  const timeWithoutSeconds = splitTime.join(":");

  return `${timeWithoutSeconds} ${period}`;
};

exports.getTimestamp = () => {
  const timestamp = new Date().toLocaleTimeString();
  return this.removeSecondsFromTime(timestamp)
};

exports.capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}