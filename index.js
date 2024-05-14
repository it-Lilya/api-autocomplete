import './style/style.css';

let timer;
let res;
let main = document.querySelector('.main');
let fragment = document.createElement('ul');

function fetchD(val) {
  res = '';
  fetch(`https://api.github.com/search/repositories?q=${val}`, {
    'Accept': 'application/vnd.github+json'
  })
    .then(res => res.json())
    .then(d => {
      res = d.items;
      return func();
    })
    .catch(err => console.log(err));
}
document.querySelector('.inp').addEventListener('input', (e) => {
  if (e.target.value.trim().length !== 0) {
    clearTimeout(timer);
    res = ''
    timer = setTimeout(fetchD, 600, e.target.value.trim());
  } else {
    if (main.querySelector('ul')) {
      main.querySelector('ul').innerHTML = '';
    }
  }
})


function func() {
  if (main.querySelector('ul')) {
    main.querySelector('ul').innerHTML = '';
  }
  let newArr = res.slice(0, 5);
  newArr.forEach(e => {
    let el = document.createElement('li');
    el.setAttribute('id', e.id);
    el.classList.add('element');
    el.textContent = e.name;
    fragment.appendChild(el);
    el.addEventListener('click', (e) => {
      openRepo(e, newArr);
    })
  })
  document.querySelector('.inp').insertAdjacentElement('afterend', fragment);
}
function closeRepo(e) {
  main.removeChild(e.target.closest('.card'));
  console.log(this)
}

function openRepo(e, arr) {
  let element = arr.findIndex(el => el.id === +e.target.id);
  let name = arr[element].name;
  let owner = arr[element].owner['login'];
  let stars = arr[element]['stargazers_count'];

  let newElement = document.createElement('div');
  newElement.className = 'card';

  let newName = document.createElement('div');
  newName.innerHTML = `Name: ${name}`;
  newElement.appendChild(newName);

  let newOwner = document.createElement('div');
  newOwner.innerHTML = `Owner: ${owner}`;
  newElement.appendChild(newOwner);

  let newStars = document.createElement('div');
  newStars.innerHTML = `Owner: ${stars}`;
  newElement.appendChild(newStars);

  let btn = document.createElement('button');
  btn.className = 'btn-close';

  let span1 = document.createElement('span');
  span1.className = 'sp1';
  btn.appendChild(span1);
    
  newElement.appendChild(btn);

  main.appendChild(newElement);

  document.querySelector('.inp').value = '';
  main.querySelector('ul').innerHTML = '';

  btn.addEventListener('click', closeRepo);
}
