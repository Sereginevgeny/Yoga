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

		// Слайдер

		let slideIndex = 1,
			 slides = document.querySelectorAll('.slider-item'),
			 prev = document.querySelector('.prev'),
			 next = document.querySelector('.next'),
			 dotsWrap = document.querySelector('.slider-dots'),
			 dots = document.querySelectorAll('.dot');

			 
		
		function showSlides(n) {

			if (n > slides.length) {
				slideIndex = 1;
			}
			if (n < 1) {
				slideIndex = slides.length;
			}

			for (let i = 0; i < slides.length; i++) {
				slides[i].style.display = 'none';
			}
			
			// dots.forEach((item) => item.classList.remove('dot-active'));
			for (let i = 0; i < dots.length; i++) {
				dots[i].classList.remove('dot-active');
			}
	
			slides[slideIndex - 1].style.display = "block";
			dots[slideIndex - 1].classList.add('dot-active');
		}
		
		showSlides(slideIndex);

		function plusSlides(n) {
			showSlides(slideIndex += n);
		}
		function currentSlide(n) {
			showSlides(slideIndex = n);
		}

		prev.addEventListener('click', function() {
			plusSlides(-1);
		});
		next.addEventListener('click', function() {
			plusSlides(1);
		});

		dotsWrap.addEventListener('click', function(event) {
			for (let i = 0; i < dots.length + 1; i++) {
				if (event.target.clasList.contains('dot') && event.target == dots[i-1]) {
					currentSlide(i);
				}
			}
		});


		//Калькулятор рассчитывает стоимость поездки

		let persones = document.querySelectorAll('.counter-block-input')[0],
			 restDays = document.querySelectorAll('.counter-block-input')[1],
			 place = document.getElementById('select'),
			 totalValue = document.getElementById('total'),
			 personsSum = 0,
			 daysSum = 0,
			 total = 0;

		totalValue.innerHTML = 0;

		persones.addEventListener('change', function() {
			personsSum = +this.value;
			total = (daysSum + personsSum) * 4000;

			if(restDays.value == '') {
				totalValue.innerHTML = 0;
			} else {
				totalValue.innerHTML = total;
			}
		});

		restDays.addEventListener('change', function() {
			daysSum = +this.value;
			total = (daysSum + personsSum) * 4000;

			if(persones.value == '') {
				totalValue.innerHTML = 0;
			} else {
				totalValue.innerHTML = total;
			}
		});

		place.addEventListener('change', function() {
			if (restDays.value == '' || persones.value == '') {
				totalValue.innerHTML = 0;
			} else {
				let a = total;
				totalValue.innerHTML = a * this.opion[this.selectedIndex].value;
			}
		});
});