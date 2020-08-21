const mongoose = require("mongoose");

module.exports = (app) => {
  mongoose
    .connect(process.env.CLOUD_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      //Start the server
      const port = process.env.PORT || 4000;
      app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
      });
    })
    .catch((err) => console.log(err));

  //Disconnect db on stopping the process
  process.on("SIGINT", () => mongoose.disconnect());
};
