const { format } = require("date-fns");

exports.getTime = () => {
  return format(new Date(), "HH:MM");
};
