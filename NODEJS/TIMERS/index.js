require("dotenv").config();

const express = require("express");
const pick = require("lodash/pick");
const nunjucks = require("nunjucks");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();

const clientPromise = MongoClient.connect(process.env.DB_URI, {
  useUnifiedTopology: true,
  poolSize: 10,
});

nunjucks.configure("views", {
  autoescape: true,
  express: app,
  tags: {
    blockStart: "[%",
    blockEnd: "%]",
    variableStart: "[[",
    variableEnd: "]]",
    commentStart: "[#",
    commentEnd: "#]",
  },
});

app.set("view engine", "njk");

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

app.use(async (req, res, next) => {
  try {
    const client = await clientPromise;
    req.db = client.db("timers");
    next();
  } catch (err) {
    next(err);
  }
});

const hashPassword = (data) => bcrypt.hashSync(data, 10);

const findUserByUsername = (db, username) => {
  return db.collection("users").findOne({ username });
};

const findUserBySession = async (db, sessionId) => {
  const session = await db.collection("sessions").findOne({ session: sessionId });
  if (!session) {
    return;
  } else {
    return await db.collection("users").findOne({ _id: session.userID });
  }
};

const createSession = async (db, userID) => {
  const session = nanoid();

  await db.collection("sessions").insertOne({
    userID,
    session,
  });

  return session;
};

const createTimer = async (db, description, user_id) => {
  return await db.collection("timers").insertOne({
    user_id,
    start: Date.now(),
    progress: null,
    description,
    isActive: true,
    end: null,
    duration: null,
  });
};

const findTimerByTimerId = async (db, id) => {
  return await db.collection("timers").findOne({ _id: new ObjectId(id) });
};

const findTimersByActive = async (db, isActive, user_id) => {
  const timers = await db.collection("timers").find({ isActive, user_id }).toArray();
  timers.forEach((timer) => {
    timer.progress = Date.now() - timer.start;
  });
  return timers;
};

const stopTimer = async (db, data, id) => {
  return await db.collection("timers").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: data,
    }
  );
};

const deleteSession = async (db, session) => {
  await db.collection("sessions").deleteOne({ session });
};

const auth = () => async (req, res, next) => {
  if (!req.cookies["session"]) {
    return next();
  } else {
    try {
      const user = await findUserBySession(req.db, req.cookies["session"]);
      req.user = user;
      req.session = req.cookies["session"];
      next();
    } catch (err) {
      console.error(err);
    }
  }
};

app.get("/", auth(), (req, res) => {
  res.render("index", {
    user: req.user,
    authError: req.query.authError === "true" ? "Wrong username or password" : req.query.authError,
  });
});

app.get("/logout", auth(), async (req, res) => {
  if (!req.user) {
    res.redirect("/");
  } else {
    await deleteSession(req.db, req.session);
    res.clearCookie("session").redirect("/");
  }
});

app.post("/login", bodyParser.urlencoded({ extended: false }), async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findUserByUsername(req.db, username);
    if (!user) {
      return res.redirect("/?authError=true");
    } else {
      bcrypt.compare(password, user.password, async (err, hash) => {
        if (hash) {
          const session = await createSession(req.db, user["_id"]);
          res.cookie("session", session, { httpOnly: true }).redirect("/");
        } else {
          return res.redirect("/?authError=true");
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
});

app.post("/signup", bodyParser.urlencoded({ extended: false }), async (req, res) => {
  try {
    const data = pick(req.body, "username", "password");
    const user = await findUserByUsername(req.db, data.username);
    data.password = hashPassword(data.password);

    if (!user) {
      const { ops } = await req.db.collection("users").insertOne(data);
      const session = await createSession(req.db, ops[0]._id);
      res.cookie("session", session, { httpOnly: true }).status(201).redirect("/");
    } else {
      return res.redirect("/?authError=true");
    }
  } catch (err) {
    console.error(err);
  }
});

app
  .route("/api/timers")
  .get(auth(), async (req, res) => {
    try {
      if (req.query.isActive === "true") {
        const timers = await findTimersByActive(req.db, true, req.user._id);
        res.json(timers).status(200);
      } else {
        const timers = await findTimersByActive(req.db, false, req.user._id);
        res.json(timers).status(200);
      }
    } catch (err) {
      console.error(err);
    }
  })
  .post(auth(), async (req, res) => {
    try {
      const { insertedId } = await createTimer(req.db, req.body.description, req.user._id);
      res.json({ id: insertedId }).status(201);
    } catch (err) {
      console.error(err);
    }
  });

app.post("/api/timers/:id/stop", auth(), async (req, res) => {
  try {
    const id = req.params.id;
    const timer = await findTimerByTimerId(req.db, id);
    if (String(req.user._id) === String(timer["user_id"])) {
      const duration = Date.now() - timer.start;
      const data = {
        isActive: false,
        end: Date.now(),
        duration,
      };
      const { result } = await stopTimer(req.db, data, timer._id);
      res.status(200).json(result);
    } else {
      res.json(404);
    }
  } catch (err) {
    console.error(err);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`  Listening on http://localhost:${port}`);
});
