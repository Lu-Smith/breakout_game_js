//test
export function sum(a,b) {
    return a + b;
}

//logic

const grid = document.querySelector('#grid')
const scoreDisplay = document.querySelector("#score")
const startGame = document.querySelector('#start')
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

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockHeight, yAxis]
        this.topLeft = [xAxis, yAxis + blockWidth]
        this.topRight = [xAxis + blockHeight, yAxis + blockWidth]
    }
}

const blocks = [
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
        block.classList.add('block')
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
    ballCurrentPosition[0] +=xDirection
    ballCurrentPosition[1] +=yDirection
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

            if (blocks.length === 0) {
                scoreDisplay.innerHTML = "You Won"
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
            }
        }
    }
    if (ballCurrentPosition[0] >= (boardWidth - 10 - ballDiameter) ||
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
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
        
    }
}


function startPlayingGame() {
    ballCurrentPosition = [270,30]
    xDirection = 2
    yDirection = 2
    score = 0
    scoreDisplay.innerHTML = score
    document.addEventListener('keydown', moveUser)
    timerId = setInterval(moveBall, 30)
   
}

startGame.addEventListener('click', startPlayingGame)

