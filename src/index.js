let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getToys()
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

const getToys = () => {
  axios.get('http://localhost:3000/toys').then(resp => {
    for (let toy of resp.data) createToy(toy)
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

  div.append(h2, img, p, btn)
  collection.appendChild(div)
}