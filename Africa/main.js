var country_list = [
	'Algeria',
	'Angola',
	'Benin',
	'Botswana',
	'Burkina Faso',
	'Burundi',
	'Cameroon',
	'Cape Verde',
	'Central African Republic',
	'Chad',
	'Comoros',
	'DR Congo',
	'Djibouti',
	'Egypt',
	'Equatorial Guinea',
	'Eritrea',
	'Ethiopia',
	'Gabon',
	'Gambia',
	'Ghana',
	'Guinea Bissau',
	'Guinea',
	'Ivory Coast',
	'Kenya',
	'Lesotho',
	'Liberia',
	'Libya',
	'Madagascar',
	'Malawi',
	'Mali',
	'Mauritania',
	'Mauritius',
	'Morocco',
	'Mozambique',
	'Namibia',
	'Niger',
	'Nigeria',
	'Republic of the Congo',
	'Rwanda',
	'Sao Tome and Principe',
	'Senegal',
	'Seychelles',
	'Sierra Leone',
	'Somalia',
	'South Africa',
	'South Sudan',
	'Sudan',
	'Swaziland',
	'Tanzania',
	'Togo',
	'Tunisia',
	'Uganda',
	'Zambia',
	'Zimbabwe',
];

// Random numbers between 0 and 53. Chosen by fair dice roll. Guaranteed to be random.
var random = [18, 49, 41, 9, 22, 48, 14, 4, 0, 53, 39, 26, 21, 15, 1, 19, 16, 5, 34, 3, 2, 37, 40, 11, 27, 12, 30, 42, 25, 28, 50, 38, 35, 45, 8, 17, 10, 36, 13, 51, 43, 44, 52, 24, 20, 31, 46, 7, 29, 23, 47, 32, 6, 33];
	
var num_countries = country_list.length;
var num_quizzes = 30;
var num_choices = 4;

var current_quiz = -1;
var correct = 0;

// Shuffle in place.
function Shuffle(l) {
	for (i = 0; i < l.length - 1; ++i) {
		// Randomly swap l[i] with the rest of the elements.
		var swap_index = Math.floor(Math.random() * (l.length - i));
		var t = l[i];
		l[i] = l[swap_index];
		l[swap_index] = t;
	}
}

function HasN(arr, n) {
	for (var i = 0; i < arr.length; ++i) {
		if (arr[i] == n) {
			return true;
		}
	}
	return false;
}

function GenerateChoices() {
	var choices = [];
	choices[0] = random[current_quiz];

	for (var i = 0; i < num_choices - 1; ++i) {
		while (true) {
			var n = Math.floor(Math.random() * num_countries);
			if (!HasN(choices, n)) {
				choices.push(n);
				break;
			}
		}
	}
	// Shuffle choices.
	Shuffle(choices);
	return choices;
}

function ShowQuiz() {
	var answer = random[current_quiz];
	var country = country_list[answer];

  // Show progress.
	var progress = "Quiz " + (current_quiz+1) + "/" + num_quizzes;
	$("#progress").text(progress);
	
	// Show images/
	$("#map").hide();
	$("#map").attr("src", "images/" + country + ".svg");
	
	// Show choices.
	var choices = GenerateChoices();
	for (var i = 0; i < num_choices; ++i) {
		$("#button" + i).text(country_list[choices[i]]);
		$("#button" + i).attr("value", choices[i]);
	}
}

function ShowResult() {	
	$("#quiz").hide();
	$("#result").show();
	$("#score").text(Math.floor(correct * 100.0/num_quizzes) + "%");
}

function NextQuiz() {
	++current_quiz;
	if (current_quiz == num_quizzes) {
		ShowResult();
	} else {
		ShowQuiz();
	}
}

function SubmitAnswer(value) {
	var answer = random[current_quiz];
	if (value == answer) {
		++correct;
	}
	NextQuiz();
}

function main() {
	$("#result").hide();
	$("#map").on("load", function() {
		$("#map").show();
	});
	NextQuiz();
	for (var i = 0; i < num_choices; ++i) {
		$("#button" + i).click(function(e) {
			SubmitAnswer(e.target.value);
		});
	}
}

$(document).ready(main);