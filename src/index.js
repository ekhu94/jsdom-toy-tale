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

  form.addEventListener('submit', makeNewToy)

});

const getToys = async () => {
  await axios.get('http://localhost:3000/toys')
    .then(resp => {
      for (let toy of resp.data) createToy(toy)
    })
}

const postToy = async toy => {
  await axios.post('http://localhost:3000/toys', toy)
    .then(resp => createToy(resp.data))
}

const updateLikes = async toy => {
  toy.likes++
  await axios.patch(`http://localhost:3000/toys/${toy.id}`, toy)
    .then(resp => {
      const toyDiv = document.getElementById(toy.id)
      toyDiv.querySelector('p').innerText = `${toy.likes} Likes`
    })
}

const deleteToy = async toy => {
  await axios.delete(`http://localhost:3000/toys/${toy.id}`, toy)
    .then(resp => {
      const oldToy = document.getElementById(toy.id)
      oldToy.remove()
    })
}

const createToy = toy => {
  const collection = document.querySelector('#toy-collection')
  const div = document.createElement('div')
  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  const p = document.createElement('p')
  const btn = document.createElement('button')
  const delBtn = document.createElement('button')

  div.classList.add('card')
  h2.innerText = toy.name
  img.classList.add('toy-avatar')
  img.src = toy.image
  p.innerText = `${toy.likes} Likes`
  btn.classList.add('like-btn')
  btn.innerText = 'Like <3'
  delBtn.classList.add('like-btn')
  delBtn.innerText = "Delete :("
  div.id = toy.id

  btn.addEventListener('click', () => updateLikes(toy))
  delBtn.addEventListener('click', () => deleteToy(toy))

  div.append(h2, img, p, btn, delBtn)
  collection.appendChild(div)
}

const makeNewToy = e => {
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