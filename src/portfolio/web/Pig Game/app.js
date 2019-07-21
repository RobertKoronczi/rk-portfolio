/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, diceI, diceDOM, winScore, doubleDice, rolls1, rolls2, timer;

dice1DOM = document.querySelector('.dice');
dice2DOM = document.querySelector('.dice2');

activePlayer = 0;

document.querySelector('.btn-new').addEventListener('click', newGame);
document.getElementById('win-sc').addEventListener('change', function() { winScore = this.value; });

// Double Dice DOM
var dd = document.querySelector('input[id="dd"]');
dd.checked = false;
dd.addEventListener('change', ddHandler);

newGame();


function afterRoll(fun) {
	setTimeout(fun, timer*10);
}

function roll(index, iterableArray, callback) {
    if (index >= iterableArray.length) {
        return;
    }

    dice1DOM.src = 'dice-' + rolls1[index] + '.png';
    dice2DOM.src = 'dice-' + rolls2[index] + '.png';
    index += 1;
    setTimeout(roll.bind({}, index, iterableArray), timer);

    return callback();
}

function zeroRoundScore() {
	roundScore = 0;
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
}

function newGame() {

	// Set the default style, and -player names.
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
	document.getElementById('name-' + activePlayer).textContent = 'PLAYER ' + Number(activePlayer+1);

	// Set the default values
	scores = [0,0];
	activePlayer = 0;
	dice = [0,0];
	diceI = 0;
	doubleDice = dd.checked;
	winScore = document.getElementById('win-sc').value;
	timer = 250;

	// Hide the dices
	dice1DOM.style.display = 'none';
	dice2DOM.style.display = 'none';

	// Add the EventListeners
	document.querySelector('.btn-roll').addEventListener('click', btnRollHandler);
	document.querySelector('.btn-hold').addEventListener('click', btnHoldHandler);

	// zero the scores on the DOM
	zeroRoundScore();
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
}

//================//
// Event Handlers //
//================//

function ddHandler() {
	zeroRoundScore();
	doubleDice = !doubleDice;
	dice1DOM.classList.toggle('dice1');
	dice1DOM.classList.toggle('dice');
	dice1DOM.style.display = 'none';
	dice2DOM.style.display = 'none';
};

// Roll button clicked
function btnRollHandler() {
	
	rolls1 = [];
	rolls2 = [];
	for(let i = 0; i < 7; i++) {
		rolls1.push(Math.floor( Math.random() * 6 ) + 1);
		rolls2.push(Math.floor( Math.random() * 6 ) + 1);
	}

	// Single dice game
	// Here represents the 2 value of the dice Array 2 throws
	if(doubleDice === false) {

		diceI === 0 ? diceI = 1 : diceI = 0;

		// 1. Random number
		dice[diceI] = Math.floor( Math.random() * 6 ) + 1;
		rolls1.push(dice[diceI]);

		// 2. Display the result
		dice1DOM.style.display = 'block';
		
		roll(0, rolls1, function() {});
			
		// 3. Handle the result

		if(dice[0] === dice[1] && dice[0] == 6) {
			scores[activePlayer] = 0;
			afterRoll(function() {
					document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
					switchPlayers();
			});
		} else if(dice[diceI] !== 1) {
			roundScore += dice[diceI];
			afterRoll(function() {
					document.getElementById('current-' + activePlayer).textContent = roundScore;
			});		
		} else {
			afterRoll(function() {
					switchPlayers();
			});
		}

	// Double dice game	
	} else {

		// Generate the random Numbers
		for( let i = 0; i<2; i++ ) dice[i] = Math.floor( Math.random() * 6 ) + 1; 
		
		// Display the dices
		dice1DOM.style.display = 'block';
		dice2DOM.style.display = 'block';

		rolls1.push(dice[0]);
		rolls2.push(dice[1]);

		roll(0, rolls1, function() {});
		// Handle the result
		if(dice[0] !== 1 && dice[1] !== 1) {
			roundScore += Number(dice[0]+dice[1]);
			afterRoll(function() {
					document.getElementById('current-' + activePlayer).textContent = roundScore;
			});	
		} else {
			afterRoll(function() {switchPlayers();});	
		}
	}	
};

// Hold button clicked
function btnHoldHandler() {

	// Add the round scores to the player scores
	scores[activePlayer] += Number(document.getElementById('current-' + activePlayer).textContent);
	document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

	// Win situation
	if(scores[activePlayer] >= winScore) {
		document.querySelector('.btn-roll').removeEventListener('click', btnRollHandler);
		this.removeEventListener('click', btnHoldHandler);

		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
		document.getElementById('name-' + activePlayer).textContent = 'Winner!'
	} else {
		switchPlayers();
	}
	
};

function switchPlayers() {
	
	// set to zero, so that we compare them semparate for the players
	dice[0] = 0;
	dice[1] = 0;

	document.getElementById('current-' + activePlayer).textContent = 0;
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	dice1DOM.style.display = 'none';
	dice2DOM.style.display = 'none';
}

