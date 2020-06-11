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


	let deadLine = '2020-06-12';

	function getTimeReamaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()),
			 seconds = Math.floor( ( t/1000 ) % 60 ),
			 minutes = Math.floor(( t/1000/60 ) % 60 ),
			 hours = Math.floor(( t/ ( 1000*60*60 ) ));

		return {
			'total' : t,
			'hours' : hours,
			'minutes' : minutes,
			'seconds' : seconds
		};
	}
   
	function setClock(id, endtime) { // берет переменные с страницы
		let timer = document.getElementById(id),
			 hours = timer.querySelector('.hours'),
			 minutes = timer.querySelector('.minutes'),
			 seconds = timer.querySelector('.seconds'),
			 timeInterval = setInterval(updateClock, 1000);
		
		function updateClock () {
			let t = getTimeReamaining(endtime); //получает разницу между временем
				 hours.textContent = t.hours;
				 minutes.textContent = t.minutes;
				 seconds.textContent = t.seconds;

				 if (t.total <= 0 ) {
					 clearInterval(timeInterval);
				 }
			}

	}

	setClock('timer', deadLine);

	// модальное окно

		let more = document.querySelector('.more'),
			 overlay = document.querySelector('.overlay'),
			 close = document.querySelector('.popup-close');

			more.addEventListener('click', function(){
				overlay.style.display = 'block';
				this.classList.add('more-splash');
				document.body.style.overflow = 'hidden';
			});
			
			close.addEventListener('click', function(){
				overlay.style.display = 'none';
				more.classList.remove('more-splahs');
				document.body.style.overflow = '';
			});

});