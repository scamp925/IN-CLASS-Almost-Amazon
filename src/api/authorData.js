import axios from 'axios';
import firebaseConfig from './apiKeys';

// import axios from "axios";

const dbUrl = firebaseConfig.databaseURL;

// GET ALL AUTHORS
const getAuthors = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});
// const getAuthors = (uid) => new Promise((resolve, reject) => {
//   axios.get(`${dbUrl}/authors.json?orderBy="uid"&equalTo="${uid}"`)
//     .then((response) => resolve(Object.values(response.data)))
//     .catch((error) => reject(error));
// });

// CREATE AUTHOR
const createAuthor = (newAuthorObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/authors.json`, newAuthorObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/authors/${response.data.name}.json`, body)
        .then(() => {
          getAuthors(newAuthorObj.uid).then(resolve);
        });
    }).catch(reject);
});

// GET SINGLE AUTHOR
const getSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// FILTER FAVORITE AUTHOR
const favAuthors = (uid) => new Promise((resolve, reject) => {
  getAuthors(uid)
    .then((userAuthors) => {
      const favoriteAuthors = userAuthors.filter((author) => author.favorite);
      resolve(favoriteAuthors);
    })
    .catch(reject);
  // .catch((error) => reject(error));
  // axios.get(`${dbUrl}/authors.json?orderBy="favorite"&equalTo=true`)
  //   .then((response) => resolve(Object.values(response.data)))
  //   .catch((error) => reject(error));
});

// DELETE AUTHOR
const deleteSingleAuthor = (uid, firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/authors/${firebaseKey}.json`)
    .then(() => {
      getAuthors(uid).then((authorsArray) => resolve(authorsArray)).catch((error) => reject(error));
    });
});

// UPDATE AUTHOR
const updateAuthor = (authorObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/authors/${authorObj.firebaseKey}.json`, authorObj)
    .then(() => getAuthors(authorObj.uid).then(resolve))
    .catch(reject);
});

// GET A SINGLE AUTHOR'S BOOKS
const getAuthorBooks = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="author_id"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getAuthors,
  createAuthor,
  getSingleAuthor,
  favAuthors,
  deleteSingleAuthor,
  updateAuthor,
  getAuthorBooks,
};
