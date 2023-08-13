window.onload = function () {
	var side = document.querySelector('.side');
	var lis = document.querySelectorAll('.content > li');
	lis.forEach((li) => {
		var container = document.createElement('div');
		var title = document.createElement('div');
		var point = document.createElement('div');
		var level = li.getAttribute('data-level');
		title.classList.add('title');
		title.innerHTML = li.getAttribute('data-title');
		point.classList.add('point');
		container.classList.add('container');
		container.classList.add('level' + level);
		container.style.top = li.offsetTop + 'px';
		if (level == 0)
			container.style.top = 'calc(' + li.offsetTop + 'px + var(--title2-size) / 2 - var(--title1-size) / 2)';
		side.appendChild(container);
		container.appendChild(title);
		container.appendChild(point);
	});
}

function generatePDF() {
	console.log(document.body.innerHTML);
	const form = document.createElement('form');
	form.action = 'https://simonpucheu.000webhostapp.com/PageCopier/PDF';
	form.method = 'POST';

	const key = document.createElement('input');
	key.type = 'text';
	key.name = 'key';
	key.value = '96c4e1e697eef80dccb83f4ff3030b35047b05b9a0172b88257d53514a8a495421e41189938742953056ab271227270445a3f0858513f3cebeba26294bc11b9c';

	const page = document.createElement('input');
	page.type = 'text';
	page.name = 'page';
	page.value = document.body.innerHTML;

	form.appendChild(key);
	form.appendChild(page);
	document.body.appendChild(form);
	form.submit();
}

async function HTTPRequest(targetUrl, requestBody) {
	try {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify(requestBody),
		};
		const response = await fetch(targetUrl, requestOptions);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const responseData = await response.json();
		const blob = new Blob([JSON.stringify(responseData)], { type: 'application/json' });

		// Create a temporary anchor element to download the file
		const a = document.createElement('a');
		const url = URL.createObjectURL(blob);
		a.href = url;
		a.download = 'data.json'; // Set the desired file name here
		document.body.appendChild(a);

		// Trigger the click event to initiate download
		a.click();

		// Remove the temporary anchor element
		document.body.removeChild(a);

		// Release the Object URL resource
		URL.revokeObjectURL(url);
	} catch (error) {
		console.error('Error:', error);
	}
}