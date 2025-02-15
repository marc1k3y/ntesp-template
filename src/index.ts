import express, { Request, Response, json, urlencoded } from "express";
import cors from "cors";
import router from "./router";
import { corsOptions } from "./middleware/cors";
import { errorMiddleware } from "./middleware/error";
import { PORT } from "./variables/constants";
import { sequelize } from "./service/postgre";


const app = express();
const port = PORT || 4001;

app.use(cors(corsOptions));
app.use(urlencoded({ extended: false }));
app.use(json());
app.use("/api", router);
app.use(errorMiddleware);

app.get("/", (_: Request, res: Response) => {
  res.send("[+] server is up");
});

app.listen(port, async () => {
  await sequelize.authenticate().then(async () => {
    await sequelize.sync();
    console.log("[+] sequelize");
  });
  console.log(`[+] express on ${port}`);
}); 