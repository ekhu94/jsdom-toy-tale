const toyCollection = document.querySelector('#toy-collection');
const form = document.querySelector('#add-toy-form');
let addToy = false;

const makeToys = toys => {

  for (let toy of toys) {
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

}

window.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(json => makeToys(json))
})

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
