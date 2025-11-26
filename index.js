const express = require('express');
const morgan = require('morgan');
const cors = require("cors")
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

app.use(morgan("dev"))
app.use(cookieParser())
app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}));

app.use(require("./Routes/auth"))
app.use(require("./Routes/roles"))


app.listen(PORT, () => {
    console.log(`${new Date().toLocaleDateString()} Server is running on port ${PORT}`);
});