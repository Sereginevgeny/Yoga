window.addEventListener('DOMContentLoaded', function() {
'use strict';


// находим селекторы
let tab = document.querySelectorAll('.info-header-tab'),
	info = document.querySelector('.info-header'),
	tabContent = document.querySelectorAll('.info-tabcontent'); 

	// скрываем элементы
	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++){
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}

hideTabContent(1);

	// показываем определенные элементы
	function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')){
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}


	// делигирование событий на клик необходимой кнопки
	info.addEventListener('click', function(event) {
		let target = event.target;
		if(target && target.classList.contains('info-header-tab')) {
			for(let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					hideTabContent(0);
					showTabContent(i);
					break;
				}
			}
		}
	});



});