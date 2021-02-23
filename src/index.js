const toyCollection = document.querySelector('#toy-collection');
let addToy = false;

const makeToy = toy => {

  let div = document.createElement('div')
  let h2 = document.createElement('h2')
  let img = document.createElement('img')
  let p = document.createElement('p')
  let btn = document.createElement('button')

  h2.innerText = toy.name
  img.src = toy.image
  img.style.width = "200px";
  p.innerText = `${toy.likes} Likes`
  btn.classList.add('like-btn')
  btn.innerText = 'Like <3'

  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(btn)

  toyCollection.appendChild(div)
  div.classList.add('card')

}

const postToy = toy => {
  fetch('http://localhost:3000/toys', {
    "method": "POST",
    "headers": {
      "Content-Type": 'application/json',
      "Accept": 'application/json'
    },
    "body": JSON.stringify({
      "name": toy.name.value,
      "image": toy.image.value,
      "likes": 0
    })
  })
  .then(resp => resp.json())
  .then(json => {
    toyCollection.appendChild(makeToy(json))
  })
}

window.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(json => {
      for (let obj of json) {
        makeToy(obj)
      }
    })
})

const likeCard = e => {
  e.preventDefault();
  let upVote = parseInt(e.target.previousElementSibling.innerText) + 1;
  return fetch(`http://localhost:3000/toys/${e.target.id}`, {
    "method": "PATCH",
    "headers": {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    "body": JSON.stringify({"likes": upVote})
  })
  .then(resp => resp.json())
  .then(json => {
    e.target.previousElementSibling.innerText = `${upVote} likes`;
  })
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', e => {
        e.preventDefault();
        postToy(e.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
