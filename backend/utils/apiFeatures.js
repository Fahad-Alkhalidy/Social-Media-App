class APIFeatures {
  constructor(query, queryString) {
    this.query = query; //The Model
    this.queryString = queryString; //req.query
  }

  filter() {
    const queryObjShallowCopy = { ...this.queryString };
    const execludedFields = ["page", "fields", "sort", "limit"];
    execludedFields.forEach((el) => delete queryObjShallowCopy[el]);
    let queryObjDeepCopy = JSON.stringify(queryObjShallowCopy);
    queryObjDeepCopy.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryObjDeepCopy));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  limitFields() {
    if (this.queryString.limit) {
      let fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 20;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
