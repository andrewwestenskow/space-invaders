const player = document.getElementById('player')
const game = document.getElementById('game-area')
const enemies = document.getElementsByClassName('enemy')
const enemiesHold = document.getElementById('enemies-hold')
const enemyLoc = []
const pressedKeys = []
let canShoot = true
let moveInterval = 1000
let direction = 'right'
let lastDirection = ''

//GAME SETUP

const createEnemies = () => {
  let left = 5
  let id = 1
  for (let i = 0; i < 11; i++) {
    let row = document.querySelector('.row1')
    let alien = new Image()
    alien.src = './Assets/alien1.png'
    alien.classList.add('enemy')
    alien.style.left = `${left}%`
    alien.id = `enemy-${id}`
    row.append(alien)
    left += 7
    id++
  }

  for (let i = 0; i < enemies.length; i++) {
    enemies[i].innerHTML = `<p style='position: absolute; color: white;'>${enemies[i].offsetLeft}</p>`
    let enemyObj = {
      id: enemies[i].id,
      top: enemies[i].offsetTop,
      left: enemies[i].offsetLeft
    }

    enemyLoc.push(enemyObj)
  }
}
createEnemies()

//ENEMY LOGIC

const handleMove = () => {
  if (moveInterval > 10) {
    setTimeout(() => {
      enemiesMove()
      handleMove()
    }, moveInterval);
  }
}

handleMove()

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
    let currentLeft = getLeft(enemies[i].style.left)
    enemies[i].style.left = `${currentLeft + 5}%`
    if (currentLeft > 85) {
      direction = 'down'
      lastDirection = 'right'
    }
  }
}

const enemiesLeft = () => {
  for (let i = 0; i < enemies.length; i++) {
    let currentLeft = getLeft(enemies[i].style.left)
    enemies[i].style.left = `${currentLeft - 5}%`
    if (currentLeft < 10) {
      console.log('wall')
      direction = 'down'
      lastDirection = 'left'
    }
  }
}

const enemiesDown = () => {
  for (let i = 0; i < enemies.length; i++) {
    let currentTop = getLeft(enemies[i].style.top)
    console.log(currentTop)
    enemies[i].style.top = `${currentTop + 5}%`
  }
  if(lastDirection === 'right'){
    direction = 'left'
  } else if(lastDirection === 'left'){
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
  }, 500);
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
  if (currentLeft !== `97%`) {
    const newLeft = `${(+currentLeft.substr(0, currentLeft.length - 1)) + 1}%`
    player.style.left = newLeft
  }
}

const killEnemy = (enemy, laser) => {
  const findEnemy = document.getElementById(enemy.id)
  const index = enemyLoc.findIndex(element => element.id === enemy.id)
  enemyLoc.splice(index, 1)
  findEnemy.remove()
  laser.remove()
}

const shoot = () => {
  const currentLeft = player.style.left
  let laser = document.createElement('div')
  laser.classList.add('laser')
  laser.style.left = `${getLeft(currentLeft) + 5}%`
  let intervalId = setInterval(() => {
    // laser.innerHTML = `<p style='position: absolute; color: white;'>${laser.offsetLeft}</p>`
    enemyLoc.forEach(element => {
      if (laser.offsetTop - element.top < 5) {
        if (laser.offsetLeft === element.left ||
          (laser.offsetLeft - element.left <= 50 && laser.offsetLeft - element.left >= 0)) {
          killEnemy(element, laser)
        }
      }

    })
  }, 5);
  laser.addEventListener('animationend', (e) => {
    clearInterval(intervalId)
    e.target.remove()
  })
  game.appendChild(laser)
}




document.addEventListener('keydown', handleKeyDown)
document.addEventListener('keyup', handleKeyUp)
