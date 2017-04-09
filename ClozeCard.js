//fill in the blank sentences
var inquirer = require("inquirer");
var fs = require("fs");

var FullPhrase = [];
var deleteSection = [];
var Guess = [];

function clozeStartup(){
	inquirer.prompt([{
		name: "initialQuestion",
		message: "What would you like to do?",
		type: "list",
		choices: ["Create cards", "Guess the blank statements"]
	}
		]).then(function(answers){
			if (answers.initialQuestion==="Create cards"){
				//function
			}
			else if (answers.initialQuestion==="Guess the blank statements"){
				//function
			}
		})
}


function createCards(){
	inquirer.prompt([
	{
		name:"FullText",
		message: "Please type in the full phrase/sentence you would like to add to your review."
	},
	{
		name:"ClozeDeletion",
		message: "Please type the part of the phrase/sentence that you would like to remove."
		}]).then(function(answers){

			var phraseWithDeleted = answers.FullText.replace(answers.ClozeDeletion, "...")
			var toShowUser = answers.FullText.replace(answers.ClozeDeletion, "_____")
			// console.log(phraseWithDeleted);
			FullPhrase.push(answers.FullText);
			deleteSection.push(answers.ClozeDeletion);
			Guess.push(answers.toShowUser);
			fs.appendFile("logCloze.txt", JSON.stringify(FullPhrase) + JSON.stringify(deleteSection) + JSON.stringify(Guess), (err) =>{
				if (err) throw err;
				console.log("card was added!");
			})
		})
}

createCards();






