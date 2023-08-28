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