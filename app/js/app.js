'use strict';
const rangeSlider = document.getElementById('pass-range-slider');
const marginMin = document.getElementById('slider-margin-value-min');
const marginMax = document.getElementById('slider-margin-value-max');

const lowercaseArr = ['a', 'b',  'c',  'd',  'e',  'f',  'g',  'h',  'i',  'j',  'k',  'l',  'm',  'n',  'o',  'p',  'q',  'r',  's',  't',  'u',  'v',  'w',  'x',  'y',  'z'];

const uppercaseArr = ['A', 'B',  'C',  'D',  'E',  'F',  'G',  'H',  'I',  'J',  'K',  'L',  'M',  'N',  'O',  'P',  'Q',  'R',  'S',  'T',  'U',  'V',  'W',  'X',  'Y',  'Z'];

const numberArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const asciiArr = ['!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', '-', ',', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];

// initiate range slider (amount of characters in password)
noUiSlider.create(rangeSlider, {
  start: [8, 24],
  connect: true,
  step: 1,
  range: {
    'min': 8,
    'max': 24
  }
});
// add numbers of min and max amount of password characters
rangeSlider.noUiSlider.on('update', function (values, handle) {
  if (handle) {
    marginMax.innerHTML = Number(values[handle]);
  } else {
    marginMin.innerHTML = Number(values[handle]);
  }
});

// characters array construction
function Characters(arr, type) {
  this.arr = arr;
  this.type = type;
}
Characters.prototype.addList = function() {
  for (let i = 0; i < this.arr.length; i++) {
    let element = document.createElement('span');
    element.classList.add('character-element');
    element.classList.add(`${this.type}-element`);
    element.classList.add('active');
    element.innerHTML = `
      <label for="el${this.arr[i]}">${this.arr[i]}</label>
      <input type="checkbox" name="" id="el${this.arr[i]}" checked>
      <span></span>
    `;
    document.querySelector(`.pass-${this.type}-separate`).appendChild(element);
  }
} 

document.addEventListener('DOMContentLoaded', addCharacters);
document.querySelector('.section-characters').addEventListener('click', labelActive);
document.getElementById('generate').addEventListener('click', generatePass);

// add characters checkboxes
function addCharacters() {
  // add lowercase characters checkboxes
  const lowercase = new Characters(lowercaseArr, 'lower');
  lowercase.addList();
  
  // add uppercase characters checkboxes
  const uppercase = new Characters(uppercaseArr, 'upper');
  uppercase.addList();
  
  // add number characters checkboxes
  const number = new Characters(numberArr, 'number');
  number.addList();

  // add ASCII characters checkboxes
  const ascii = new Characters(asciiArr, 'ascii');
  ascii.addList();
}

// toggle lowercase/uppercase/ASCII checkbox class "active"
function labelActive(event) {
  if (event.target == this.querySelector('#lower-all')) {
    // console.log(event.target);
    this.querySelector('label[for="lower-all"]').classList.toggle('active');
    // enable/disable single lowercase elements
    const singleArr = this.querySelectorAll('.lower-element');
    singleArr.forEach( (elem) => {
      elem.classList.toggle('active');
    })
  }
  if (event.target == this.querySelector('#upper-all')) {
    // console.log(event.target);
    this.querySelector('label[for="upper-all"]').classList.toggle('active');
    // enable/disable single uppercase elements
    const singleArr = this.querySelectorAll('.upper-element');
    singleArr.forEach( (elem) => {
      elem.classList.toggle('active');
    })
  }
  if (event.target == this.querySelector('#number-all')) {
    // console.log(event.target);
    this.querySelector('label[for="number-all"]').classList.toggle('active');
    // enable/disable single number elements
    const singleArr = this.querySelectorAll('.number-element');
    singleArr.forEach( (elem) => {
      elem.classList.toggle('active');
    })
  }
  if (event.target == this.querySelector('#ascii-all')) {
    // console.log(event.target);
    this.querySelector('label[for="ascii-all"]').classList.toggle('active');
    // enable/disable single ascii elements
    const singleArr = this.querySelectorAll('.ascii-element');
    singleArr.forEach( (elem) => {
      elem.classList.toggle('active');
    })
  }
}
let result;
// main function of generating password
function generatePass() {
  // initiate amount of elements in password (according to password range data)
  const passMin = Number(document.querySelector('.noUi-handle-lower').getAttribute('aria-valuenow'));
  const passMax = Number(document.querySelector('.noUi-handle-upper').getAttribute('aria-valuenow'));
  const symbolsPass = Math.floor(Math.random()*(passMax - passMin + 1)) + passMin;
  console.log(symbolsPass);
  
  // generate password
  const passArr = [];
  const arr = [...lowercaseArr, ...uppercaseArr, ...numberArr, ...asciiArr];

  for (let i = 1; i <= symbolsPass; i++) {
    const randomItem = arr[Math.floor(Math.random()*arr.length)];
    passArr.push(randomItem);
  }

  console.log(passArr);
  let pass = passArr.join('');
 
  document.querySelector('.pass-result span').textContent = `${pass} (end)`;
}
