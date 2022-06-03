import { getSingleAuthor } from '../../api/authorData';
import { deleteBook, getSingleBook } from '../../api/bookData';
import { viewBookDetails, viewAuthorDetails, deleteAuthorBooks } from '../../api/mergedData';
import addAuthorForm from '../components/forms/addAuthorForm';
import addBookForm from '../components/forms/addBookForm';
import showAuthors from '../components/pages/authors';
import showBooks from '../components/pages/books';
import viewAuthor from '../components/pages/viewAuthors';
import viewBook from '../components/pages/viewBook';

const domEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteBook(uid, firebaseKey).then((booksArray) => showBooks(booksArray));
      }
    }

    // CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm(uid);
    }

    // CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      // 1. get the book (getSingleBook())
      // 2. pass book object to book form
      getSingleBook(firebaseKey).then((bookObj) => addBookForm(bookObj));
    }
    // CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      const [, bookFirebaseKey] = e.target.id.split('--');
      viewBookDetails(bookFirebaseKey).then((bookAuthorObject) => viewBook(bookAuthorObject));
    }

    // CLICK EVENT FOR DELETING AUTHOR AND ALL AUTHOR'S BOOKS
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteAuthorBooks(firebaseKey).then((authorsArray) => showAuthors(authorsArray));
      }
    }

    // ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm(uid);
    }
    // FIXME: ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('edit-author-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      getSingleAuthor(firebaseKey).then((authorObj) => addAuthorForm(authorObj.uid));
    }

    // CLICK EVENT FOR VIEW AUTHOR DETAILS
    if (e.target.id.includes('view-author-btn')) {
      const [, authorFirebaseKey] = e.target.id.split('--');
      viewAuthorDetails(authorFirebaseKey).then((authorBookObject) => viewAuthor(authorBookObject.uid));
    }
  });
};

export default domEvents;
