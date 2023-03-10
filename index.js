const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors')

const customers = require("./routes/customer");
const fakeData = require('./routes/faker');
const methodOverride = require('method-override')
const search = require('./routes/search')


// connect to db
mongoose
  .connect("mongodb+srv://vercel-admin-user:<password>@cluster0.ftojm2b.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to DB Server..."))
  .catch((err) => console.log("connected to DB Server Faild"));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

app.set("view engine", "ejs");
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/public", express.static(__dirname + "/public"));

app.get("/", customers);
app.use("/api/customer", customers);
app.use('/api/fake', fakeData);
app.use('/api/search', search);




const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
