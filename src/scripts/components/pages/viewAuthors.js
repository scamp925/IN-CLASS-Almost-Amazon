import clearDom from '../../helpers/clearDom';
import renderToDOM from '../../helpers/renderToDom';

const viewAuthor = (obj) => {
  clearDom();
  let booksDomString = '';
  obj.authorBooksArray.forEach((book) => {
    booksDomString += `<div class="card">
    <img class="card-img-top" src=${book.image} alt=${book.title} style="height: 400px;">
    <div class="card-body" style="height: 180px;">
      <h5 class="card-title">${book.title}</h5>
        <p class="card-text bold">${book.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${book.price}` : `$${book.price}`}</p>
        <hr>
        <i class="btn btn-success fas fa-eye" id="view-book-btn--${book.firebaseKey}"></i>
        <i id="edit-book-btn--${book.firebaseKey}" class="fas fa-edit btn btn-info"></i>
        <i id="delete-book-btn--${book.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
    </div>
  </div>`;
  });

  const domString = `
  <div>
    <div class="text-white ms-5 details">
     <h5>${obj.first_name} ${obj.last_name} ${obj.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
     Author Email: <a href="mailto:${obj.email}">${obj.email}</a>   
   </div>
   <div class="ms-5">
     <i id="edit-book-btn--${obj.firebaseKey}" class="fas fa-edit btn btn-info"></i>
     <i id="delete-book--${obj.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
     <hr>
   </div>
   <div class="text-white ms-5">
    <h5>Books</h5>
   </div>
  </div>
  <div class="book-cards">${booksDomString}</div>`;
  renderToDOM('#view', domString);
};

export default viewAuthor;
