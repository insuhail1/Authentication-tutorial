const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
// Init middleware
app.use(express.json());

let resBody = {
  data: null,
  error: null,
  message: "",
  status: 400,
};

const secretKey = "mySecretKey";

app.post("/login", (req, res) => {
  try {
    const { email } = req.body || {};
    const token = jwt.sign({ email }, secretKey);
    resBody = {
      ...resBody,
      data: { token, email },
      message: "success",
      status: 200,
    };
    res.status(resBody.status).json(resBody);
  } catch (err) {
    resBody = {
      ...resBody,
      error: err.message,
      status: 400,
      message: "error",
    };
    res.status(resBody.status).json(resBody);
  }
});

app.get("/verify", (req, res) => {
  try {
    const token = req.headers.token;
    var decoded = jwt.verify(token, secretKey);
    resBody = {
      ...resBody,
      data: { decoded },
      status: 200,
    };
    res.status(resBody.status).json(resBody);
  } catch (err) {
    resBody = {
      ...resBody,
      error: err.message,
      status: 400,
      message: "error",
    };
    res.status(resBody.status).json(resBody);
  }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running at PORT ${PORT}`));
