class UI {
    constructor(){
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.id = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.formState = 'add';
    }

    showPosts(posts){
        let output = '';

        posts.forEach(function(post) {
            output += `
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <p class="card-text">${post.body}</p> 
                    <a href="#" class="edit card-link" data-id="${post.id}">
                    <i class="fa fa-pencil"></i>
                    </a>
                    <a href="#" class="delete card-link" data-id="${post.id}">
                    <i class="fas fa-minus-circle"></i>
                    </a>
                </div>
            </div>
            `;
        });
        this.post.innerHTML = output;
    }   

    showAlert(message, className) {
        this.clearAlert();

        // CREATING THE DIV
        const div = document.createElement('div');
        //ADD CLASSES
        div.className = className;
        //ADD TEXT
        div.appendChild(document.createTextNode(message));
        //GET PARENT --> beginning of inserting into the DOM
        const container = document.querySelector('.postContainer');
        //GET POST --> grabbing the POST div 
        const posts = document.querySelector('#posts');
        //INSERT YOUR ALERT DIV
        container.insertBefore(div, posts);

        //REMOVE AFTER THREE SECONDS WITH A SETTIMEOUT
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }


    clearAlert() {
        const currentAlert = document.querySelector('.alert');
       
        if (currentAlert) {
            currentAlert.remove();
        }
    }

    clearFields() {
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }
}


export const ui = new UI();