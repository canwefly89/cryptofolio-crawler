const { format } = require("date-fns");
/**
 *
 * @param {object} inputData Option for audioContext
 * @returns Created audioContext
 */
exports.getDate = () => {
  return format(new Date(), "yyyy-MM-dd HH:MM");
};
