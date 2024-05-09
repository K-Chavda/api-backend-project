import express from "express";
import dbConnect from "./db/index.js";
import { Post } from "./models/Post.model.js";

const app = express();
app.use(express.json());

dbConnect();

//API Endpoint
app.get("/", (req, res) => {
  res.json({
    message: "API is working",
  });
});

// Get All Posts
app.get("/api/posts", (req, res) => {
  Post.find({}).then((data) => {
    res.json(data);
  });
});

// Get Post by ID
app.get("/api/posts/:id", (req, res) => {
  Post.find({ _id: req.params.id }).then((data) => {
    res.json(data);
  });
});

// Create New Posts
app.post("/api/posts", (req, res) => {
  let newPost = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  newPost
    .save()
    .then((data) => {
      console.log(data);
      res.status(200).json({
        message: "Post Data Created Successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log("Error While Post Data Create. ERROR: ", err);
      res.status(500).json({
        message: `Error While Post Data Created. ERROR: ${err}`,
        data: err,
      });
    });
});

// Update Post by ID
app.put("/api/posts/:id", (req, res) => {
  let postid = req.params.id;
  let newPost = {
    title: req.body.title,
    description: req.body.description,
  };

  Post.findByIdAndUpdate(postid, newPost)
    .then((data) => {
      res.status(200).json({
        message: "Record Updated Successfully",
      });
    })
    .catch((err) => {
      console.log("Error While Post Data Update. ERROR: ", err);
      res.status(500).json({
        message: `Error While Post Data Update. ERROR: ${err}`,
        data: err,
      });
    });
});

// Delete Post by ID
app.delete("/api/posts/:id", (req, res) => {
  Post.findByIdAndDelete({ _id: req.params.id }).then((data) => {
    res.json({
      message: "Record Deleted from Posts",
      data: data,
    });
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("App is listning on Port: ", process.env.PORT || 3000);
});
