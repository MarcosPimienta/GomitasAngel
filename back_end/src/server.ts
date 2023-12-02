import express from "express";
import { pool } from "./utils/database";
import userRoutes from './routes/users.routes';

const app = express();
const port = 3000;

// Middleware to handle JSON requests
app.use(express.json());

app.use('/api', userRoutes);

// For testing purposes, you can keep this or remove it
app.get("/", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT * FROM Users');
    connection.release();

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error querying the database", error });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
