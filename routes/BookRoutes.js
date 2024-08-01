const express = require("express");
const router = express.Router();
const {
  CreateBook,
  GetBooks,
  GetBookById,
  UpdateBook,
  DeleteBook,
} = require("../controllers/BookController");

router.post("/books", CreateBook);
router.get("/books", GetBooks);
router.get("/books/:id", GetBookById);
router.put("/books/:id", UpdateBook);
router.delete("/books/:id", DeleteBook);

module.exports = router;
