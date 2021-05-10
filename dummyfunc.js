const fs = require("fs");
const categories = require("./crawler/crawled/category/category.json");
const coinData = require("./crawler/crawled/coin/coinData.json");
const { coinCategories } = require("./crawler/baseList/categoryList");

exports.foo = () => {
  let wholeCategory = [];
  const notInclude = [];

  Object.entries(coinData).forEach(([k, v]) => {
    wholeCategory = [...wholeCategory, ...v.categories];
  });

  coinCategories.forEach((v) => {
    if (!wholeCategory.includes(v)) {
      notInclude.push(v);
    }
  });

  console.log(notInclude);
};
