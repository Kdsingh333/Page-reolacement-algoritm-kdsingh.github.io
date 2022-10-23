
var count = 0;
var pages = [];
var pf;
var ph;
var f;
var rs;
var txt;

async function fifo() {
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
	var i, row = Number(f) + 1,
		j, col = rs.length;

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
		if (j > 0) {
			for (i = 0; i < row - 1; i++) {
				if (rs[k] == pages[i][j])
					flag = true;
			}
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
				prev = (smallest + 1) % (row - 1);
			} else {
				pages[prev][j] = rs[k];
				prev = (prev + 1) % (row - 1);
			}
			pages[row - 1][j] = "PF";
			k++;
			pf++;
			console.log("pf=", pf);
		} else {
			ph++;
			k++;
			console.log("ph=", ph);
			pages[row - 1][j] = "PH";
		}
	}

	for (i = 0; i < rs.length; i++) {
		console.log(rs[i]);
	}

	console.log("\n");
	for (i = 0; i < col; i++) {
		for (j = 0; j < row; j++) {
			console.log(pages[j][i]);

		}
		console.log("\n");
	}



	// 	function showString() {
	// 		var Table = $("<table border='1'></table>");
	// 		Table.addClass('table table-striped');
	// 		var Tbody = $("<tbody></tbody>");
	// 		var row = $('<tr></tr>');

	// 		for (k = 0; k < rs.length; k++) {
	// 			row.append($('<th></th>', { id: "header" }).html(rs[k] + ""));


	// 		}

	// 		Tbody.append(row);
	// 		Table.append(Tbody);

	// 		Table.appendTo($("#div"))
	// 	}


	//    function showData(){


	// 	var $table = $("<table border='1'></table>");
	// 	$table.addClass('table table-striped');
	// 	Tbody = $("<tbody></tbody>");

	// 	for (i = 0; i < row; i++) {
	// 		var line = $("<tr></tr>");


	// 		for (j = 0; j < col; j++) {


	// 			if (i == row - 1) {


	// 				if (("PH".localeCompare(pages[i][j]) == 0)) {
	// 					line.append('<td style="color:green">' + 'PH' + '</td>');
	// 				} else {
	// 					line.append('<td style="color:red">' + 'PF' + '</td>');
	// 				}

	// 				Tbody.append(line);

	// 			} else {

	// 				line.append($("<td ></td>").html(pages[i][j] + ""));


	// 				Tbody.append(line);
	// 			}

	// 		}


	// 		$table.append($tbody);
	// 		$table.appendTo($("#div"));
	// 		$("#sp1").html('<p style="text-align:center">' + "<b>The no of page faults is:</b>" + "   " +
	// 			'<span style="color:red">' + pf + '</span>' + '</p>')
	// 		$("#sp2").html('<p style="text-align:center">' + "<b>The no of page hits is:</b>" + "   " +
	// 			'<span style="color:green">' + ph + '</span>' + '</p>')
	// 		}

	//          showString();





	for (i = 0; i <= rs.length; i++) {
		if (i == 0) {
			var table = document.createElement('table');
			table.classList.add("table", "flex-container");
			var tbody = document.createElement('tbody');
			tbody.classList.add("tablenum" + [i], "sizing");

			var row1 = document.createElement('tr');
			var data = document.createElement('th');
			data.classList.add("header-color");
			var text = document.createTextNode("String");
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

					var text = document.createTextNode("FRM " + [j + 1]);
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

				var text = document.createTextNode(`${pages[j][i - 1]}`);
				column.appendChild(text);
				row3.appendChild(column);
				await sleep(500)
				document.getElementsByClassName("tablenum" + [i])[0].append(row3)
			}
		}




	}

	$("#sp1").html('<p style="text-align:center">' + "<b>The no of page faults is:</b>" + "   " +
		'<span style="color:red">' + pf + '</span>' + '</p>')
	$("#sp2").html('<p style="text-align:center">' + "<b>The no of page hits is:</b>" + "   " +
		'<span style="color:green">' + ph + '</span>' + '</p>')




	document.getElementById('bottom1').scrollIntoView();
	document.getElementById('calcbtn1').disabled = "disabled";
	document.getElementById("frames1").disabled = true;
	document.getElementById("rs1").disabled = true;





}
