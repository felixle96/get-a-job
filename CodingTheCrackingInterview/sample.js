Please use this Google doc to code during your interview. To free your hands for coding, we recommend that you use a headset or a phone with speaker option.
course = [lectures…]
score = pass/no pass, attendance
attendance = A/L/N

Eval Rules:
2 or more no shows = fail
3 or more consec. late shows  = fail
Else : Pass



Problem:
	Input: int (number of lectures)
	Return: number of unique sequences that would pass (order matters)


Input : 
input: 3
recEval(3, 0, 0)
(2, 0, 0)
	(1, 0, 0)
		(0, 0, 0)	= true
	(1, 1, 0)
(0, 2, 0) = false	
	(1, 0, 1)
		(0, 0, 2) = true
(2, 1, 0)
	(1, 1, 0)
		(0, 1, 0) 
	(1, 2, 0)
	(1, 1, 1)
(2, 0, 1)
	(1, 0, 0)
	(1, 1, 0)
	(1, 0, 2)

// numSol init to 1 b/c empty set is always solution

let numSol = 1;
function recEval(numLect, noShows = 0, consecLate = 0) {
	if (noshows >= 2 || consecLate >= 3) {	// failed kill branch
		return;
	}

	if (numLect <= 0) { // out of lectures
		numSol += 1;
		return;
	}


	// case: attended
recEval(numLect - 1, noShows, 0);
// case: noShow
recEval(numLect - 1, noShows + 1, 0);	
	// case: conseclate
	recEval(numLect - 1, noShows, consecLate + 1);

}







input : [‘L’, ‘L’, ‘A’, ‘L’, ‘L’, ‘L’, ‘N’];
// attendance array of strings
// numLect number lectures
function eval(attendance, numLect) {
	let noShows = 0;
	let consecLate = 0;
	let fail = false;

	// count number of no shows
	for(let i = 0; i < attendance.length; i++) {
		if (attendance[i] === “N”) {
			noShows++;
		}
	}

	if (noShows >= 2) {	// failure criteria #1
		return false;
	}

	// count number of consecutive late shows
	for(let i = 0; i < attendance.length; i++) {
		if(attendance[i] === “L”) {
			consecLate++;
			fail = consecLate >= 3 ? true : fail;
		} else {
			consecLate = 0;
		}
	}

	if (fail) {
		return false;
	}

	return true;
}
