const rangeSlider = document.getElementById('pass-range-slider');
const marginMin = document.getElementById('slider-margin-value-min');
const marginMax = document.getElementById('slider-margin-value-max');

noUiSlider.create(rangeSlider, {
  start: [8, 16],
  connect: true,
  step: 1,
  range: {
    'min': 8,
    'max': 24
  }
});

rangeSlider.noUiSlider.on('update', function (values, handle) {
  if (handle) {
    marginMax.innerHTML = Number(values[handle]);
  } else {
    marginMin.innerHTML = Number(values[handle]);
  }
});

const lowercaseArr = ['a', 'b',  'c',  'd',  'e',  'f',  'g',  'h',  'i',  'j',  'k',  'l',  'm',  'n',  'o',  'p',  'q',  'r',  's',  't',  'u',  'v',  'w',  'x',  'y',  'z'];

const uppercaseArr = ['A', 'B',  'C',  'D',  'E',  'F',  'G',  'H',  'I',  'J',  'K',  'L',  'M',  'N',  'O',  'P',  'Q',  'R',  'S',  'T',  'U',  'V',  'W',  'X',  'Y',  'Z'];

const numberArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const asciiArr = ['!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', '-', ',', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];

document.getElementById('generate').addEventListener('click', generatePass);

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