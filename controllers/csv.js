const { Readable } = require("stream");
const csv = require("fast-csv");
const User = require("../models/user");

const bufferToStream = (buffer) => {
  return new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
  });
};

const parseFile = (buffer) => {
  return new Promise((resolve, reject) => {
    let csvData = [];

    const stream = bufferToStream(buffer);

    const csvStream = csv
      .parse()
      .on("error", (error) => reject(error))
      .on("data", ([UserName, FirstName, LastName, Age]) => {
        csvData.push({ UserName, FirstName, LastName, Age });
      })
      .on("end", () => {
        // Remove header row
        csvData.shift();

        resolve(csvData);
      });

    stream.pipe(csvStream);
  });
};

module.exports.uploadCSV = async (req, res) => {
  //Validation the file
  if (!req.file.mimetype.includes("csv")) {
    return res.status(400).send("File must be in CSV format");
  }

  try {
    //Save in the db
    const csvData = await parseFile(req.file.buffer);
    await User.insertMany(csvData);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports.downloadCSV = async (req, res) => {
  try {
    const users = await User.find({}, "-_id");

    //Create csv file
    const csvStream = csv.format({ headers: true });
    users.forEach((user) =>
      csvStream.write({
        UserName: user.UserName,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Age: user.Age,
      })
    );
    csvStream.end();

    //Send csv file to client
    res.set({
      "Content-disposition": "attachment; filename=users.csv",
      "Content-Type": "text/csv",
    });
    csvStream.pipe(res);
  } catch (err) {
    res.status(500).send(err);
  }
};
