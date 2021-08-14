'use strick';
console.clear;
{
	const today = new Date();
	let year = today.getFullYear();
	let month = today.getMonth();

	function getCalendarHead() {
		dates = [];
		const d = new Date(year, month, 0).getDate();
		const n = new Date(year, month, 1).getDay();
		for (let i = 0; i < n; i++) {
			dates.unshift({
				date: d - i,
				isToday: false,
				isDisabled: true,
			});
		}
		return dates;
	}

	function getCalendarBody() {
		const dates = [];
		const lastDate = new Date(year, month + 1, 0).getDate();
		for (let i = 1; i <= lastDate; i++) {
			dates.push({
				date: i,
				isToday: false,
				isDisabled: false,
			});
		}
		if (year === today.getFullYear() && month === today.getMonth()) {
			dates[today.getDate() - 1].isToday = true;
		}
		return dates;
	}

	function getCalendarTail() {
		const dates = [];
		const lastDay = new Date(year, month + 1, 0).getDay();

		for (let i = 1; i < 7 - lastDay; i++) {
			dates.push({
				date: i,
				isToday: false,
				isDisabled: true,
			});
		}
		return dates;
	}

	function clearCalendar() {
		const tbody = document.querySelector('tbody');
		while (tbody.firstChild) {
			tbody.removeChild(tbody.firstChild);
		}
	}

	function renderTitle() {
		const title = `${year}/${String(month + 1).padStart(2, '0')}`;
		document.getElementById('title').textContent = title;
	}

	function renderWeeks() {
		const dates = [
			...getCalendarHead(),
			...getCalendarBody(),
			...getCalendarTail(),
		];
		const weeks = [];
		const weeksCount = dates.length / 7;
		for (let i = 0; i < weeksCount; i++) {
			weeks.push(dates.splice(0, 7));
		}
		weeks.forEach(week => {
			const tr = document.createElement('tr');
			week.forEach(date => {
				const td = document.createElement('td');
				td.textContent = date.date;
				if (date.isToday) {
					td.classList.add('today');
				}
				if (date.isDisabled) {
					td.classList.add('disabled');
				}
				tr.appendChild(td);
			});
			document.querySelector('tbody').appendChild(tr);
		});
	}

	function createCalendar() {
		clearCalendar();
		renderTitle();
		renderWeeks();
	}
	document.getElementById('prev').addEventListener('click', () => {
		month--;
		if (month < 0) {
			year--;
			month = 11;
		}
		createCalendar();
	});
	document.getElementById('next').addEventListener('click', () => {
		month++;
		if (month > 11) {
			year++;
			month = 0;
		}
		createCalendar();
	});
	document.getElementById('today').addEventListener('click', () => {
		year = today.getFullYear();
		month = today.getMonth();
		createCalendar();
		const currentTheme = localStorage.getItem('theme');
		if (currentTheme === 'dark') {
			localStorage.removeItem('theme');
		} else {
			localStorage.setItem('theme', 'dark');
		}
		document.documentElement.setAttribute("data-theme", currentTheme);
	});
	document.getElementById('test1').addEventListener('click', () => {
		let datestr = document.getElementById('date').value;
		datestr = datestr.replace(/-/g, '/');
		console.log(datestr);
	});

	function getRadioValue() {
		const radio = document.getElementsByName('theme');
		let result;
		radio.forEach(rd => {
			if (rd.checked) {
				result = rd.value;
			}
		});
		return result;
	}
	const radio = document.getElementsByName('theme');
	radio.forEach(rd => {
		rd.addEventListener('click', () => {
			let mycolor = getRadioValue();
			localStorage.setItem('theme', mycolor);
			renderTheme();
		});
	});

	function renderTheme() {
		const currentTheme = localStorage.getItem('theme');
		console.log('test' + localStorage.getItem('theme'));
		document.documentElement.setAttribute("data-theme", currentTheme);
	}
	renderTheme();
	createCalendar();

	document.getElementById('copybtn').addEventListener('click',()=>{
		const value=document.getElementById('textarea').value;
		textareaCopy(value);
	});

	async function textareaCopy(text){
		try{
			navigator.clipboard.writeText(text);
		}catch(error){
			alert((error&&error.message)||'コピーに失敗しました。');
		}
	}
}