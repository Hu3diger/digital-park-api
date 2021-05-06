const express = require("express");

const app = express();
const port = 4000;
const BASE_URL = '/api/v1'
app.use(express.json());

app.post(BASE_URL + "/Users", async (req, res) => {
    console.log(req.body);
    res.send('usuários');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}${BASE_URL}`);
});
