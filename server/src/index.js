import { app } from "./app.js";
import dbConnect from "./db/index.js";
import userRoutes from "./routes/user.routes.js";

app.use(userRoutes);

dbConnect()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("App is listning on Port: ", process.env.PORT || 3000);
    });
  })
  .catch((err) => {
    console.log("Database Connection Failed. ERROR: ", err);
  });
