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
const enemyLoc = []
const pressedKeys = []
let canShoot = true
let moveInterval = 1250
let direction = 'right'
let lastDirection = ''


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

  for(let i = 0; i < 6; i++){
    let selected = document.getElementsByClassName(i)
    for(let j = 0; j < selected.length; j++){
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

  console.log(watch)
}


//ENEMY LOGIC

const handleMove = () => {
  if (moveInterval > 10) {
    setTimeout(() => {
      enemiesMove()
      handleMove()
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
    if(index !== -1){
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
    if(index !== -1){
      watch[index].left = enemies[i].offsetLeft
    }
  }
}

const enemiesDown = () => {
  for (let i = 0; i < enemies.length; i++) {
    let newTop = (getLeft(enemies[i].style.top)) + 5
    if (newTop === 80) {
      return
    }
    enemies[i].style.top = `${newTop}%`
    enemyLoc[i].top = enemies[i].offsetTop
    let index = watch.findIndex(element => element.id === enemies[i].id)
    if(index !== -1){
      watch[index].top = enemies[i].offsetTop
    }
  }
  if (lastDirection === 'right') {
    direction = 'left'
  } else if (lastDirection === 'left') {
    direction = 'right'
  }
}

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
  enemyLoc.splice(index, 1)
  console.log(enemy)
  //EXPLOSION
  const boom = new Image()
  boom.src = './Assets/boom.png'
  boom.classList.add('boom')
  boom.style.top = `${enemy.top}px`
  boom.style.left = laser.style.left
  game.append(boom)
  findEnemy.remove()
  laser.remove()
  setTimeout(() => {
    boom.remove()
  }, 350);
  moveInterval -= 20
  console.log(row1)
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

const startGame = (e) => {
  if(e.keyCode === 13){
    createEnemies()
    handleMove()
    const welcome = document.querySelector('.welcome-screen')
    welcome.remove()
    document.removeEventListener('keydown', startGame)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
  }

}

document.addEventListener('keydown', startGame)

