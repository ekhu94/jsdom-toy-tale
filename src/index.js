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

  window.addEventListener('load', () => {
    axios.get('http://localhost:3000/toys')
      .then(resp => {
        for (let toy of resp.data) {
          setCard(toy)
        }
      })
  })

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
});
