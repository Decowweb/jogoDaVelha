// colocar circulo e x nas celulas

const cellElements = document.querySelectorAll('[symbols]')
const result = document.getElementById("winning-message")
const text = document.getElementById("winning-message-text")
const restart = document.getElementById('winning-message-button')
const round = document.getElementById('change')
const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

let isCircleTurn;

const clean = () => {
    result.style.display = "none"
    isCircleTurn = false

    startGame()
}

const startGame = () => {
    cellElements.forEach(cell => {
        cell.classList.remove('O');
        cell.classList.remove('X');
        changeRound()
        cell.addEventListener("click", handleClick, {
            once: true
        })
    });
}

const changeRound = () => {
    
    if(isCircleTurn) {
      round.classList.remove('roundX')
      round.innerHTML = "ROUND: O"
      round.classList.add('roundO')
    } else if(!isCircleTurn) {
        round.classList.remove('roundO')
        round.innerHTML= 'ROUND: X'
        round.classList.add('roundX')
    }

}


const handleClick = (e) => {
    const celula = e.target
    const classToAdd = isCircleTurn ? 'O' : 'X'
    celula.classList.add(classToAdd)
    isCircleTurn = !isCircleTurn
    changeRound()
    const isWin = checkForWin(classToAdd)
    const isDraw = checkForDraw();

    if (isWin) {
        text.innerHTML = classToAdd + ' Venceu!'
        result.style.display = "flex"
    } else if (isDraw == true) {
        text.innerHTML = 'EMPATE!'
        result.style.display = "flex"
    }
}


const checkForDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains('X') || cell.classList.contains('O')
    })
}

const checkForWin = (classToAdd) => {
    return win.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(classToAdd)
        })
    })
}


restart.addEventListener("click", clean)
startGame()