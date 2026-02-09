import express from "express";
import { db, requestTable, cityTable, userTable } from "@ae/db";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  const { searchString, skip, take, orderBy } = req.query;

  try {
    const result = await db
        .select()
        .from(requestTable);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.json({ message: 'error!'});
  }
});

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000`),
);
