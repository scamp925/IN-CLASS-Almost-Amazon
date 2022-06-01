import { createBook, updateBook } from '../../api/bookData';
import { createAuthor, updateAuthor } from '../../api/authorData';
import showBooks from '../components/pages/books';
import showAuthors from '../components/pages/authors';

const formEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('submit', (e) => {
    e.preventDefault();
    // CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK
    if (e.target.id.includes('submit-book')) {
      const newBookObj = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author_id').value,
        uid,
      };
      createBook(newBookObj).then((booksArray) => showBooks(booksArray));
    }

    // CLICK EVENT FOR EDITING A BOOK
    if (e.target.id.includes('update-book')) {
      const [, firebaseKey] = e.target.id.split('--');
      const updatedBookObj = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author_id').value,
        firebaseKey,
        uid,
      };
      updateBook(updatedBookObj).then(showBooks);
    }

    // ADD CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('submit-author')) {
      const newAuthorObj = {
        firebaseKey: document.querySelector('#submit-author').value,
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        email: document.querySelector('#email').value,
        favorite: document.querySelector('#favorite').checked,
        uid,
      };
      createAuthor(newAuthorObj).then((authorArray) => showAuthors(authorArray));
    }
    // ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      const [, authorId] = e.target.id.split('--');
      const updatedAuthorObj = {
        firebaseKey: document.querySelector('#submit-author').value,
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        email: document.querySelector('#email').value,
        favorite: document.querySelector('#favorite').checked,
        authorId,
        uid,
      };
      updateAuthor(updatedAuthorObj).then(showAuthors);
    }
  });
};

export default formEvents;
