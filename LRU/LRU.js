var count = 0;
var pages = [];
var pf;
var ph;
var f;
var rs;
var txt;

async function lru() {
	f = document.getElementById("frames1").value;
	rs = document.getElementById("rs1").value;
	var isnum = /^\d+$/.test(rs);
	if (f <= 0) {
		alert("Please provide proper input");
		return;
	}
	else if (!isnum) {
		alert("Please use numbers in reference string");
		return;
	}
	var x = document.getElementById("resetbtn1").style.display = "block";
	console.log(f);
	console.log(rs);
	var prev;
	pf = 0;
	ph = 0;
	var k = 0;
	var l;
	var least;
	var index;
	var i, row = Number(f) + 1, j, col = rs.length;

	pages = new Array(row);
	for (i = 0; i < row; i++)
		pages[i] = new Array(col);

	for (i = 0; i < row - 1; i++) {
		for (j = 0; j < col; j++)
			pages[i][j] = "*";
	}

	for (j = 0; j < col; j++) {
		var smallest = -1;
		var flag = false;
		if (j > 0) {
			for (i = 0; i < row - 1; i++)
				pages[i][j] = pages[i][j - 1];
		}
		for (i = 0; i < row - 1; i++) {
			if (rs[k] == pages[i][j])
				flag = true;
		}
		if (flag == false) {
			for (i = 0; i < row - 1; i++) {
				if (pages[i][j] == "*") {
					smallest = i;
					break;
				}
			}
			if (smallest != -1) {
				pages[smallest][j] = rs[k];
			}
			else {
				index = 9999;
				for (i = 0; i < row - 1; i++) {
					for (l = j - 1; l >= 0; l--) {
						if (pages[i][j] == rs[l]) {
							least = l;
							break;
						}

					}
					if (index > least)
						index = least;

				}

				for (i = 0; i < row - 1; i++) {
					if (pages[i][j] == rs[index])
						break;
				}

				pages[i][j] = rs[k];
			}
			pages[row - 1][j] = "PF";
			k++;
			pf++;
			console.log("pf=", pf);
		}
		else {
			ph++;
			k++;
			console.log("ph=", ph);
			pages[row - 1][j] = "PH";
		}
	}
    document.getElementById("Abbre").style.display = "block";

	for (i = 0; i <= rs.length; i++) {
		if (i == 0) {
			var table = document.createElement('table');
			table.classList.add("table", "flex-container");
			var tbody = document.createElement('tbody');
			tbody.classList.add("tablenum" + [i], "sizing");

			var row1 = document.createElement('tr');
			var data = document.createElement('th');
			data.classList.add("header-color");
			var text = document.createTextNode(" String ");
			text
			data.appendChild(text);
			row1.appendChild(data);
			tbody.append(row1);
			table.append(tbody);
			document.getElementById("div").append(table);
		}
		else {


			var table = document.createElement('table');
			table.classList.add("table", "flex-container");
			var tbody = document.createElement('tbody');
			tbody.classList.add("tablenum" + [i]);

			var row1 = document.createElement('tr');
			var data = document.createElement('th');
			data.classList.add("header-color");
			var text = document.createTextNode(`${rs[i - 1]}`);
			data.appendChild(text);
			row1.appendChild(data);
			tbody.append(row1);
			table.append(tbody);
			document.getElementById("div").append(table);
		}
	}


	document.getElementById('calcbtn1').disabled = "disabled";
	document.getElementById("frames1").disabled = true;
	document.getElementById("rs1").disabled = true;
	document.getElementById("mySelect").disabled = true;

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}


	for (i = 0; i <= col; i++) {

		if (i == 0) {

			for (var j = 0; j < row; j++) {
				if (j == row - 1) {
					var row3 = document.createElement('tr');

					var column = document.createElement('td');

					var text = document.createTextNode("Result");
					column.appendChild(text);
					row3.appendChild(column);
					document.getElementsByClassName("tablenum" + [i])[0].append(row3)
				}
				else {
					var row3 = document.createElement('tr');

					var column = document.createElement('td');

					var text = document.createTextNode("FR " + [j + 1]);
					column.appendChild(text);
					row3.appendChild(column);
					document.getElementsByClassName("tablenum" + [i])[0].append(row3);
				}
			}
		}
		else {
			for (var j = 0; j < row; j++) {
				var row3 = document.createElement('tr');

				var column = document.createElement('td');
				column.setAttribute("border", "2px")

				var text = document.createTextNode(`${pages[j][i - 1]}`);
				column.appendChild(text);
				row3.appendChild(column);
				await sleep(400)

				document.getElementsByClassName("tablenum" + [i])[0].append(row3)
			}
			await sleep(1000)
		}




	}

	var selectElement = document.getElementById("mySelect").value;
	console.log(selectElement);

	if (selectElement == "1") {
		$("#sp1").html('<p style="text-align:center; font-size:20px">' + "<b>THE NO OF PAGE FAULT IS:</b>" + "   " +
			'<span style="color:red">' + pf + '</span>' + '</p>' + '<br>' + '<p style="text-align:center; font-size:20px">' + "<b>THE PAGE FAULT PECENTAGE IS:</b>" + "   " +
			'<span style="color:red">' + Math.floor((pf / (pf + ph)) * 100) + "%" + '</span>' + '</p>')

	}
	else if (selectElement == "2") {
		$("#sp2").html('<p style="text-align:center;  font-size:20px">' + "<b>THE NO OF PAGE HIT IS:</b>" + "   " +
			'<span style="color:green">' + ph + '</span>' + '</p>' + '<br>' + '<p style="text-align:center; font-size:20px">' + "<b>THE PAGE HIT PECENTAGE IS:</b>" + "   " +
			'<span style="color:green">' + Math.floor((ph / (pf + ph)) * 100) + "%" + '</span>' + '</p>')
	}else {
		alert("Please Choose Page hit or page fault in 3rd input box to see Calculation");
	}
	document.getElementById('bottom1').scrollIntoView();
}