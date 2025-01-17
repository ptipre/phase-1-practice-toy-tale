let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// Add a toy

let form = document.querySelector('.add-toy-form')
form.addEventListener('submit', e => {
  e.preventDefault();
  let toyName = document.forms[0].elements[0].value;
  let toyUrl = document.forms[0].elements[1].value;

  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: toyName,
      image: toyUrl,
      likes: 0
    })
  }

  fetch('http://localhost:3000/toys', config)
  .then(resp => resp.json())
  .then(data => {
    console.log(`${data.name} was added to the DB successfully`);
    handleToy(data)
  })

  form.reset();
})


// Render toys on DOM load

document.addEventListener('DOMContentLoaded', () => {


  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(data => {
    data.forEach(handleToy);
  })
})







// // Helper functions

function handleToy(toy) {

  // Define variables
  let container = document.getElementById('toy-collection')
  let div = document.createElement('div');
  let header = document.createElement('h2')
  let img = document.createElement('img');
  let p = document.createElement('p');
  let btn = document.createElement('button');

  // Create eventListeners
  btn.addEventListener('click', () => {
    updateLikes(toy);
    console.log("update likes toy", toy);
  })

  // Set element contents
  div.className = 'card'
  header.textContent = toy.name
  img.src = toy.image
  p.textContent = `${toy.likes} Likes`

  // Set attributes
  img.className = 'toy-avatar';
  btn.className = 'like-btn';
  btn.id = toy.id;
  btn.textContent = 'Like'
  p.id = `${toy.name}`

  // Append cards to the container
  div.append(header, img, p, btn);
  container.appendChild(div);

}

function updateLikes(toy) {
  
  toy.likes +=1
  fetch(`http://localhost:3000/toys/${toy.id}`, {

    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'likes': toy.likes
    })
  })
  .then(resp => resp.json())
  .then(data => {
    let p = document.getElementById(`${toy.name}`);
    p.textContent = `${toy.likes} Likes`
  })

}