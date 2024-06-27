class Player {
    constructor(name) {
        this.name = name;
        this.roundScore = 0;
        this.totalScore = 0;
    }

    reset() {
        this.roundScore = 0;
        this.totalScore = 0;
    }
}

const player = new Player('Player');
const computer = new Player('Computer');
let rolls = 0;

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function updateDiceImages(playerDice, die1, die2) {
    document.getElementById(`${playerDice}-die1`).src = `images/dice${die1}.png`;
    document.getElementById(`${playerDice}-die2`).src = `images/dice${die2}.png`;
}

function calculateScore(die1, die2) {
    if (die1 === 1 || die2 === 1) {
        return 0;
    } else if (die1 === die2) {
        return (die1 + die2) * 2;
    } else {
        return die1 + die2;
    }
}

function rollAndDisplayDice() {
    if (rolls < 3) {
        const playerDie1 = rollDice();
        const playerDie2 = rollDice();
        const computerDie1 = rollDice();
        const computerDie2 = rollDice();

        updateDiceImages('player', playerDie1, playerDie2);
        updateDiceImages('computer', computerDie1, computerDie2);

        player.roundScore = calculateScore(playerDie1, playerDie2);
        computer.roundScore = calculateScore(computerDie1, computerDie2);

        player.totalScore += player.roundScore;
        computer.totalScore += computer.roundScore;

        document.getElementById('player-round-score').innerText = player.roundScore;
        document.getElementById('computer-round-score').innerText = computer.roundScore;
        document.getElementById('player-total-score').innerText = player.totalScore;
        document.getElementById('computer-total-score').innerText = computer.totalScore;

        rolls += 1;

        if (rolls === 3) {
            determineWinner();
        }
    }
}

function determineWinner() {
    const winnerText = document.getElementById('winner');
    if (player.totalScore > computer.totalScore) {
        winnerText.innerText = 'Player Wins!';
    } else if (player.totalScore < computer.totalScore) {
        winnerText.innerText = 'Computer Wins!';
    } else {
        winnerText.innerText = 'It\'s a Tie!';
    }
}

function resetGame() {
    player.reset();
    computer.reset();
    rolls = 0;
    document.getElementById('player-round-score').innerText = '0';
    document.getElementById('computer-round-score').innerText = '0';
    document.getElementById('player-total-score').innerText = '0';
    document.getElementById('computer-total-score').innerText = '0';
    document.getElementById('player-die1').src = 'images/dice1.png';
    document.getElementById('player-die2').src = 'images/dice1.png';
    document.getElementById('computer-die1').src = 'images/dice1.png';
    document.getElementById('computer-die2').src = 'images/dice1.png';
    document.getElementById('winner').innerText = '';
}

document.getElementById('roll-button').addEventListener('click', rollAndDisplayDice);
document.getElementById('reset-button').addEventListener('click', resetGame);

window.onload = resetGame;
