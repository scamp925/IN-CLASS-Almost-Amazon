import clearDom from '../../helpers/clearDom';
import renderToDOM from '../../helpers/renderToDom';

const viewAuthor = (obj) => {
  clearDom();

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
  </div>`;
  renderToDOM('#view', domString);
};

export default viewAuthor;
