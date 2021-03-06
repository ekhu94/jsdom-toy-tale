let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getToys()

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

  form.addEventListener('submit', postToy)

});

const getToys = () => {
  axios.get('http://localhost:3000/toys').then(resp => {
    for (let toy of resp.data) createToy(toy)
  })
}

const makeToy = toy => {
  axios.post('http://localhost:3000/toys', toy)
    .then(resp => createToy(resp.data))
}

const updateLikes = toy => {
  toy.likes++
  axios.patch(`http://localhost:3000/toys/${toy.id}`, toy)
    .then(resp => {
      const btn = document.getElementById(toy.id)
      const p = btn.previousElementSibling
      p.innerText = `${toy.likes} Likes`
    })
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
  img.classList.add('toy-avatar')
  img.src = toy.image
  p.innerText = `${toy.likes} Likes`
  btn.classList.add('like-btn')
  btn.innerText = "Like <3"
  btn.id = toy.id

  btn.addEventListener('click', () => updateLikes(toy))

  div.append(h2, img, p, btn)
  collection.appendChild(div)
}

const postToy = e => {
  e.preventDefault()
  const toy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  makeToy(toy)
  e.target.name.value = ""
  e.target.image.value = ""
}