//Acquiring transaction modal
const Transaction = require("../../../models/transaction");
//Acquiring user modal
const User = require("../../../models/user");
//Use momentJs for date and time
const moment = require("moment");

//Asynchronous Function for creating new transaction in the database
module.exports.create = async function (req, res) {
  try {
    let transaction = await Transaction.create({
      type: req.body.type,
      source: req.body.source,
      amount: req.body.amount,
      date: req.body.date,
      category: req.body.category,
      description: req.body.description,
      user: req.user._id,
    });

    let user = await User.findById(req.user.id);

    user.transactions.push(transaction);
    user.save();

    transaction = await Transaction.findOne({ _id: transaction._id }, [
      "type",
      "source",
      "description",
      "date",
      "category",
      "amount",
    ]);

    return res.json(200, {
      success: true,
      message: "Transaction is Successfully Created",
      data: {
        transaction: transaction,
      },
    });
  } catch (err) {
    return res.json(404, {
      success: false,
      message: "Internal Server Error",
    });
  }
};

//Asynchronous Function for deleting transactions from the database
module.exports.destroy = async function (req, res) {
  try {
    let user = await User.findById(req.user._id);
    let ids = req.body._id;

    ids.forEach((id) => {
      user.transactions.pull(id);
    });

    user.save();

    await Transaction.deleteMany(req.body, function (err) {
      if (err) {
        return res.json(404, {
          success: false,
          message: "Request Not complete",
        });
      }

      return res.json(200, {
        success: true,
        message: "Transaction Delete Successfully",
      });
    });
  } catch (err) {
    return res.json(404, {
      success: false,
      message: "Error in finding during deletinng the transaction",
    });
  }
};

//Asynchronous Function for updating transaction in the database
module.exports.update = async function (req, res) {
  try {
    await Transaction.findByIdAndUpdate({ _id: req.query.id }, req.body);

    let transaction = await Transaction.findOne({ _id: req.query.id }, [
      "type",
      "source",
      "description",
      "date",
      "category",
      "amount",
    ]);

    return res.json(200, {
      success: true,
      message: "Transaction Updated Successfully",
      data: {
        transaction: transaction,
      },
    });
  } catch (err) {
    return res.json(404, {
      success: false,
      message: "Error in finding during updatinng transaction",
    });
  }
};

//Asynchronous Function for fetching all the transaction list from the database
module.exports.index = async function (req, res) {
  try {
    const list = await Transaction.find(
      {
        user: req.user._id,
      },
      ["type", "source", "amount", "description", "category", "date"]
    ).sort("createdAt");

    if (!list) {
      return res.status(404).json({
        success: false,
        message: "Could not retrieve transactions",
      });
    }

    return res.json(200, {
      success: true,
      message: "List of Transactions",
      data: {
        transactions: list,
      },
    });
  } catch (err) {
    return res.json(404, {
      success: false,
      message: "Request Not Complete",
    });
  }
};

//Asynchronous Function for searching data according to the date or range
module.exports.searchByRange = async function (req, res) {
  try {
    var startDate = req.query.start;
    var endDate = req.query.end;

    if (startDate === "" || endDate === "") {
      return res.status(400).json({
        success: false,
        message: "Please ensure you pick two dates",
      });
    }

    const list = await Transaction.find({
      user: req.user._id,
      date: {
        $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
        $lt: new Date(new Date(endDate).setHours(23, 59, 59)),
      },
    }).sort("date");

    if (!list) {
      return res.status(404).json({
        success: false,
        message: "Could not retrieve transactions",
      });
    }

    return res.json(200, {
      success: true,
      message: "List of Income Transactions",
      data: {
        transactions: list,
      },
    });
  } catch (err) {
    return res.json(404, {
      success: false,
      message: "Request Not Complete",
    });
  }
};
