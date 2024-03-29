'use strict';

var rangeSlider = document.getElementById('pass-range-slider');
var marginMin = document.getElementById('slider-margin-value-min');
var marginMax = document.getElementById('slider-margin-value-max');
var lowercaseArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var uppercaseArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var numberArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
var asciiArr = ['!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', '-', ',', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];

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
var clipboard = new ClipboardJS('.button-copy');
clipboard.on('success', function (event) {
  if (event.text == '') {
    var removeError = function removeError() {
      document.querySelector('.pass-result').classList.remove('error');
    };
    document.querySelector('.pass-result').classList.add('error');
    setTimeout(removeError, 3000);
  } else {
    var removeCopied = function removeCopied() {
      document.querySelector('.pass-result').classList.remove('copied');
    };
    document.querySelector('.pass-result').classList.add('copied');
    setTimeout(removeCopied, 3000);
  }
  event.clearSelection();
});

// characters array constructor
function Characters(arr, type) {
  this.arr = arr;
  this.type = type;
}
// add characters list of checkboxes
Characters.prototype.addList = function () {
  for (var i = 0; i < this.arr.length; i++) {
    var element = document.createElement('span');
    element.classList.add('character-element');
    element.classList.add("".concat(this.type, "-element"));
    element.classList.add('active');
    element.innerHTML = "\n      <label for=\"el".concat(this.arr[i], "\">").concat(this.arr[i], "</label>\n      <input type=\"checkbox\" name=\"\" id=\"el").concat(this.arr[i], "\" checked>\n      <span></span>\n    ");
    document.querySelector(".pass-".concat(this.type, "-separate")).appendChild(element);
  }
};
// toggle "active" class in checkboxes
Characters.prototype.changeActive = function () {
  if (event.target == document.querySelector("#".concat(this.type, "-all"))) {
    // console.log(event.target);
    document.querySelector("label[for=\"".concat(this.type, "-all\"]")).classList.toggle('active');
    // enable/disable single character elements
    var singleArr = document.querySelectorAll(".".concat(this.type, "-element"));
    singleArr.forEach(function (elem) {
      elem.classList.toggle('active');
    });
  }
};
// return checked checkboxes array for password generator
Characters.prototype.checkedArr = function (lower, upper, number, ascii) {
  var _this = this;
  var singleArr = document.querySelectorAll(".".concat(this.type, "-element"));
  singleArr.forEach(function (elem) {
    var elemText = elem.querySelector('label').textContent;
    if (document.querySelector("#".concat(_this.type, "-all")).checked == true) {
      if (elem.querySelector('input[type="checkbox"]').checked == true) {
        if (_this.type === 'lower') {
          lower.push(elemText);
        }
        if (_this.type === 'upper') {
          upper.push(elemText);
        }
        if (_this.type === 'number') {
          number.push(elemText);
        }
        if (_this.type === 'ascii') {
          ascii.push(elemText);
        }
      }
    }
  });
};

// create characters
var lowercase = new Characters(lowercaseArr, 'lower');
var uppercase = new Characters(uppercaseArr, 'upper');
var number = new Characters(numberArr, 'number');
var ascii = new Characters(asciiArr, 'ascii');
var characters = [lowercase, uppercase, number, ascii];
var checkLower = true;
var checkUpper = true;
var checkNumber = true;
var checkAscii = true;
document.querySelector('#pass-result').value = '';
document.addEventListener('DOMContentLoaded', addCharacters);
document.querySelector('.section-characters').addEventListener('click', labelActive);
document.getElementById('generate').addEventListener('click', generatePass);

// add characters checkboxes
function addCharacters() {
  characters.forEach(function (arr) {
    arr.addList();
  });
}

// toggle lowercase/uppercase/number/ASCII checkbox class "active"
function labelActive(event) {
  characters.forEach(function (arr) {
    arr.changeActive(event);
  });
}

// main function of generating password
function generatePass() {
  // initiate amount of elements in password (according to password range data)
  var passMin = Number(document.querySelector('.noUi-handle-lower').getAttribute('aria-valuenow'));
  var passMax = Number(document.querySelector('.noUi-handle-upper').getAttribute('aria-valuenow'));
  var symbolsPass = Math.floor(Math.random() * (passMax - passMin + 1)) + passMin;
  // initiate empty arrays for checked characters
  var lowercaseArrChecked = [];
  var uppercaseArrChecked = [];
  var numberArrChecked = [];
  var asciiArrChecked = [];

  // create new character arrays from only checked
  characters.forEach(function (arr) {
    arr.checkedArr(lowercaseArrChecked, uppercaseArrChecked, numberArrChecked, asciiArrChecked);
  });

  // generate password
  var passArr = [];
  var arr = [].concat(lowercaseArrChecked, uppercaseArrChecked, numberArrChecked, asciiArrChecked);
  // console.log(arr);

  for (var i = 1; i <= symbolsPass; i++) {
    var randomItem = arr[Math.floor(Math.random() * arr.length)];
    passArr.push(randomItem);
  }

  // check if there are elements from each array (lowercaseArrChecked, uppercaseArrChecked, numberArrChecked, asciiArrChecked) in generated password
  if (lowercaseArrChecked.length > 0) {
    checkLower = false;
    passArr.forEach(function (elem) {
      var checkTrue = lowercaseArrChecked.indexOf(elem);
      if (checkTrue > -1) {
        return checkLower = true;
      }
    });
  }
  if (uppercaseArrChecked.length > 0) {
    checkUpper = false;
    passArr.forEach(function (elem) {
      var checkTrue = uppercaseArrChecked.indexOf(elem);
      if (checkTrue > -1) {
        return checkUpper = true;
      }
    });
  }
  if (numberArrChecked.length > 0) {
    checkNumber = false;
    passArr.forEach(function (elem) {
      var checkTrue = numberArrChecked.indexOf(elem);
      if (checkTrue > -1) {
        return checkNumber = true;
      }
    });
  }
  if (asciiArrChecked.length > 0) {
    checkAscii = false;
    passArr.forEach(function (elem) {
      var checkTrue = asciiArrChecked.indexOf(elem);
      if (checkTrue > -1) {
        return checkAscii = true;
      }
    });
  }
  if (checkLower === false || checkUpper === false || checkNumber === false || checkAscii === false) {
    generatePass();
  } else {
    var pass = passArr.join('');
    document.querySelector('#pass-result').value = pass;
  }
}