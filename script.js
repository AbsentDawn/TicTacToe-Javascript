/*


	Make sure JQuery is working
	Get an X showing on the screen
	After the X get an O showing on the screen
	Ensure that you can select any box at any time 
	Player turns text changes when clicked
	

*/



// $(function() {
// 	console.log("It's working");

// 	var move = 1; 
// 	var pOne;

// 	function checkPlayerMoves(){
// 		$('#board tr td').click(function() {
// 			if($(this).text() == ""){
// 				if((move % 2) == 1) {	
// 					pOne = true;		
// 					$(this).append("X");
// 					$("h2").text("It is O's turn");
// 					console.log(pOne);
// 				} else {
// 					pOne = false;
// 					$(this).append("O");
// 					$("h2").text("It is X's turn");
// 					console.log(pOne);
// 				}
// 				move++;
// 			}
// 		});
// 	}

// 	// checkPlayerMoves();

// 	 function winLogic(td) {
// 	 	var winOne = ["0", "1", "2"];
// 	 	for(var i = 0; i < td.length; i++){
// 	 		array.push(console.log(td[i]));
// 	 	}
// 	 }

// 	 winLogic($("td").toArray());
// });


window.onload = start;
var boxes = document.getElementsByTagName("td");
var turnText = document.querySelector(".playerTurn");
var counter = 1;
var winCounter = 0
var OMoves = [];
var XMoves = [];

var winningCombinations = [[0,1,2],[3,4,5],[6,7,8],
	[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function start(){
	addXandOListener();
	addResetListener();
}


function addXandOListener(){
	for (var i = boxes.length - 1; i >= 0; i--) {
		boxes[i].addEventListener("click", addXorO);
	}
}

function addXorO(event){
	if (event.target.innerHTML.length === 0){
		if (counter % 2 === 0) {
			OMoves.push(parseInt(event.target.getAttribute("data-num")));
			event.target.innerHTML = "O";
			event.target.setAttribute("class","O");
			turnText.innerHTML = "It is X's turn";
			counter++;
			checkForWin(OMoves, "O");
		}
		else {
			XMoves.push(parseInt(event.target.getAttribute("data-num")));
			event.target.innerHTML = "X";
			event.target.setAttribute("class","X");
			turnText.innerHTML = "It is O's turn";
			counter++;
			checkForWin(XMoves, "X");
		}
		if (counter >= 10){
			turnText.innerHTML = "Game Over!";
			var conf = confirm("It's a draw, do you want to play again?");
			if(conf){
				resetBoard();
			}
		}
	}
}

function addResetListener(){
	var resetButton = document.getElementById("reset");
	resetButton.addEventListener("click", resetBoard);
}

function checkForWin(movesArray, name){
	for (var i = 0; i < winningCombinations.length; i++) {
		winCounter = 0;
		for (var j = 0; j < winningCombinations[i].length; j++) {
			if(movesArray.indexOf(winningCombinations[i][j]) !== -1){
				winCounter++;
			}
			if(winCounter === 3){
				alert("Game over, " + name + " wins!");
				resetBoard();
			}
		}
	}
}

function resetBoard(){
	for (var i = boxes.length - 1; i >= 0; i--) {
		boxes[i].innerHTML="";
		boxes[i].setAttribute("class","clear");
	}
	OMoves = [];
	XMoves = [];
	winCounter=0;
	counter = 1;
	turnText.innerHTML = "It is X's turn";
}