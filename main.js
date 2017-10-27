//MAIN TERMINAL FOR HANGMAN
var Word = require('./word.js');
var prompt = require('prompt');

console.log("Hangman!");
console.log("Guess a letter!");
console.log("Goodluck!");
console.log("---------------");
prompt.start();



game = {
 	wordBank: ['cat', 'dog', 'elephant', 'kangaroo', 'flamingo', 'lion'],
 	wordsWon: 0,
 	guessesRemaining: 10,
 	currentWrd: null,
 	
 	startGame: function (wrd) {
 		this.resetGuesses();
 		this.currentWrd = new Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);
 		this.currentWrd.getLet();
 		this.promptUser();
 	},

 	resetGuesses: function(){
 		this.guessesRemaining = 10;
 	},

 	promptUser: function(){
 		var self = this;
 		prompt.get(['guessLet'], function(err, result){
 			console.log("You have guessed: " + result.guessLet);
 			var manyGuessed = self.currentWrd.checkLetter(result.guessLet);

 			if(manyGuessed ==0) {
 				console.log("That is Wrong!");
 				self.guessesRemaining--;
 				
 			} else {
 				console.log("That is Correct!");
 					if(self.currentWrd.findWord()){
 						console.log("Congrats!! You won!!!!!");
 						console.log("-------------------");
 						return;
 					}
 			}

 			console.log("Number of guesses remaining: " + self.guessesRemaining);
 			console.log("-------------------");
 			if((self.guessesRemaining > 0) && (self.currentWrd.found == false)){
 				self.promptUser();
 			}
 			else if(self.guessesRemaining ==0){
 				console.log("Game over! The correct word is... ", self.currentWrd.target);
 			} else {
 				console.log(self.currentWrd.wordRender());
 			}
 		});

 	}


};

game.startGame();