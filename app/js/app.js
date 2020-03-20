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
  start: [8, 32],
  connect: true,
  step: 1,
  range: {
    'min': 8,
    'max': 32
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

// initiate copy to clipboard plugin
let clipboard = new ClipboardJS('.button-copy');

clipboard.on('success', function(event) {
  if (event.text == '') {
    document.querySelector('.pass-result').classList.add('error');
    setTimeout(removeError, 3000);
    function removeError() {
      document.querySelector('.pass-result').classList.remove('error');
    }
  } else {
    document.querySelector('.pass-result').classList.add('copied');
    setTimeout(removeCopied, 3000);
    function removeCopied() {
      document.querySelector('.pass-result').classList.remove('copied');
    }
  }
  
  event.clearSelection();
});

// characters array constructor
function Characters(arr, type) {
  this.arr = arr;
  this.type = type;
}
// add characters list of checkboxes
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
// toggle "active" class in checkboxes
Characters.prototype.changeActive = function() {
  if (event.target == document.querySelector(`#${this.type}-all`)) {
    // console.log(event.target);
    document.querySelector(`label[for="${this.type}-all"]`).classList.toggle('active');
    // enable/disable single character elements
    const singleArr = document.querySelectorAll(`.${this.type}-element`);
    singleArr.forEach( (elem) => {
      elem.classList.toggle('active');
    })
  }
}
// return checked checkboxes array for password generator
Characters.prototype.checkedArr = function(lower, upper, number, ascii) {
  const singleArr = document.querySelectorAll(`.${this.type}-element`);
  singleArr.forEach( (elem) => {
    const elemText = elem.querySelector('label').textContent;
    if ( document.querySelector(`#${this.type}-all`).checked == true ) {
      if ( elem.querySelector('input[type="checkbox"]').checked == true ) {
        if (this.type === 'lower') {
          lower.push(elemText);
        }
        if (this.type === 'upper') {
          upper.push(elemText);
        }
        if (this.type === 'number') {
          number.push(elemText);
        }
        if (this.type === 'ascii') {
          ascii.push(elemText);
        }
      }
    }
  })
}

// create characters
const lowercase = new Characters(lowercaseArr, 'lower');
const uppercase = new Characters(uppercaseArr, 'upper');
const number = new Characters(numberArr, 'number');
const ascii = new Characters(asciiArr, 'ascii');
const characters = [lowercase, uppercase, number, ascii];

let checkLower = true;
let checkUpper = true;
let checkNumber = true;
let checkAscii = true;

document.querySelector('#pass-result').value = '';

document.addEventListener('DOMContentLoaded', addCharacters);
document.querySelector('.section-characters').addEventListener('click', labelActive);
document.getElementById('generate').addEventListener('click', generatePass);

// add characters checkboxes
function addCharacters() {
  characters.forEach((arr) => {
    arr.addList();
  })
}

// toggle lowercase/uppercase/number/ASCII checkbox class "active"
function labelActive(event) {
  characters.forEach((arr) => {
    arr.changeActive(event);
  })
}

// main function of generating password
function generatePass() {
  // initiate amount of elements in password (according to password range data)
  const passMin = Number(document.querySelector('.noUi-handle-lower').getAttribute('aria-valuenow'));
  const passMax = Number(document.querySelector('.noUi-handle-upper').getAttribute('aria-valuenow'));
  const symbolsPass = Math.floor(Math.random()*(passMax - passMin + 1)) + passMin;
  // initiate empty arrays for checked characters
  const lowercaseArrChecked = [];
  const uppercaseArrChecked = [];
  const numberArrChecked = [];
  const asciiArrChecked = [];
  
  // create new character arrays from only checked
  characters.forEach((arr) => {
    arr.checkedArr(lowercaseArrChecked, uppercaseArrChecked, numberArrChecked, asciiArrChecked);
  })
  
  // generate password
  const passArr = [];
  const arr = [...lowercaseArrChecked, ...uppercaseArrChecked, ...numberArrChecked, ...asciiArrChecked];
  // console.log(arr);

  for (let i = 1; i <= symbolsPass; i++) {
    const randomItem = arr[Math.floor(Math.random()*arr.length)];
    passArr.push(randomItem);
  }

  // check if there are elements from each array (lowercaseArrChecked, uppercaseArrChecked, numberArrChecked, asciiArrChecked) in generated password
  if (lowercaseArrChecked.length > 0) {
    checkLower = false;
    passArr.forEach( elem => {
      let checkTrue = lowercaseArrChecked.indexOf(elem);
      if (checkTrue > -1) {
        return checkLower = true;
      }
    } )
  }
  if (uppercaseArrChecked.length > 0) {
    checkUpper = false;
    passArr.forEach( elem => {
      let checkTrue = uppercaseArrChecked.indexOf(elem);
      if (checkTrue > -1) {
        return checkUpper = true;
      }
    } )
  }
  if (numberArrChecked.length > 0) {
    checkNumber = false;
    passArr.forEach( elem => {
      let checkTrue = numberArrChecked.indexOf(elem);
      if (checkTrue > -1) {
        return checkNumber = true;
      }
    } )
  }
  if (asciiArrChecked.length > 0) {
    checkAscii = false;
    passArr.forEach( elem => {
      let checkTrue = asciiArrChecked.indexOf(elem);
      if (checkTrue > -1) {
        return checkAscii = true;
      }
    } )
  }

  if ( (checkLower === false) || (checkUpper === false) || (checkNumber === false) || (checkAscii === false) ) {
    generatePass();
  } else {
    let pass = passArr.join('');
      
    document.querySelector('#pass-result').value = pass;
  }

}
