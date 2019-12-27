//"use strict"
$(document).ready(function(){

var wins = 0;
var losses = 0;

// 01) first set multiple arrays with different themes:
	var gameArrays = {
		cars	: ["honda", "chevrolet", "buick", "ford", "volvo", "mercedes", "nissan", "jeep", "toyota", "hyundai"],
		fruit	: ["bananas", "pineapples", "apples", "oranges", "grapes", "kiwis", "strawberries", "grapefruit"],
		states	: ["alabama", "alaska", "georgia", "florida", "texas", "california", "washington", "iowa", "idaho"],
		colors	: ["green", "yellow", "red", "orange", "purple", "cyan", "black", "white", "silver", "gold", "magenta"],
		meds 	: ["xanax", "cabometyx", "ocrevus", "abarelix", "ulesfia", "balsalazide", "ganirelix", "qutenza"],
		body 	: ["brain", "arms", "legs", "torso", "hands", "feet", "digits", "lumbar", "follicle", "nails", "hairs"],
		plants 	: ["anemone", "carnation", "tulip", "amaryllis", "lily", "daffodil", "lilac", "columbine", "aster"]
	}

	var manyArrays = Object.keys(gameArrays);
	console.log("This is how many arrays we have to choose from: " + manyArrays.length);

	//console.log(gameArrays.cars[1]); //this works
	//console.log(manyArrays.length);


// 02) need a function to select one of the arrays:

	//need a variable that will cycle between 0 and the number of arrays (minus one);
	//the result of the random number will be used as an index number;
	var singleArray = Math.floor((Math.random() * manyArrays.length) + 0);
	console.log(manyArrays[singleArray]);
	
	//console.log(gameArrays[manyArrays[singleArray]]);

	//console.log("Here is the random number that will act as the index: " + singleArray);

	//this is the function that uses the random index to get an array
	function keySelect(number){
	//instead of multiple ifs, use a switch (select-case) statement
	//one of these pairs will be used to display an array
		switch(number){
			case 0:
				return "cars";
			case 1:
				return "fruit";
			case 2:
				return "states";
			case 3:
				return "colors";
			case 4:
				return "meds";
			case 5:
				return "body"
			case 6:
				return "plants";
			default:
				return;
		}

	}

	var playArray = gameArrays[keySelect(singleArray)];	
 	console.log("Here is your randomly selected array: ");
	console.log(playArray);
	//function works


// 03) once an array is chosen, select a word from an index:

	//need a variable that will cycle between 0 and the number of items (minus one);
	//the result of the random number will be used as an index number;
	var singleItem = Math.floor((Math.random() * playArray.length));
	console.log("Here is the random number that will act as the index: " + singleItem);
 	
	var guessWord = playArray[singleItem];
 	console.log("Here is the random item from the array: " + guessWord);
 	//sequence works


// 04) when a single word is chosen, feedback is given back to the player:
	
	//let them know what the theme is by updating the text before the well
	//let them know how many letters exist in the word using "__ "

	//this for loop initializes the blanks so that we see number of letters
	//we should use this loop to build a string
	var blankWord = [];
	for (var i = 0; i < guessWord.length; ++i){
		//$("#gameField").append("_______   ");
		blankWord.push("_______   ");
	}

	//initialize the variables that show up on the page
	//var wins = 0;
	//var losses = 0;
	var rGuess = (guessWord.length - 1);

	//once the blank work has been built, update the game field
	$("#gameField").append(blankWord);

	$("#wins").html(wins);
	$("#losses").html(losses);
	$("#rGuess").html(rGuess);
	$("#theme").html("<strong>Theme: " + keySelect(singleArray) + "</strong>");

// 05) find a way to compare the user's input to the selected word
	// when any key is pressed, the function below will run

	$(document).on("keyup", function(meKey){
		//console.log("hey there");

		switch( guessWord.includes(meKey.key) ){ 
		//learned about ".includes()" on 06/10 @ 11:00
		//it's asking if the pressed key exists in the string (boolean)

			case true:
				//in the event that the pressed key is in the string
		 		//write a function that includes the .indexOf("str")
		 		//FYI take a look at the .split("str")
		 		console.log("includes that key");
				
				//loop through the string and replace the blank with the input key
				for(i = 0; i < guessWord.length; ++i){

					if(guessWord[i] === meKey.key){
						blankWord[i] = meKey.key;
						$("#gameField").html(blankWord);
					}
					else{
						$("#gameField").html(blankWord);
					}
				} 

				//run a function that checks to see if the game is won
				winGame(blankWord);	

		 		break;
		 	
		 	case false:
		 		//in the event that the pressed key is not in the string
		 		console.log("does not includes");
		 		$("#badGuess").append(meKey.key);

		 		//subtract one from the guesses
		 		--rGuess;
		 		$("#rGuess").html(rGuess);

		 		//run sequence that checks to see if the game is over
		 		loseGame(rGuess);

		 		break;
		 	}

	});

	function loseGame(num){

		if(num === 0){
			//add one to losses
			losses++;

			//update the page
			$("#losses").html(losses);

			//reset rGuess to 0
			rGuess = 0;

			//call a new game
			nextGame();
		}
	}

	function winGame(stg){
		
		switch(stg.includes("_______")){
			case true:
			break;

			case false:
			++wins;
			alert("you win");
			break;
		}

	}

	function nextGame(){

		alert("next game");
		reset();

	}


	function reset(){

		$("#wins").html("Wins");
		$("#losses").html("Losses");
		$("#rGuess").html("Remmaining Guesses");
		$("#theme").html("<strong>Theme: [[Start New Game]]</strong>");
	}


});