const { default: axios } = require("axios");

const collection = document.querySelector('#toy-collection')
let addToy = false;

const setCard = toy => {
  const card = document.createElement('div')
  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  const p = document.createElement('p')
  const btn = document.createElement('button')

  card.classList.add('card')
  h2.innerText = toy.name
  img.src = toy.image
  img.style.width = '200px'
  p.innerText = `${toy.likes} likes`
  btn.classList.add('like-btn')
  btn.innerText = 'Like'

  card.appendChild(h2)
  card.appendChild(img)
  card.appendChild(p)
  card.appendChild(btn)
  collection.appendChild(card)
}

document.addEventListener("DOMContentLoaded", () => {
<<<<<<< HEAD
  getToys()
=======

  window.addEventListener('load', () => {
    axios.get('http://localhost:3000/toys')
      .then(resp => {
        for (let toy of resp.data) {
          setCard(toy)
        }
      })
  })
>>>>>>> f7ef511aa50d7711b998a3ad029e1d73a21044aa

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector('form.add-toy-form')

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

<<<<<<< HEAD
  form.addEventListener('submit', makeNewToy)
=======
  toyFormContainer.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = document.querySelector('#name')
    const image = document.querySelector('#image')
    axios.post('http://localhost:3000/toys', {
      name: name,
      image: image,
      likes: 0
    })
      .then(resp => console.log(resp))
      .catch(err => console.log(err))
  })
>>>>>>> f7ef511aa50d7711b998a3ad029e1d73a21044aa
});

const getToys = () => {
  axios.get('http://localhost:3000/toys').then(resp => {
    for (let toy of resp.data) createToy(toy)
  })
}

const postToy = (toy) => {
  axios.post('http://localhost:3000/toys', toy).then(resp => createToy(resp.data))
}

const createToy = toy => {
  const collection = document.querySelector('#toy-collection')
  const div = document.createElement('div')
  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  const p = document.createElement('p')
  const btn = document.createElement('button')

  div.classList.add('card')
  h2.innerText = toy.name
  img.src = toy.image
  img.classList.add('toy-avatar')
  p.innerText = `${toy.likes} Likes`
  btn.classList.add('like-btn')
  btn.innerText = "Like <3"

  div.append(h2, img, p, btn)
  collection.appendChild(div)
}

const makeNewToy = (e) => {
  e.preventDefault()
  const toy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  postToy(toy)
  e.target.name.value = ""
  e.target.image.value = ""
}