const player = document.getElementById('player')
const game = document.getElementById('game-area')
const enemies = document.getElementsByClassName('enemy')
const enemiesHold = document.getElementById('enemies-hold')
var row1 = []
var row2 = []
var row3 = []
var row4 = []
var row5 = []
let watch = []
let enemyLoc = []
let pressedKeys = []
let canShoot = true
let moveInterval = 1000
let direction = 'right'
let lastDirection = ''
let gameEnd = false
let enemyLaserAnimation = null


//GAME SETUP

const createEnemies = () => {
  let left = 5
  let id = 1
  // for (let i = 0; i < 11; i++) {
  //   let row = document.querySelector('.row5')
  //   let alien = new Image()
  //   alien.src = './Assets/alien1.png'
  //   alien.classList.add('enemy', '5')
  //   alien.style.left = `${left}%`
  //   alien.style.top = `10%`
  //   alien.id = `enemy-${id}`
  //   row.append(alien)
  //   left += 7
  //   id++
  // }

  left = 5

  for (let i = 0; i < 11; i++) {
    let row = document.querySelector('.row4')
    let alien = new Image()
    alien.src = './Assets/alien3.png'
    alien.classList.add('enemy', '4')
    alien.style.left = `${left}%`
    alien.style.top = `15%`
    alien.id = `enemy-${id}`
    row.append(alien)
    left += 7
    id++
  }

  left = 5

  for (let i = 0; i < 11; i++) {
    let row = document.querySelector('.row3')
    let alien = new Image()
    alien.src = './Assets/alien1.png'
    alien.classList.add('enemy', '3')
    alien.style.left = `${left}%`
    alien.style.top = `20%`
    alien.id = `enemy-${id}`
    row.append(alien)
    left += 7
    id++
  }

  left = 5

  for (let i = 0; i < 11; i++) {
    let row = document.querySelector('.row2')
    let alien = new Image()
    alien.src = './Assets/alien3.png'
    alien.classList.add('enemy', '2')
    alien.style.left = `${left}%`
    alien.style.top = `25%`
    alien.id = `enemy-${id}`
    row.append(alien)
    left += 7
    id++
  }

  left = 5

  for (let i = 0; i < 11; i++) {
    let row = document.querySelector('.row1')
    let alien = new Image()
    alien.src = './Assets/alien1.png'
    alien.classList.add('enemy', '1')
    alien.style.left = `${left}%`
    alien.style.top = `30%`
    alien.id = `enemy-${id}`
    row.append(alien)
    left += 7
    id++
  }

  for (let i = 0; i < enemies.length; i++) {
    // enemies[i].innerHTML = `<p style='position: absolute; color: white;'>${enemies[i].offsetLeft}</p>`
    let enemyObj = {
      id: enemies[i].id,
      top: enemies[i].offsetTop,
      left: enemies[i].offsetLeft
    }
    enemyLoc.push(enemyObj)
  }

  for (let i = 0; i < 6; i++) {
    let selected = document.getElementsByClassName(i)
    for (let j = 0; j < selected.length; j++) {
      let obj = {
        row: i,
        id: selected[j].id,
        top: selected[j].offsetTop,
        left: selected[j].offsetLeft
      }
      window[`row${i}`].push(obj)
    }
  }
  watch = row1
}


//ENEMY LOGIC

const handleMove = () => {
  if (moveInterval > 10 && !gameEnd) {
    setTimeout(() => {
      enemiesMove()
      handleMove()
      let enemyShootIndex = Math.floor(Math.random() * 11)
      enemyShoot(enemyShootIndex)
    }, moveInterval);
  }
}

const enemiesMove = () => {
  switch (direction) {
    case 'right':
      enemiesRight()
      break;
    case 'down':
      enemiesDown()
      break
    case 'left':
      enemiesLeft()
    default:
      return
  }
}

const enemiesRight = () => {
  for (let i = 0; i < enemies.length; i++) {
    let newLeft = (getLeft(enemies[i].style.left)) + 5
    enemies[i].style.left = `${newLeft}%`
    enemyLoc[i].left = enemies[i].offsetLeft
    let index = watch.findIndex(element => element.id === enemies[i].id)
    if (index !== -1) {
      watch[index].left = enemies[i].offsetLeft
    }
    if (newLeft > 90) {
      direction = 'down'
      lastDirection = 'right'
    }
  }
}

const enemiesLeft = () => {
  for (let i = 0; i < enemies.length; i++) {
    let newLeft = (getLeft(enemies[i].style.left)) - 5
    enemies[i].style.left = `${newLeft}%`
    enemyLoc[i].left = enemies[i].offsetLeft
    if (newLeft < 5) {
      direction = 'down'
      lastDirection = 'left'
    }
    let index = watch.findIndex(element => element.id === enemies[i].id)
    if (index !== -1) {
      watch[index].left = enemies[i].offsetLeft
    }
  }
}

const enemiesDown = () => {
  for (let i = 0; i < enemies.length; i++) {
    let newTop = (getLeft(enemies[i].style.top)) + 5
    if (newTop === 80) {
      lose()
      return
    }
    enemies[i].style.top = `${newTop}%`
    enemyLoc[i].top = enemies[i].offsetTop
    let index = watch.findIndex(element => element.id === enemies[i].id)
    if (index !== -1) {
      watch[index].top = enemies[i].offsetTop
    }
  }
  if (lastDirection === 'right') {
    direction = 'left'
  } else if (lastDirection === 'left') {
    direction = 'right'
  }
}

const enemyShoot = (index) => {
  const enemyElement = document.getElementById(watch[index].id)
  // console.log(window[`row${watch[index].row}`])
  let enemyLaser = document.createElement('div')
  enemyLaser.classList.add('enemy-laser')
  enemyLaser.style.left = enemyElement.style.left
  enemyLaser.style.top = enemyElement.style.top
  addAnimation(`
  @keyframes enemyShoot{
    0%{
      top: ${getLeft(enemyLaser.style.top) + 5}%
    }
    100%{
      top: 100%
    }
  }
  `)
  enemyLaser.style.animation = `enemyShoot 1500ms linear`
  let intervalId = setInterval(() => {
    if (enemyLaser.offsetTop - player.offsetTop <= 15 && enemyLaser.offsetTop - player.offsetTop > 0) {
        if (enemyLaser.offsetLeft === player.offsetLeft ||
          (enemyLaser.offsetLeft - player.offsetLeft <= 100 && enemyLaser.offsetLeft - player.offsetLeft >= 0)) {
          clearInterval(intervalId)
          console.log('hit')
          enemyLaser.remove()
        }
      }
  }, 1);
  enemyLaser.addEventListener('animationend', (e) => {
    clearInterval(intervalId)
    e.target.remove()})
  const row = document.querySelector(`.row${watch[index].row}`)
  row.append(enemyLaser)
}

// 528 vs 451


//FUNCTIONALITY

const getLeft = (str) => {
  return +str.substr(0, str.length - 1)
}

const disableShot = () => {
  canShoot = false
  setTimeout(() => {
    canShoot = true
  }, 250);
}

const addAnimation = (animation) => {
  enemyLaserAnimation = document.createElement('style')
  enemyLaserAnimation.type = 'text/css'
  document.head.appendChild(enemyLaserAnimation)
  enemyLaserAnimation.sheet.insertRule(animation, enemyLaserAnimation.length)
}


//MECHANICS

const handleKeyDown = (e) => {
  switch (e.keyCode) {
    case 37:
      let index = pressedKeys.indexOf(37)
      if (index === -1) {
        pressedKeys.push(37)
      }
      break;
    case 39:
      let index1 = pressedKeys.indexOf(39)
      if (index1 === -1) {
        pressedKeys.push(39)
      }
      break
    case 32:
      let index2 = pressedKeys.indexOf(32)
      if (index2 === -1) {
        pressedKeys.push(32)
        if (canShoot) {
          shoot()
          disableShot()
        }
      }
      break
  }

  let leftIndex = pressedKeys.indexOf(37)
  let rightIndex = pressedKeys.indexOf(39)
  let spaceIndex = pressedKeys.indexOf(32)

  if (leftIndex !== -1) {
    moveLeft()
  }

  if (rightIndex !== -1) {
    moveRight()
  }
}

handleKeyUp = (e) => {
  switch (e.keyCode) {
    case 37:
      let index = pressedKeys.indexOf(37)
      if (index !== -1) {
        pressedKeys.splice(index, 1)
      }
      break;
    case 39:
      let index1 = pressedKeys.indexOf(39)
      if (index1 !== -1) {
        pressedKeys.splice(index1, 1)
      }
      break;
    case 32:
      let index2 = pressedKeys.indexOf(32)
      if (index2 !== -1) {
        pressedKeys.splice(index2, 1)
      }
      break
  }
}

const moveLeft = () => {
  const currentLeft = player.style.left
  if (currentLeft !== `0%`) {
    const newLeft = `${(+currentLeft.substr(0, currentLeft.length - 1)) - 1}%`
    player.style.left = newLeft
  }
}

const moveRight = () => {
  const currentLeft = player.style.left
  if (currentLeft !== `90%`) {
    const newLeft = `${(+currentLeft.substr(0, currentLeft.length - 1)) + 1}%`
    player.style.left = newLeft
  }
}

const killEnemy = (enemy, laser, intervalId, locIndex) => {
  // console.log(`top laser: ${laser.offsetTop}  Box: ${enemy.top}`)
  // console.log(`left laser: ${laser.offsetLeft} Box: ${enemy.left}`)
  const findEnemy = document.getElementById(enemy.id)
  const index = enemyLoc.findIndex(element => element.id === enemy.id)

  clearInterval(intervalId)
  //Data manipulation
  enemyLoc.splice(index, 1)
  const replacement = window[`row${enemy.row + 1}`][locIndex]
  if (replacement) {
    const replacementEl = document.getElementById(replacement.id)
    replacement.left = replacementEl.offsetLeft
    replacement.top = replacementEl.offsetTop
    watch.splice(locIndex, 1, replacement)
  } else {
    watch.splice(locIndex, 1, { id: null, top: 99999999, left: 999999999 })
  }
  //EXPLOSION
  const boom = new Image()
  boom.src = './Assets/boom.png'
  boom.classList.add('boom')
  boom.style.top = `${enemy.top}px`
  boom.style.left = laser.style.left
  //DOM Manipulation
  game.append(boom)
  findEnemy.remove()
  laser.remove()
  setTimeout(() => {
    boom.remove()
  }, 350);
  moveInterval -= 20
  if (enemies.length === 0) {
    win()
  }
}

const shoot = () => {
  const currentLeft = player.style.left
  let laser = document.createElement('div')
  laser.classList.add('laser')
  laser.style.left = `${getLeft(currentLeft) + 5}%`
  let intervalId = setInterval(() => {
    // laser.innerHTML = `<p style='position: absolute; color: white;'>${laser.offsetLeft}</p>`
    watch.forEach((element, index) => {
      // console.log(`${index}: ${element.left}`)

      if (laser.offsetTop - element.top <= 15 && laser.offsetTop - element.top > 0) {
        if (laser.offsetLeft === element.left ||
          (laser.offsetLeft - element.left <= 50 && laser.offsetLeft - element.left >= -25)) {
          killEnemy(element, laser, intervalId, index)
        }
      }
    })
  }, 1);
  laser.addEventListener('animationend', (e) => {
    clearInterval(intervalId)
    e.target.remove()
  })
  game.appendChild(laser)
}

//Game start & end

const startGame = (e) => {
  if (e.keyCode === 13) {
    row1 = []
    row2 = []
    row3 = []
    row4 = []
    row5 = []
    watch = []
    enemyLoc = []
    pressedKeys = []
    canShoot = true
    moveInterval = 1000
    direction = 'right'
    lastDirection = ''
    gameEnd = false
    createEnemies()
    handleMove()
    const welcome = document.querySelector('.welcome-screen')
    const lose = document.querySelector('.lose-screen')
    const win = document.querySelector('.win-screen')
    if (welcome) {
      welcome.style.display = 'none'
    }

    if (lose) {
      lose.style.display = 'none'
    }

    if (win) {
      win.style.display = 'none'
    }
    document.removeEventListener('keydown', startGame)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
  }

}

const lose = () => {
  gameEnd = true
  document.querySelectorAll('.enemy').forEach(element => element.remove())
  document.addEventListener('keydown', startGame)
  document.removeEventListener('keydown', handleKeyDown)
  document.removeEventListener('keyup', handleKeyUp)
  const loseScreen = document.querySelector('.lose-screen')
  loseScreen.style.display = 'block'
}

const win = () => {
  gameEnd = true
  document.addEventListener('keydown', startGame)
  document.removeEventListener('keydown', handleKeyDown)
  document.removeEventListener('keyup', handleKeyUp)
  const winScreen = document.querySelector('.win-screen')
  winScreen.style.display = 'block'
}


document.addEventListener('keydown', startGame)