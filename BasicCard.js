//uses front and back arguments
var inquirer = require("inquirer");
var fs = require("fs");
// var split = require("split.js");
// var flashCardSetUp;

function BasicCard(front, back){
	this.cardType = "basic";
	this.front = front;
	this.back = back;
	BasicCard.prototype.printInfo = function(){
		console.log("Front:" + this.front + "\nBack: " + this.back);
	}
	BasicCard.prototype.printFront = function(){
		console.log("Front:" + this.front);
	}
	BasicCard.prototype.printBack = function(){
		console.log("Back: " + this.back);
	}
}
function ClozeCard(front, back){
	this.cardType = "cloze";
	this.front = front;
	this.back = back;
	
	ClozeCard.prototype.printInfo = function(){
		console.log("Front:" + this.front + "\nBack: " + this.back);
	}
	ClozeCard.prototype.printFront = function(){
		console.log("Front:" + this.front);
	}
	ClozeCard.prototype.printBack = function(){
		console.log("Back: " +  this.front.replace("________", this.back));
	}
}


// BasicCard.prototype.printInfo = function(){
// 	fs.appendFile("logFlash.txt", flashCardSetUp, + "\n", (err) =>{
// 		if (err) throw err;
// 		console.log("new flashcard was added")
// 	});
// }

//all cards in here
var card = [];

studyStartUp();

function studyStartUp(){
	inquirer.prompt([
	{
		name: "initialAction",
		message: "What would you like to do?",
		type: "list",
		choices: ["Make Basic flashcards", "Make Cloze flashcards", "Study flashcards"]
	}
	]).then(function(answers){
		if(answers.initialAction === "Make Basic flashcards"){
			addCards();
		}
		else if(answers.initialAction === "Make Cloze flashcards"){
			addClozeCards();
		}
		else if (answers.initialAction === "Study flashcards"){
			retrieveData(study);
		}
	})
}

function printAllFlashCards(flashData){
	console.log(flashData);
}

function addClozeCards()
	{
		console.log("CLOZE CARD");
		inquirer.prompt([
		{
			name:"front",
			message: "Please type in the full phrase/sentence you would like to add to your review."
		},
		{
			name:"back",
			message: "Please type the part of the phrase/sentence that you would like to remove."
		}
		]).then(function(answers){
			var ClozeCardSetUp = new ClozeCard(
				answers.front,
				answers.back
				);
			var toShowUser = new ClozeCard(
				answers.front.replace(answers.back, "________"),
				answers.back
				);
			card.push(answers.ClozeCardSetUp);
			fs.appendFile("logFlash.txt", JSON.stringify(toShowUser) + "\n", function(err){
				if (err) throw err;
				console.log("new flashcard was added");
				ClozeCardSetUp.printInfo();
				studyStartUp();
			});
		
		})
	}
//basic card only!!!!
function addCards(){
	// for (var i=0; i < addCards.length; i++){
	//prompt for basic card
	inquirer.prompt([
	{
		name: "front",
		message: "What would you like to add to the front of this flashcard?",
	},
	{
		name:"back",
		message: "What would you like to add to the back of this flashcard?"
	}
	]).then(function(answers){



	var flashCardSetUp = new BasicCard(
		answers.front,
		answers.back
		);

	card.push(flashCardSetUp);

	// BasicCard.prototype.printInfo = function(){
	// 	for (var i=0; i<card.length; i++){
	fs.appendFile("logFlash.txt", JSON.stringify(flashCardSetUp) + "\n", function(err){

		if (err) throw err;
		console.log("new flashcard was added");
		flashCardSetUp.printInfo();
		studyStartUp();
	});

	})

}
function retrieveData(callbackFunc)
{
		fs.readFile("logFlash.txt", "UTF-8", function(error, data){
		if (error)
		{
			console.log(error);
		}
		else
		{
			var flashData = data.split("\n");
			var filteredData = [];
			//console.log(flashData);
			for(var i = 0; i < flashData.length; i++)
			{
				if(flashData[i].length > 0)
				{
					var obj = JSON.parse(flashData[i]);
					if (obj.cardType === "basic")
					{
						var currentCard = new BasicCard(obj.front, obj.back);
						filteredData[i] = currentCard;
					}
					else
					{
						var currentCard = new ClozeCard(obj.front, obj.back);
						filteredData[i] = currentCard;
					}
				}	
			}
		}
			// callbackFunc(filteredData);
			callbackFunc(filteredData, 0);
		})
	}

function study(flashData, i){
	inquirer.prompt([
		{
			name: "study",
			message: flashData[i].front
		},
		]).then(function(answers){
			flashData[i].printBack();
			i++;
			if (i<flashData.length){
				study(flashData, i);
			}
			else {
				studyStartUp();
			}
		})
	// BasicCard.printFront();
	// ClozeCard.printFront();

}
