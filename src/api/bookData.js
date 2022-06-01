import axios from 'axios';
import firebaseConfig from './apiKeys';
// API CALLS FOR BOOKS

const dbUrl = firebaseConfig.databaseURL;

// GET BOOKS
const getBooks = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

// DELETE BOOK
const deleteBook = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/books/${firebaseKey}.json`)
    .then(() => {
      getBooks().then((booksArray) => resolve(booksArray));
    })
    .catch((error) => reject(error));
});

// GET SINGLE BOOK
const getSingleBook = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// CREATE BOOK
const createBook = (newBookObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/books.json`, newBookObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/books/${response.data.name}.json`, body)
        .then(() => {
          getBooks().then(resolve);
        });
    }).catch(reject);
});

// UPDATE BOOK
const updateBook = (bookObject) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/books/${bookObject.firebaseKey}.json`, bookObject)
    .then(() => getBooks().then(resolve))
    .catch(reject);
});

// FILTER BOOKS ON SALE
const booksOnSale = (uid) => new Promise((resolve, reject) => {
  getBooks(uid)
    .then((userBooks) => {
      const onSale = userBooks.filter((book) => book.sale);
      resolve(onSale);
    })
    .catch((error) => reject(error));
});

// TODO: STRETCH...SEARCH BOOKS

export {
  getBooks,
  createBook,
  booksOnSale,
  deleteBook,
  getSingleBook,
  updateBook
};
