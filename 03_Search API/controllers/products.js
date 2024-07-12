import { model as Product } from "../models/product.js";

// Testing routes
export const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .sort("price")
    .select("name price");
  await res.status(200).json({ products, nbHits: products.length });
};

// Real routes
export const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query; // destructure a key from the req.qeuery obj becuase query params are key-value pairs, ex. "http://localhost:5000/api/v1/products?featured=true&name=table" the query params obj is { featured: true, name: table }
  const queryObj = {}; // build the query the user is requesting, if they include the name in the query param, we know we need to add name to our query param obj to use in the find() function

  // filter all products by featured
  if (featured) {
    queryObj.featured = featured === "true" ? true : false;
  }

  // filter all products by company
  if (company) {
    queryObj.company = company;
  }

  // filter all products by name
  if (name) {
    queryObj.name = { $regex: name, $options: "i" }; // instead of directly passing the name, we can use mongoose's regex to make it to where the name doesn't have to match exactly to find matches, options 'i' means case-insensitive
  }

  // filter by numeric filters such as price > 30, etc
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
    };

    // filters is an array with each numeric filter in it but instead of the user friendly symbol it's the mongoose command: "price>30" -> "price-$gt-40"
    const regEx = /\b(<|>|>=|=|<=)\b/g;
    let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-"); // Array destructure each part of the string, "price-$gt"
      if (options.includes(field)) {
        queryObj[field] = { [operator]: Number(value) }; // This will be the query object: { price: {'$gt': 40 } }
      }
    });
  }

  let result = Product.find(queryObj); // mongoose filter methods must be chanined onto find(), issue is that if we used something like sort() on it then it will always sort even if the user doesn't want to sort it, instead we can await it last after we figure out which object we're returning

  // sort products
  if (sort) {
    const sortList = sort.split(",").join(" "); // sort returns the query params in this format: 'name,-price', sort() takes in the query params with spaces between them not commas, so we can get rid of the commas and replace them with spaces using the split() and join() functions
    result = result.sort(sortList);
  } else {
    // if the user doesn't enter the sort query param, sort by the date they're created at
    result = result.sort("createdAt");
  }

  // filter fields shown in response
  if (fields) {
    const fieldsList = fields.split(",").join(" "); // sort returns the query params in this format: 'name,-price', sort() takes in the query params with spaces between them not commas, so we can get rid of the commas and replace them with spaces using the split() and join() functions
    result = result.select(fieldsList);
  }

  // When fetching products, user can provide a page number or limit
  const page = Number(req.query.page) || 1; // which page it starts on
  const limit = Number(req.query.limit) || 10; // helper for the page feature, limit the queries to 10 if no limit is passed in
  const skip = (page - 1) * limit; // helper for the page feature, skip amount of queries

  result = result.skip(skip).limit(limit);

  const products = await result; // Product.find(queryObj) returns a promise that resolves to the queries from the DB
  res.status(200).json({ products, nbHits: products.length });
};

/* 
  Page math explained:

  If I start out with 23 queries, if I decided to limit the response to only 7 queries, how many pages do I have?

  23 / 7 = 4 pages because there will be 7 on the first page, 7 on the next, 7 on the next, 2 on the last.

  The reason for (page - 1) * limit, if the user doesn't pass in a page or limit we'll have (1 - 1) * 10,
  which is 0, so we'll skip 0 queries (meaning it'll start from the first query) and the response will
  be limited to 10, so our first page will have 10 queries starting from the first query.

  If they want to start from the 2nd page, we'll have (2 - 1) * 10 = 10, so our skip will be 10 and
  our skip will be 10, so it'll skip the first 10 queries and the limit will be 10, so it'll show the 
  10 queries after the first 10 is skipped.
  */
