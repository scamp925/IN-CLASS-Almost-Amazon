import { deleteSingleAuthor, getAuthorBooks, getSingleAuthor } from './authorData';
import { deleteBook, getSingleBook } from './bookData';

const viewBookDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(bookFirebaseKey)
    .then((bookObject) => {
      getSingleAuthor(bookObject.author_id)
        .then((authorObject) => {
          resolve({ authorObject, ...bookObject });
        });
    }).catch((error) => reject(error));
});

const viewAuthorDetails = (authorFirebaseKey) => new Promise((resolve, reject) => {
  getSingleAuthor(authorFirebaseKey)
    .then((authorObject) => {
      getAuthorBooks(authorObject.firebaseKey)
        .then((authorBooksArray) => {
          resolve({ authorBooksArray, ...authorObject });
        });
    }).catch((error) => reject(error));
});

const deleteAuthorBooks = (uid, authorId) => new Promise((resolve, reject) => {
  getAuthorBooks(authorId).then((booksArray) => {
    const deleteBookPromise = booksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromise).then(() => {
      deleteSingleAuthor(uid, authorId).then(resolve);
    });
  }).catch(reject);
});

export { viewBookDetails, viewAuthorDetails, deleteAuthorBooks };
