import { http } from './http';
import { ui } from './ui';

//GET POSTS ON THE DOM LOAD IMMEDIATELY
document.addEventListener('DOMContentLoaded', getPosts);

//LISEN FOR ADD POST
document.querySelector('.post-submit').addEventListener('click', submitPost);

//LISTEN FOR THE DELETE POST REQUEST 
document.querySelector('#posts').addEventListener('click', removePost);

//LISTEN FOR THE EDITSTATE() TO TAKE PLACE
document.querySelector('#posts').addEventListener('click', enableEdit);

//CANCEL THE EDITSTATE ACTION
document.querySelector('.card-form').addEventListener('click', cancelEdit);

/*_______ End of event listeners section  _______*/ 

function getPosts(){
  //HAVE TO RUN THE JSON:SERVER AND WEBPACK SIMULTANEOUSLY
  http.get('http://localhost:3000/posts')
  .then(data => ui.showPosts(data))
  .catch(err => console.log(err));
}

function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  if (title === '' || body === '') {
    ui.showAlert('Please complete both fields!', 'alert alert-danger')
  } else {
    const data = {
      title,
      body
    }
  
    console.log(data)
  
    //CREATE POST REQUEST 
    http.post('http://localhost:3000/posts', data)
    .then(data => {
      ui.showAlert('Post Has Been Added!', 'alert alert-success');
      ui.clearFields();
      getPosts();
    })
    .catch(err => console.log(`not working correctly ${err}`));
  }
}  
                                                                  
function removePost(e) {
  e.preventDefault();
  if(e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if (confirm('Are you sure?')){
      http
      .delete(`http://localhost:3000/posts/${id}`)
      .then(data => {
        ui.showAlert('Post removed!', 'alert alert-success');
        getPosts();

      })
      .catch(err => console.log(err));
    }
  }
}

//ENABLE EDIT STATE
//ENABLE EDIT STATE
//ENABLE EDIT STATE
//ENABLE EDIT STATE
function enableEdit(e){
e.preventDefault();
if(e.target.parentElement.classList.contains('edit')){
  const id = e.target.parentElement.dataset.id;
  const body = e.target.parentElement.previousElementSibling.textContent;
  const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

   const data = {
     id, 
     title, 
     body
   }

   //FILL THE FORM WITH THE CURRENT POST
   ui.fillForm(data);
  }

}

//CANCEL EDIT STATE
//CANCEL EDIT STATE
//CANCEL EDIT STATE
//CANCEL EDIT STATE
function cancelEdit(e) {
  if (e.target.classList.contains('post-cancel')){
    ui.changeFormState('add'); 
  }
e.preventDefault();
console.log('cancel edit heard')
}