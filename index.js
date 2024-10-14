// Create an object called “DOMSelectors” to hold your DOM Selectors
const DOMSelectors = {
  form: document.getElementById('todoForm'),
  title: document.getElementById('todoTitle'),
  description: document.getElementById('todoDescription'),
  image: document.getElementById('todoImage'),
  todoList: document.getElementById('todoList')
};

// Create a function that creates an object and calls the following functions
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent form submission

  const todo = {
    title: DOMSelectors.title.value,
    description: DOMSelectors.description.value,
    image: DOMSelectors.image.files[0] // Get the uploaded file
  };

  if (!todo.title || !todo.description || !todo.image) {
    alert('Please fill out all fields.');
    return;
  }

  injectIntoDOM(todo);
  clearInputFields();
}

// Create a function that injects the newly created object into the DOM
function injectIntoDOM(todo) {
  const todoDiv = document.createElement('div');
  todoDiv.className = 'todo-note';

  // Create a FileReader to convert the image file to a URL
  const reader = new FileReader();
  reader.onload = function(event) {
    const imageUrl = event.target.result;

    todoDiv.innerHTML = `
      <h3>${todo.title}</h3>
      <p>${todo.description}</p>
      <img src="${imageUrl}" alt="Todo Image">
      <button class="remove-btn">Remove</button>
    `;

    todoDiv.querySelector('.remove-btn').addEventListener('click', function() {
      removeTodoObject(todoDiv);
    });

    DOMSelectors.todoList.appendChild(todoDiv);
  };

  reader.readAsDataURL(todo.image);
}

// Create a function that clears the input fields after injecting the object
function clearInputFields() {
  DOMSelectors.title.value = '';
  DOMSelectors.description.value = '';
  DOMSelectors.image.value = '';
}

// Create a function to remove an object after they have been created
function removeTodoObject(todoDiv) {
  DOMSelectors.todoList.removeChild(todoDiv);
}

// Add event listener to the form submit
DOMSelectors.form.addEventListener('submit', handleFormSubmit);
  