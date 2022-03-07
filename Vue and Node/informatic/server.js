require("dotenv").config();

const fallback = require("express-history-api-fallback");
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const { nanoid } = require("nanoid");

const app = express();
const PORT = process.env.PORT || 3000;

const clientPromise = MongoClient.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
});

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(async (req, res, next) => {
  try {
    const client = await clientPromise;
    req.db = client.db("info-history");
    next();
  } catch (err) {
    next(err);
  }
});

app
  .route("/api/posts")
  .get(async (req, res) => {
    const POSTS = await req.db.collection("posts").find({}).toArray();
    res.json(POSTS).status(200);
  })
  .post(async (req, res) => {
    const data = req.body;
    const { ops } = await req.db.collection("posts").insertOne(data);
    res.json(ops).status(201);
  });

app.post("/api/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { ops } = await req.db
      .collection("posts")
      .updateOne({ _id: new ObjectId(id) }, { $set: req.body });
    res.json(ops).status(200);
  } catch (err) {
    console.error(err);
  }
});

app.delete("/api/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { result } = await req.db
      .collection("posts")
      .deleteOne({ _id: new ObjectId(id) });
    res.json(result).status(200);
  } catch (err) {
    console.error(err);
  }
});

app.post("/api/auth", async (req, res) => {
  const data = req.body;
  const ADMIN = await req.db.collection("admin").findOne({ name: data.user });
  if (ADMIN && ADMIN.password === data.password) {
    res
      .cookie("session", nanoid(), { httpOnly: false, maxAge: 3600000 })
      .json(ADMIN);
  } else {
    res.json({ status: 404 }).status(404);
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
  app.use(fallback("index.html", { root: "client/dist" }));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log("server has been started");
});
