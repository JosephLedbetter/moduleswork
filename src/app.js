import { http } from './http';
import { ui } from './ui';

//GET POSTS ON THE DOM LOAD IMMEDIATELY
document.addEventListener('DOMContentLoaded', getPosts);

//LISEN FOR ADD POST
document.querySelector('.post-submit').addEventListener('click', submitPost);

//LISTEN FOR THE DELETE POST REQUEST 
document.querySelector('#posts').addEventListener('click', removePost);

function getPosts(){
  //HAVE TO RUN THE JSON:SERVER AND WEBPACK SIMULTANEOUSLY
  http.get('http://localhost:3000/posts')
  .then(data => ui.showPosts(data))
  .catch(err => console.log(err));
}

function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  const data = {
    title,
    body
  }

  console.log(data)

  //CREATE POST REQUEST 
  http.post('http://localhost:3000/posts', data)
  .then(data => {
    console.log('heard post data')
    ui.showAlert('Post Has Been Added!', 'alert alert-success');
    ui.clearFields();
    getPosts();
  })
  .catch(err => console.log(`not working correctly ${err}`));
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