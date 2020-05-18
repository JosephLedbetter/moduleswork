import { http } from './http';
import { ui } from './ui';

//GET POSTS ON THE DOM LOAD IMMEDIATELY
document.addEventListener('DOMContentLoaded', getPosts);

//LISEN FOR ADD POST
document.querySelector('.post-submit').addEventListener('click', submitPost);

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
                                                                                                                                    