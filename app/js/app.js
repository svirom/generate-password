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

document.addEventListener('DOMContentLoaded', addASCII);
document.querySelector('.pass-ascii').addEventListener('click', labelActive);
document.getElementById('generate').addEventListener('click', generatePass);

// add ASCII characters checkboxes
function addASCII() {
  for (let i = 0; i < asciiArr.length; i++) {
    let elASCII = document.createElement('span');
    elASCII.classList.add('ascii-element');
    elASCII.innerHTML = `
      <label for="el${asciiArr[i]}">${asciiArr[i]}</label>
      <input type="checkbox" name="" id="el${asciiArr[i]}" checked>
      <span></span>
    `;
    document.querySelector('.pass-ascii-separate').appendChild(elASCII);
  }
}

// toggle ASCII checkbox class "active"
function labelActive(event) {
  if (event.target == this.querySelector('#ascii-all')) {
    // console.log(event.target);
    this.querySelector('.ascii-all-label').classList.toggle('active');
    // enable/disable single ascii elements
    const singleArr = this.querySelectorAll('.ascii-element');
    singleArr.forEach( (elem) => {
      elem.classList.toggle('active');
    })
  }
}

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

  document.querySelector('.pass-result span').innerHTML = `${pass} (${symbolsPass} symbols)`;

}