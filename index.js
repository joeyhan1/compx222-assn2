//Variables
var pageCounter = 0;
var totalPoints = 0;
var riskPercentage = 0;
var remainingPercentage = 0;
var loopCount = 0;
var doneCounter = 0;

//Arrays for the select options values
const selectValuesArray = new Array();
const selectArray = new Array("ageSelect", "totalcholesterolSelect", "smokerSelect", "hdlcholesterolSelect", "treatedSelect", "bloodpressureSelect");

//Female points arrays
const ageFemaleArray = new Array(-7, -3, 0, 3, 6, 8, 10, 12, 14, 16);
//First five is age 20-39, Second five is age 40-49, Third five is age 50-59, Fourth five is age 60-69 and last five is age 70-79
const totalCholesterolFemaleArray = [[0, 4, 8, 11, 13], [0, 3, 6, 8, 10],[0, 2, 4, 5, 7], [0, 1, 2, 3, 4], [0, 1, 1, 2, 2]];
const smokerFemaleArray = new Array(9, 7, 4, 2, 1);
const hdlCholesterolFemaleArray = new Array(2, 1, 0, -1);
//First five is untreated and last five is treated
const bloodPressureFemaleArray = [[0, 1, 2, 3, 4], [0, 3, 4, 5, 6]];
const percentageFemaleArray = new Array(0.99, 1, 2, 3, 4, 5, 6, 8, 11, 14, 17, 22, 27, 30.1);

//Male points arrays
const ageMaleArray = new Array(-9, -4, 0, 3, 6, 8, 10, 11, 12, 13);
//First five is age 20-39, Second five is age 40-49, Third five is age 50-59, Fourth five is age 60-69 and last five is age 70-79
const totalCholesterolMaleArray = [[0, 4, 7, 9, 11], [0, 3, 5, 6, 8],[0, 2, 3, 4, 5], [0, 1, 1, 2, 3], [0, 0, 0, 1, 1]];
const smokerMaleArray = new Array(8, 5, 3, 1, 1);
const hdlCholesterolMaleArray = new Array(2, 1, 0, -1);
//First five is untreated and last five is treated
const bloodPressureMaleArray = [[0, 0, 1, 1, 2], [0, 1, 2, 2, 3]];
const percentageMaleArray = new Array(0.99, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 25, 30.1);

//This function is used to display and hide the drop down list boxes
function showHide() {
	const formArray = new Array("myGender", "myAge", "myTotalcholesterol", "mySmoker", "myHdlcholesterol", "myTreated", "myBloodpressure");
	var element = ""
	for (let i = 0; i < formArray.length; i++) {
		if(i == pageCounter) {
			let element = document.getElementById(formArray[i]);
			let hidden = element.getAttribute("hidden");
			if (hidden) {
				element.removeAttribute("hidden");
			}
		} else {
			let element = document.getElementById(formArray[i]);
			let hidden = element.getAttribute("hidden");
			element.setAttribute("hidden", "hidden");
		}
	} 
	console.log("Page:" + pageCounter);
}

//This function calculates the risk score
function calculateFRS() {
	//Gets the gender
	var gender = document.getElementById("genderSelect");
	var genderValue = gender.value;
	//For male
	if(genderValue == 1) {
		console.log("Male selected");
		storeValues();
		calculateMalePoints();
		console.log("Points" + totalPoints);
		
	} else if(genderValue == 2) { //For female
		console.log("Female selected");
		storeValues();
		calculateFemalePoints();
		console.log("Points" + totalPoints);
	}
}

//This function calculates female points
function calculateFemalePoints() {
	totalAgePointsFemale();
	totalCholestrolPointsFemale();
	totalSmokingPointsFemale();
	totalHDLCholestrolPointsFemale();
	totalBloodPressurePointsFemale();
	riskCalculatedFemale();
}

//This function calculates male points
function calculateMalePoints() {
	totalAgePointsMale();
	totalCholestrolPointsMale();
	totalSmokingPointsMale();
	totalHDLCholestrolPointsMale();
	totalBloodPressurePointsMale();
	riskCalculatedMale();
}

//This function is used when previous button is clicked
function previousClicked() {
	if(doneCounter == 0) {
		if(pageCounter > 0) {
			pageCounter--;
			showHide();
		}
	}
}

//This function is used when next button is clicked
function nextClicked() {
	if(doneCounter == 0) {
		if(pageCounter <= 6) {
			pageCounter++;
			showHide();
		}
	}
}

//This function is used when restart button is clicked
function restartClicked() {
	//Resets everything to their default
	pageCounter = 0;
	totalPoints = 0;
	riskPercentage = 0;
	remainingPercentage = 0;
	loopCount = 0;
	doneCounter = 0;
	document.getElementById("genderSelect").selectedIndex = 0;
	document.getElementById("ageSelect").selectedIndex = 0;
	document.getElementById("totalcholesterolSelect").selectedIndex = 0;
	document.getElementById("smokerSelect").selectedIndex = 1;
	document.getElementById("hdlcholesterolSelect").selectedIndex = 0;
	document.getElementById("treatedSelect").selectedIndex = 1;
	document.getElementById("bloodpressureSelect").selectedIndex = 0;
	var canvas = document.getElementById("canvas");
	const context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
	selectValuesArray.length = 0;
	showHide();
}

//This function is used to check whether users are done with their options picking and also generating the pie chart
function doneClicked() {
	if(pageCounter == 7) {
		if(doneCounter == 0) {
			calculateFRS();
			doneCounter++;
		}
	} else {
		window.alert("Please click next till you finish all the selection then click done");
	}
}

//This function is used to store the selected option values
function storeValues() {
	for(let i = 0; i < selectArray.length; i++) {
		var idSelect = document.getElementById(selectArray[i]);
		var idSelectValue = idSelect.value;
		selectValuesArray.push(idSelectValue);
	}
}

//This function gets the total after including female age points
function totalAgePointsFemale() {
	//Age points
	for(let i = 0; i < ageFemaleArray.length; i++) {
		if(selectValuesArray[0] == i) {
			totalPoints = totalPoints + ageFemaleArray[i];
			console.log("Age Points:" + totalPoints);
		}
	}
}

//This function gets the total after including male age points
function totalAgePointsMale() {
	//Age points
	for(let i = 0; i < ageMaleArray.length; i++) {
		if(selectValuesArray[0] == i) {
			totalPoints = totalPoints + ageMaleArray[i];
			console.log("Age Points:" + totalPoints);
		}
	}
}

//This function gets the total after including female total cholestrol points
function totalCholestrolPointsFemale() {
	//Total Cholestrol Points
	for(let j = 0; j < 6; j++) {
		//Checking ages 20-39
		if(selectValuesArray[0] == 0 || selectValuesArray[0] == 1) {
			if(selectValuesArray[1] == j) {
				totalPoints = totalPoints + totalCholesterolFemaleArray[0][j];
			}
		}
		//Checking ages 40-49
		if(selectValuesArray[0] == 2 || selectValuesArray[0] == 3) {
			if(selectValuesArray[1] == j) {
				totalPoints = totalPoints + totalCholesterolFemaleArray[1][j];
			}
		} 
		//Checking ages 50-59
		if(selectValuesArray[0] == 4 || selectValuesArray[0] == 5) {
			if(selectValuesArray[1] == j) {
				totalPoints = totalPoints + totalCholesterolFemaleArray[2][j];
			}
		} 
		//Checking ages 60-69
		if(selectValuesArray[0] == 6 || selectValuesArray[0] == 7) {
			if(selectValuesArray[1] == j) {
				totalPoints = totalPoints + totalCholesterolFemaleArray[3][j];
			}
		} 
		//Checking ages 70-79
		if(selectValuesArray[0] == 8 || selectValuesArray[0] == 9) {
			if(selectValuesArray[1] == j) {
				totalPoints = totalPoints + totalCholesterolFemaleArray[4][j];
			}
		} 		
	}
	console.log("Total Cholestrol Points:" + totalPoints);
}

//This function gets the total after including male total cholestrol points
function totalCholestrolPointsMale() {
	//Total Cholestrol Points
	for(let j = 0; j < 6; j++) {
		//Checking ages 20-39
		if(selectValuesArray[0] == 0 || selectValuesArray[0] == 1) {
			if(selectValuesArray[1] == j) {
				totalPoints = totalPoints + totalCholesterolMaleArray[0][j];
			}
		}
		//Checking ages 40-49
		if(selectValuesArray[0] == 2 || selectValuesArray[0] == 3) {
			if(selectValuesArray[1] == j) {
				totalPoints = totalPoints + totalCholesterolMaleArray[1][j];
			}
		} 
		//Checking ages 50-59
		if(selectValuesArray[0] == 4 || selectValuesArray[0] == 5) {
			if(selectValuesArray[1] == j) {
				totalPoints = totalPoints + totalCholesterolMaleArray[2][j];
			}
		} 
		//Checking ages 60-69
		if(selectValuesArray[0] == 6 || selectValuesArray[0] == 7) {
			if(selectValuesArray[1] == j) {
				totalPoints = totalPoints + totalCholesterolMaleArray[3][j];
			}
		} 
		//Checking ages 70-79
		if(selectValuesArray[0] == 8 || selectValuesArray[0] == 9) {
			if(selectValuesArray[1] == j) {
				totalPoints = totalPoints + totalCholesterolMaleArray[4][j];
			}
		} 		
	}
	console.log("Total Cholestrol Points:" + totalPoints);
}

//This function gets the total after including female smoking points
function totalSmokingPointsFemale() {
	//Total Smoking Points
		//Checking if smoker option selected is yes
		if(selectValuesArray[2] == 0) {
			//Checking ages 20-39
			if(selectValuesArray[0] == 0 || selectValuesArray[0] == 1) {
				totalPoints = totalPoints + smokerFemaleArray[0];
			}
			//Checking ages 40-49
			if(selectValuesArray[0] == 2 || selectValuesArray[0] == 3) {
				totalPoints = totalPoints + smokerFemaleArray[1];
			}
			//Checking ages 50-59
			if(selectValuesArray[0] == 4 || selectValuesArray[0] == 5) {
				totalPoints = totalPoints + smokerFemaleArray[2];
			}	
			//Checking ages 60-69
			if(selectValuesArray[0] == 5 || selectValuesArray[0] == 6) {
				totalPoints = totalPoints + smokerFemaleArray[3];
			}		
			//Checking ages 70-79
			if(selectValuesArray[0] == 7 || selectValuesArray[0] == 8) {
				totalPoints = totalPoints + smokerFemaleArray[4];
			}					
		}
		console.log("Total Smoking Points:" + totalPoints);
}

//This function gets the total after including male smoking points
function totalSmokingPointsMale() {
	//Total Smoking Points
		//Checking if smoker option selected is yes
		if(selectValuesArray[2] == 0) {
			//Checking ages 20-39
			if(selectValuesArray[0] == 0 || selectValuesArray[0] == 1) {
				totalPoints = totalPoints + smokerMaleArray[0];
			}
			//Checking ages 40-49
			if(selectValuesArray[0] == 2 || selectValuesArray[0] == 3) {
				totalPoints = totalPoints + smokerMaleArray[1];
			}
			//Checking ages 50-59
			if(selectValuesArray[0] == 4 || selectValuesArray[0] == 5) {
				totalPoints = totalPoints + smokerMaleArray[2];
			}	
			//Checking ages 60-69
			if(selectValuesArray[0] == 5 || selectValuesArray[0] == 6) {
				totalPoints = totalPoints + smokerMaleArray[3];
			}		
			//Checking ages 70-79
			if(selectValuesArray[0] == 7 || selectValuesArray[0] == 8) {
				totalPoints = totalPoints + smokerMaleArray[4];
			}					
		}
		console.log("Total Smoking Points:" + totalPoints);
}

//This function gets the total after including female hdl cholestrol points
function totalHDLCholestrolPointsFemale() {
	for(let k = 0; k < 4; k++) {
		if(selectValuesArray[3] == k) {
			totalPoints = totalPoints + hdlCholesterolFemaleArray[k];
		}
	}
	console.log("Total HDL Cholestrol Points:" + totalPoints);
}

//This function gets the total after including male hdl cholestrol points
function totalHDLCholestrolPointsMale() {
	for(let k = 0; k < 4; k++) {
		if(selectValuesArray[3] == k) {
			totalPoints = totalPoints + hdlCholesterolMaleArray[k];
		}
	}
	console.log("Total HDL Cholestrol Points:" + totalPoints);
}

//This function gets the total after including female blood pressure points
function totalBloodPressurePointsFemale() {
	//Untreated
	if(selectValuesArray[4] == 1) {
		for(let l = 0; l < 5; l++) {
			if(selectValuesArray[5] == l) {
				totalPoints = totalPoints + bloodPressureFemaleArray[0][l];
			}
		}
	}
	//Treated
	if(selectValuesArray[4] == 0) {
		for(let m = 0; m < 5; m++) {
			if(selectValuesArray[5] == m) {
				totalPoints = totalPoints + bloodPressureFemaleArray[1][m];
			}
		}
	}
	console.log("Total Blood Pressure Points:" + totalPoints);
}

//This function gets the total after including male blood pressure points
function totalBloodPressurePointsMale() {
	//Untreated
	if(selectValuesArray[4] == 1) {
		for(let l = 0; l < 5; l++) {
			if(selectValuesArray[5] == l) {
				totalPoints = totalPoints + bloodPressureMaleArray[0][l];
			}
		}
	}
	//Treated
	if(selectValuesArray[4] == 0) {
		for(let m = 0; m < 5; m++) {
			if(selectValuesArray[5] == m) {
				totalPoints = totalPoints + bloodPressureMaleArray[1][m];
			}
		}
	}
	console.log("Total Blood Pressure Points:" + totalPoints);
}

//This function calculates the risk percentages and draw the pie chart for females
function riskCalculatedFemale() {
	femaleRiskPercentage();
	drawPieChart();
}

//This function calculates the risk percentages and draw the pie chart for males
function riskCalculatedMale() {
	maleRiskPercentage();
	drawPieChart();
}

//This function is used to make the pie chart
function drawPieChart() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var cw = canvas.width;
	var ch = canvas.height;
	
	ctx.lineWidth = 2;
	ctx.font = '10px verdana';
	
	var PI2 = Math.PI * 2;
	var myColor = ["Red", "Blue"];
	var myData = [riskPercentage, remainingPercentage];
	var cx = 190;
	var cy = 150;
	var radius = 100;
	
	pieChart(myData, myColor);
	
	//This function is used to make the pie chart shape
	function pieChart(data, colors) {
	
	  var total = 0;
	  for (var i = 0; i < data.length; i++) {
		total += data[i];
	  }
	
	  var sweeps = []
	  for (var i = 0; i < data.length; i++) {
		sweeps.push(data[i] / total * PI2);
	  }
	
	  var accumAngle = 0;
	  for (var i = 0; i < sweeps.length; i++) {
		drawWedge(accumAngle, accumAngle + sweeps[i], colors[i], data[i]);
		accumAngle += sweeps[i];
	  }
	
	
	}
	
	//This function is useed to draw the wedges for the pie chart
	function drawWedge(startAngle, endAngle, fill, label) {
	
	  // draw the wedge
	  ctx.beginPath();
	  ctx.moveTo(cx, cy);
	  ctx.arc(cx, cy, radius, startAngle, endAngle, false);
	  ctx.closePath();
	  ctx.fillStyle = fill;
	  ctx.strokeStyle = 'black';
	  ctx.fill();
	  ctx.stroke();
	
	  // draw the label
	  var midAngle = startAngle + (endAngle - startAngle) / 2;
	  var labelRadius = radius * .75;
	  var x = cx + (labelRadius) * Math.cos(midAngle);
	  var y = cy + (labelRadius) * Math.sin(midAngle);
	  ctx.fillStyle = 'white';
	  ctx.fillText(label, x, y);
	
	}
	window.alert("Red is the risk percentage and blue is the remainder");
}

//This function is used to get the risk percentages and remainders for females
function femaleRiskPercentage() {
	if(totalPoints < 9) {
		riskPercentage = percentageFemaleArray[0];
		remainingPercentage = 100 - riskPercentage;
		window.alert("The risk percentage is 0.99 and the remainder is 99.01");
	} else if(totalPoints >= 9 && totalPoints < 13) {
		riskPercentage = percentageFemaleArray[1];
		remainingPercentage = 100 - riskPercentage;
		window.alert("The risk percentage is 1 and the remainder is 99");
	} else if(totalPoints == 13 || totalPoints == 14) {
		riskPercentage = percentageFemaleArray[2];
		remainingPercentage = 100 - riskPercentage;
		window.alert("The risk percentage is 2 and the remainder is 98");
	} else if(totalPoints >= 15 && totalPoints < 25) {
		for(let i = 15; i < 25; i++) {
			if(totalPoints == i) {
				riskPercentage = percentageFemaleArray[loopCount+3];
				remainingPercentage = 100 - riskPercentage;
			}
			loopCount++;
		}
	} else if(totalPoints > 25) {
		riskPercentage = percentageFemaleArray[13];
		remainingPercentage = 100 - riskPercentage;
	}
}

//This function is used to get the risk percentages and remainders for males
function maleRiskPercentage() {
	if(totalPoints <= 0) {
		riskPercentage = percentageMaleArray[0];
		remainingPercentage = 100 - riskPercentage;
		window.alert("The risk percentage is 0.99 and the remainder is 99.01");
	} else if(totalPoints > 0 && totalPoints < 5) {
		riskPercentage = percentageMaleArray[1];
		remainingPercentage = 100 - riskPercentage;
		window.alert("The risk percentage is 1 and the remainder is 99");
	} else if(totalPoints == 5 || totalPoints == 6) {
		riskPercentage = percentageMaleArray[2];
		remainingPercentage = 100 - riskPercentage;
		window.alert("The risk percentage is 2 and the remainder is 98");
	} else if(totalPoints >= 7 && totalPoints < 17) {
		for(let i = 7; i < 17; i++) {
			if(totalPoints == i) {
				riskPercentage = percentageMaleArray[loopCount+3];
				remainingPercentage = 100 - riskPercentage;
			}
			loopCount++;
		}
	} else if(totalPoints >= 17) {
		riskPercentage = percentageMaleArray[13];
		remainingPercentage = 100 - riskPercentage;
	}
}