exports.mockfunc = async (req, res, next) => {
  try {
    return res.status(200).json();
  } catch (err) {
    next(err);
  }
};
