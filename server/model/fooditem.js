const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  items: {
    type: String,
    required: true,
  },
  statuses: [
    {
      status: {
        type: String,
        required: true,
      },
    },
  ],
  employees: [
    {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
    },
  ],
});

itemSchema.methods.addStatus = async function (status) {
  try {
    this.statuses = this.statuses.concat({ status });
    await this.save();
    return this.status;
  } catch (error) {
    console.log(error);
  }
};

itemSchema.methods.assign = async function (name, phone) {
  try {
    this.employees = this.employees.concat({ name, phone });
    await this.save();
    return this.employees;
  } catch (error) {
    console.log(error);
  }
};

const Item = mongoose.model("ITEM", itemSchema);

module.exports = Item;
