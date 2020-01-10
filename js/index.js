const blue = document.getElementById('blue');
const red = document.getElementById('red');
const yellow = document.getElementById('yellow');
const green = document.getElementById('green');
const btnStart = document.getElementById('btnStart');
const LAST_LEVEL = 10;

class Game {
  constructor() {
    this.initialize = this.initialize.bind(this);
    this.initialize();
    this.generateSequence();
    setTimeout(this.nextLevel, 500);
  }

  initialize() {
    this.nextLevel = this.nextLevel.bind(this);
    this.chooseColor = this.chooseColor.bind(this);
    this.toggleBtnStart();
    this.level = 1;
    this.colors = {
      blue,
      red,
      yellow,
      green
    };
  }

  toggleBtnStart() {
    if (btnStart.classList.contains('hide')) {
      btnStart.classList.remove('hide');
    } else {
      btnStart.classList.add('hide');
    }
  }

  generateSequence() {
    this.secuence = new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * 4));
  }

  nextLevel() {
    this.sublevel = 0;
    this.lightSequence();
    this.addEventsClick();
  }

  numberToColor(number) {
    switch (number) {
      case 0:
        return 'blue';
      case 1:
        return 'red';
      case 2:
        return 'yellow';
      case 3:
        return 'green';
    }
  }

  colorToNumber(color) {
    switch (color) {
      case 'blue':
        return 0;
      case 'red':
        return 1;
      case 'yellow':
        return 2;
      case 'green':
        return 3;
    }
  }

  lightSequence() {
    for (let i = 0; i < this.level; i++) {
      const color = this.numberToColor(this.secuence[i]);
      setTimeout(() => this.lightColor(color), 1000 * i);
    }
  }

  lightColor(color) {
    this.colors[color].classList.add('light');
    setTimeout(() => this.offColor(color), 350);
  }

  offColor(color) {
    this.colors[color].classList.remove('light');
  }

  addEventsClick() {
    this.colors.blue.addEventListener('click', this.chooseColor);
    this.colors.green.addEventListener('click', this.chooseColor);
    this.colors.red.addEventListener('click', this.chooseColor);
    this.colors.yellow.addEventListener('click', this.chooseColor);
  }

  deleteEventsClick() {
    this.colors.blue.removeEventListener('click', this.chooseColor);
    this.colors.green.removeEventListener('click', this.chooseColor);
    this.colors.red.removeEventListener('click', this.chooseColor);
    this.colors.yellow.removeEventListener('click', this.chooseColor);
  }

  chooseColor(ev) {
    const nameColor = ev.target.dataset.color;
    const numberColor = this.colorToNumber(nameColor);
    this.lightColor(nameColor);
    if (numberColor === this.secuence[this.sublevel]) {
      this.sublevel++;
      if (this.sublevel === this.level) {
        this.level++;
        this.deleteEventsClick();
        if (this.level === LAST_LEVEL + 1) {
          this.wonTheGame();
        } else {
          setTimeout(this.nextLevel, 1500);
        }
      }
    } else {
      this.lostTheGame();
    }
  }

  wonTheGame() {
    swal('Memory Game', 'Congratulations, you won', 'success').then(this.initialize);
  }

  lostTheGame() {
    swal('Memory Game', 'Game Over', 'error').then(() => {
      this.deleteEventsClick();
      this.initialize();
    });
  }
}

function startGame() {
  window.game = new Game();
}
