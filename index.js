(function() {

	// Return element or a nodelist if multiple elements
	var el = function(element) {
		if (element.charAt(0) === "#") {
			return document.querySelector(element);
		} else {
			return document.querySelectorAll(element);
		}
	}


	// Set variables
	var window = el('#window'),
			equals = el('#equals'),
			nums = el('.num'),
			operators = el('.operator'),
			firstNum = "",
			secondNum = "",
			result = null,
			operator = "";

	
	// Click event functions
	var setNum = function() {
			secondNum += this.getAttribute("data-num");
			
			display(secondNum);
	}


	// Detect which function key was pressed
	var setOperator = function() {
		operator = this.innerText;
		if (!result) {
			firstNum = secondNum;
		}
		secondNum = '';
		console.log(`FirstNum = ${firstNum}`);
		console.log(`SecondNum = ${secondNum}`);
		console.log(`result = ${result}`);
		display(secondNum);
	}


	// Evaluate results based on function key pressed
	var evaluateResult = function() {
		if (firstNum.length > 0 && secondNum.length > 0 && operator != '') {
			firstNum = parseFloat(firstNum);
			secondNum = parseFloat(secondNum);

			switch (operator) {
				case '+': 
					result = firstNum + secondNum;
					break;
				case '-': 
					result = firstNum - secondNum;
					break;
				case '/': 
					result = firstNum / secondNum;
					break;
				case '*': 
					result = firstNum * secondNum;
					break;
				default:
					result = "ERROR!";
			} 

			if (result != "ERROR!") {
				firstNum = result.toString();
			} else {
				setTimeout(clrAll, 3000);
			}
			secondNum = '';
			display(result);
		}
	}


	// C button clear function clears last value
	var clr = function() {
		if (firstNum > 0 && secondNum > 0) {
			secondNum = firstNum;
			firstNum = '';
			operator = '';
			result = '';
		} else {
			secondNum = '';
			firstNum = '';
			operator = '';
			result = '';
		}

		display(secondNum);
	}


	// AC button clears all values
	var clrAll = function() {
		firstNum = '';
		secondNum = '';
		operator = '';
		result = 0;

		display(secondNum);
	}


	// Set click events for all elements
	for (let i = 0; i < nums.length; i++) {
		nums[i].onclick = setNum;
	}

	for (let i = 0; i < operators.length; i++) {
		operators[i].onclick = setOperator;
	}

	equals.onclick = evaluateResult;

	el('#clear').onclick = clr;

	el('#clear-all').onclick = clrAll;


	// Display values
	function display(number) {
		window.innerText = number;
	}
	
}());