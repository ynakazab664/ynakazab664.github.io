'use strick';
{
	var today = new Date();
	var year = today.getFullYear();
	var month = today.getMonth();

	function getCalendarHead() {
		dates = [];
		var d = new Date(year, month, 0).getDate();
		var n = new Date(year, month, 1).getDay();
		for (var i = 0; i < n; i++) {
			dates.unshift({
				date: d - i,
				isToday: false,
				isDisabled: true
			});
		}
		return dates;
	}

	function getCalendarBody() {
		var dates = [];
		var lastDate = new Date(year, month + 1, 0).getDate();
		for (var i = 1; i <= lastDate; i++) {
			dates.push({
				date: i,
				isToday: false,
				isDisabled: false
			});
		}
		if (year === today.getFullYear() && month === today.getMonth()) {
			dates[today.getDate() - 1].isToday = true;
		}
		return dates;
	}

	function getCalendarTail() {
		var dates = [];
		var lastDay = new Date(year, month + 1, 0).getDay();

		for (var i = 1; i < 7 - lastDay; i++) {
			dates.push({
				date: i,
				isToday: false,
				isDisabled: true
			});
		}
		return dates;
	}

	function clearCalendar() {
		var tbody = document.getElementById('tbody');
		while (tbody.firstChild) {
			tbody.removeChild(tbody.firstChild);
		}
	}

	function renderTitle() {
		var title = year + "/" + (month + 1);
		document.getElementById('title').innerText = title;
	}

	function renderWeeks() {
		var dates = [];
		var calendarHead = getCalendarHead();
		var calendarBody = getCalendarBody();
		var calendarTail = getCalendarTail();
		for (var i = 0; i < calendarHead.length; i++) {
			dates.push(calendarHead[i]);
		}
		for (var i = 0; i < calendarBody.length; i++) {
			dates.push(calendarBody[i]);
		}
		for (var i = 0; i < calendarTail.length; i++) {
			dates.push(calendarTail[i]);
		}

		var weeks = [];
		var weeksCount = dates.length / 7;
		for (var i = 0; i < weeksCount; i++) {
			weeks.push(dates.splice(0, 7));
		}
		for (var i = 0; i < weeks.length; i++) {
			var tr = document.createElement('tr');
			for (var j = 0; j < weeks[i].length; j++) {
				var td = document.createElement('td');
				td.innerText = weeks[i][j].date;
				if (weeks[i][j].isToday) {
					// td.classList.add('today');
					td.style.fontWeight = "bold";
				}
				if (weeks[i][j].isDisabled) {
					// td.classList.add('disabled');
					// td.style.display = "block";
					td.style.filter = "alpha(opacity=30)";
					td.style.opacity = .3;
				}
				if (j === 6) {
					td.style.color = "blue";
				}
				tr.appendChild(td);
			}
			document.getElementById('tbody').appendChild(tr);
		}
		// weeks.forEach(week => {
		// 	const tr = document.createElement('tr');
		// 	week.forEach(date => {
		// 	});
		// 	document.querySelector('tbody').appendChild(tr);
		// });
	}

	function createCalendar() {
		clearCalendar();
		renderTitle();
		renderWeeks();
	}
	document.getElementById('prev').onclick = function () {
		month--;
		if (month < 0) {
			year--;
			month = 11;
		}
		createCalendar();
	}
	document.getElementById('next').onclick = function () {
		month++;
		if (month > 11) {
			year++;
			month = 0;
		}
		createCalendar();
	}
	document.getElementById('today').onclick = function () {
		year = today.getFullYear();
		month = today.getMonth();
		createCalendar();
	}
	createCalendar();
}