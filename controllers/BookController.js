const Joi = require("joi");
const { authorize, roles } = require("../middleaware/authorize");

let books = [];

const bookSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  author: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
});

exports.CreateBook = [
  authorize([roles.ADMIN]),
  (req, res) => {
    const { error, value } = bookSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const book = {
      id: books.length + 1,
      ...value,
    };

    books.push(book);
    res.status(201).send(book);
  },
];

exports.GetBooks = (req, res) => {
  res.status(200).send(books);
};

exports.GetBookById = (req, res) => {
  const { id } = req.params;
  const book = books.find((book) => book.id == id);

  if (!book) {
    return res.status(404).send("Kitap bulunamadı");
  }

  res.status(200).send(book);
};

exports.UpdateBook = [
  authorize([roles.ADMIN]),
  (req, res) => {
    const { error, value } = bookSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const { id } = req.params;
    const index = books.findIndex((book) => book.id == id);

    if (index === -1) {
      return res.status(404).send("Kitap bulunamadı");
    }

    books[index] = { id: parseInt(id), ...value };
    res.status(200).send(books[index]);
  },
];

exports.DeleteBook = [
  authorize([roles.ADMIN]),
  (req, res) => {
    const { id } = req.params;
    const index = books.findIndex((book) => book.id == id);

    if (index === -1) {
      return res.status(404).send("Kitap bulunamadı");
    }

    books.splice(index, 1);
    res.status(204).send();
  },
];
