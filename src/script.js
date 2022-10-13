//test
export function sum(a,b) {
    return a + b;
}

const grid = document.querySelector('#grid')
const scoreDisplay = document.querySelector("#score")
const startGame = document.querySelector('#start')
const frame = document.querySelector('.game')
const blockWidth = 80
const blockHeight = 20
const boardWidth = 570
const boardHeight = 300
const ballDiameter = 20
const userStart = [230, 10]
let currentPosition = userStart
const ballStart = [270,30]
let ballCurrentPosition = ballStart
let timerId
let xDirection = 2
let yDirection = 2
let score = 0
let reset = false

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockHeight, yAxis]
        this.topLeft = [xAxis, yAxis + blockWidth]
        this.topRight = [xAxis + blockHeight, yAxis + blockWidth]
    }
}

let blocks = [
    new Block(15,270),
    new Block(105,270),
    new Block(195,270),
    new Block(285,270),
    new Block(375,270),
    new Block(465,270),
    new Block(15,240),
    new Block(105,240),
    new Block(195,240),
    new Block(285,240),
    new Block(375,240),
    new Block(465,240),
    new Block(15,210),
    new Block(105,210),
    new Block(195,210),
    new Block(285,210),
    new Block(375,210),
    new Block(465,210),
    new Block(15,180),
    new Block(105,180),
    new Block(195,180),
    new Block(285,180),
    new Block(375,180),
    new Block(465,180),
]

function addBlocks() {
        for (let i = 0; i < blocks.length; i++) {
            const block = document.createElement('div')
            block.style.left = blocks[i].bottomLeft[0] + 'px'
            block.style.bottom = blocks[i].bottomLeft[1] + 'px'
            if (i < 6) {
                block.classList.add('block', 'orange')
            } else if (i >= 6 && i < 12) {
                block.classList.add('block', 'yellow')
            } else if (i >= 18) {
                block.classList.add('block')
            } else {
                block.classList.add('block', 'lightyellow')
            }
            grid.appendChild(block)
        }
}
addBlocks()

const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
    
}

function moveUser(e) {
    switch(e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10
                drawUser()
            }
            break;
        case 'ArrowRight':
                if (currentPosition[0] < boardWidth - blockWidth - 30) {
                    currentPosition[0] += 10
                    drawUser()
                }
                break;
    }
}

const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions() 
}

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }
}

function checkForCollisions() {      
    for (let i = 0; i < blocks.length; i++) {
        if (
                (ballCurrentPosition[0] > (blocks[i].bottomLeft[0] - ballDiameter) &&
                 ballCurrentPosition[0] < (blocks[i].bottomRight[0] + blockWidth)) &&
                 ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] &&
                  (ballCurrentPosition[1] + ballDiameter) < blocks[i].topLeft[1])
            ) {
                const allBlocks = Array.from(document.querySelectorAll('.block'))
                allBlocks[i].classList.remove('block')
                blocks.splice(i, 1)
                changeDirection()
                score++
                scoreDisplay.innerHTML = score
                if (blocks.length === 18) {
                    frame.classList.add('lightyellow')
                } else if (blocks.length === 12 ) {
                    frame.classList.add('yellow')
                } else if (blocks.length === 6 ){
                    frame.classList.add('orange')
                }

                if (blocks.length === 0) {
                    scoreDisplay.innerHTML = "You Won"
                    clearInterval(timerId)
                    document.removeEventListener('keydown', moveUser)
                    reset = true
                    frame.classList.add('rainbow')
                }
        }   
    }
    
    if (ballCurrentPosition[0] >= (boardWidth - 10 - ballDiameter) ||
        ballCurrentPosition[1] >= (boardHeight - 5 - ballDiameter) ||
        ballCurrentPosition[0] <= 0
        ) {
        changeDirection()
    }
    if ((ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) && 
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
    ) {
        changeDirection()
    }

    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'Game Over'
        document.removeEventListener('keydown', moveUser)
        reset = true  
    }
}

function startPlayingGame() {
    if (reset === true) {
        window.location.reload();
    } else {
    timerId = setInterval(moveBall, 30)
    document.addEventListener('keydown', moveUser)
    }
    
}

startGame.addEventListener('click', startPlayingGame)


startGame.addEventListener('mouseover', (e) => {
    let x = e.clientX - e.target.offsetLeft
    let y = e.clientY - e.target.offsetTop
    let ripples = document.createElement('span')
    ripples.style.left = x + 'px'
    ripples.style.top = y + 'px'
    start.appendChild(ripples)

    setTimeout(() => {
        ripples.remove()
    }, 3000)
} )