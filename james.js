let form = document.querySelector('form');
    console.log(form);
let addToy = false;
const collect = document.getElementById('toy-collection');
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
    addBtn.addEventListener("click", () => {
    // hide & seek with the form
form.addEventListener('submit',formsubmit);
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

let idref = 9;
function formsubmit(e) {
e.preventDefault();
let nametext = document.forms[0].elements[0].value
let imgsrc = document.forms[0].elements[1].value
let toy = {
  id: idref,
  name: nametext,
  img: imgsrc,
  likes: 0,
}
render(toy);
form.reset();
console.log(toy);
posttoy(toy);
idref++
}

function posttoy(toy){
  fetch('http://localhost:3000/toys', {
  method: "POST",
  headers:{
    "Content-Type": "application/json"
  },
  body:JSON.stringify(toy)
})
.then(res => res.json())
.then(data => console.log(data))
}

fetch('http://localhost:3000/toys')
.then(resp => resp.json())
.then(data => data.forEach(render));

function render(toy){
  // console.log(toy);
  let card = document.createElement('div')
  card.classList.add('card')
  let name = document.createElement('h2')
  let img = document.createElement('img')
  img.src = toy.image
  img.classList.add('toy-avatar');
  let likes = document.createElement('p')
  likes.id = toy.id
  likes.textContent = `${toy.likes} Likes`;
  name.textContent =  toy.name;
  let butt = document.createElement('button');
  butt.classList.add('like-btn');
  butt.id = toy.id;
  butt.textContent = 'Like';
  card.append(name,img,likes,butt);
  collect.append(card);
  butt.addEventListener("click", () => {
    let likenum = toy.likes;
    toy.likes ++
    // likes.textContent = `${toy.likes} Likes`
    updatelikes(toy)
    // .then(likes.textContent = toy.likes)
    }
  )
}
function updatelikes(toy){
  console.log(toy.id);
  fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        "likes": toy.likes
      })
    })
    .then(res => res.json())
    .then(data => likes.textContent = toy.likes)

}
// function addlikes(e) {
//   document.getElementById()
//   toy = e.target.parentNode
//   console.log(e.target.parentNode.likes);
//   let likenum = toy.likes;
//   likenum+=1;
//   e.target.parentNode.likes.textContent = `${likenum} Likes`
//   console.log(likenum)
// }
// add click event to increment likes