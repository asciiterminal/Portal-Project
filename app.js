const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = 5000;

// For the bodyParser. To get the data from client side.
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

// For the session. Encrypts the session ID with a secret.
app.use(
  session({
    secret: "something",
    resave: false,
    saveUninitialized: false,
  })
);

// Binds session to user logins.
app.use(passport.initialize());
app.use(passport.session());

// MongoDB stuff.
mongoose.connect("mongodb://localhost:27017/ManDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);

// MongoDB Database tables. We have 3. 3 was enough.
const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  isTeacher: Boolean,
});

const projectSchema = new mongoose.Schema({
  name: String,
  owner: String,
  information: String,
  student: Array,
});

const memberSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  grade: String,
  information: String,
  file: String,
});

// Bind userSchema to passport for login.
userSchema.plugin(passportLocalMongoose); //binds credentials to the passport

const User = mongoose.model("User", userSchema);
const Project = mongoose.model("Project", projectSchema);
const Member = mongoose.model("Member", memberSchema);

module.exports = mongoose.model("User", userSchema);

// More boilerplate for passport. (User login)
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.post("/api/register", (req, res) => {
  User.register(
    //local mongoose passport extension
    {
      _id: new mongoose.Types.ObjectId(),
      name: req.body.user.name,
      isTeacher: req.body.user.isTeacher,
      username: req.body.user.username,
    },
    req.body.user.password, // body parser gets info from post request
    function (err, user) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send("OK");
      }
    }
  );
});

app.post(
  "/api/login",
  passport.authenticate("local", { successRedirect: "/" })
);

app.get("/api/current_user", (req, res) => {
  res.send(req.user); // Sends the current user info over.
});

app.post("/api/create-project", (req, res) => {
  Project.create(
    {
      name: req.body.project.name,
      information: req.body.project.info,
      owner: req.user._id,
    },
    function (err, small) {
      if (err) return console.log(err);
      else {
        res.status(200).send("OK");
      }
    }
  );
});

app.get("/api/owned-project", (req, res) => {
  // executes, passing results to callback
  if (req.isAuthenticated()) {
    Project.find({ owner: req.user._id }, function (err, foundProject) {
      if (err) return handleError(err);
      else {
        res.send(foundProject);
      }
    });
  }
});

app.post("/api/delete-project", (req, res) => {
  if (req.isAuthenticated()) { // If user is autorized.
  Project.deleteOne({ name: req.body.name, owner: req.user._id }, function (err, foundProject) {
    if (err) return console.log(err);
    else {
      console.log(foundProject)
      Member.deleteMany({ project: foundProject._id }, function (err) {
        if (err) return console.log(err);
        else {


      res.send("OK");

        }
      });
    }
  });
}
});

var openedProject;
app.post("/api/open-project", (req, res) => {
  // executes, passing results to callback
  if (req.isAuthenticated()) {
    Project.findById(req.body.project, function (err, foundProject) {
      if (err) return console.log(err);
      else {
        openedProject = foundProject;
        res.send("OK");
      }
    });
  }
});

app.get("/api/open-project", (req, res) => {
  // executes, passing results to callback
  if (req.isAuthenticated()) {
    res.send(openedProject);
  }
});

app.post("/api/add-student-to-project", (req, res) => {
  // executes, passing results to callback
  if (req.isAuthenticated()) {
    User.findOne({ username: req.body.addStudent.email }, function (
      err,
      foundStudent
    ) {
      if (err) return console.log(err);
      else {
        if (foundStudent === null) res.status(418);
        else {
          Member.create(
            { student: foundStudent._id, project: req.body.addStudent.project },
            function (err, foundMember) {
              if (err) return console.log(err);

              Project.findById(req.body.addStudent.project, function (
                err,
                foundProject
              ) {
                if (err) return console.log(err);
                else {
                  foundProject.student.push(foundMember._id);
                  foundProject.save();
                  res.send("OK");
                }
              });
            }
          );
        }
      }
    });
  }
});

app.post("/api/get-students", (req, res) => {
  // executes, passing results to callback
  if (req.isAuthenticated()) {
    Project.findById(req.body.project, function (err, foundProject) {
      if (err) return console.log(err);
      else {
        Member.find({ project: foundProject })
          .populate("student") // Populate combines tables.
          .exec(function (err, foundMembers) {
            if (err) return console.log(err);

            res.send(foundMembers);
          });
      }
    });
  }
});

app.post("/api/grade-student", (req, res) => {
  // executes, passing results to callback
  if (req.isAuthenticated()) {
    Member.findById(req.body.member, function (err, foundMember) {
      if (err) return console.log(err);
      else {
        foundMember.grade = req.body.grade;
        foundMember.information = req.body.info;
        foundMember.save();
        res.send("OK");
      }
    });
  }
});

app.get("/api/member-of-project", (req, res) => {
  // executes, passing results to callback
  if (req.isAuthenticated()) {
    Member.find({ student: req.user._id })
      .populate("project")
      .exec(function (err, foundMembers) {
        if (err) return console.log(err);

        res.send(foundMembers);
      });
  }
});

// Everything below is for uploading feature.
const DIR = "./files/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (req.isAuthenticated()) {
    Member.findById(req.body.member, function (err, foundMember) {
      if (err) return console.log(err);
      else {
        foundMember.file = req.file.filename;
        foundMember.save();
        res.send("OK");
      }
    });
  }
});

// Sends the file URL to be downloaded.
app.use(express.static("files"));
app.post("/api/download", (req, res) => {
  if (req.isAuthenticated()) {
    Member.findById(req.body.member, function (err, foundMember) {
      if (err) return console.log(err);
      else {
        res.send(foundMember.file);
      }
    });
  }
});

app.post("/api/logout", (req, res) => {
  if (req.isAuthenticated()) {
    req.logout();
    res.send("OK");
  }
});

// The port ExpressJS is listening to. Which is 5000.
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
