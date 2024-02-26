let openModalBtns = document.querySelectorAll('.js-open-modal');
let closModalBtns = document.querySelectorAll('.js-close-modal');
let modal = document.querySelector('.modal');
let modalBg = modal.querySelector('.modal__bg');

// Отркытие модальных окон
openModalBtns.forEach(openModalBtn => {
	openModalBtn.addEventListener('click', (e) => {
		let currentModalName = e.target.dataset['id']
		let currentModal = document.querySelector(`#${currentModalName}`);
		let currentModalCloseBtn = currentModal.querySelector('.js-close-modal');

		modal.classList.add('modal--opened');
		modalBg.setAttribute('data-id', `${currentModalName}`);
		if (currentModalCloseBtn.classList.contains('js-close-modal--form')) {
			modalBg.classList.add('js-close-modal--form')
		}
		currentModal.classList.add("modal__window--visible");
	})
})

//Закрытие модальных окон
closModalBtns.forEach(closModalBtn => {
	closModalBtn.addEventListener('click', (e) => {
		let currentModalName = e.target.dataset['id'];
		let currentModal = document.querySelector(`#${currentModalName}`);
		modal.classList.remove('modal--opened');
		modalBg.removeAttribute('data-id');
		currentModal.classList.remove("modal__window--visible");
		if(closModalBtn.classList.contains('js-close-modal--form')) {
			let currentModalForm = currentModal.querySelector('form');
			let currentAccept = currentModalForm.previousElementSibling;
			currentModalForm.style.display='block';
			currentAccept.classList.remove('accept-msg--visible')
		}
	})
})


//Отбработка клика на кнопку "Отправить"

//Регулярное выражение для емаила
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

//Валидация поля ввода телефона
let phoneInputs = document.querySelectorAll('input[name="phone"]');
let params = new FormData()

let acceptBtns = document.querySelectorAll('.modal__accept-btn');
acceptBtns.forEach(acceptBtn => {
	acceptBtn.addEventListener('click', async ()=> {
		let currentForm = acceptBtn.closest('form');
		let currentAccept = currentForm.previousElementSibling;
		let required = true;
		let currentModal = acceptBtn.closest('.modal__window');
		let currentCloseBtns = currentModal.querySelectorAll('.js-close-modal');
		let closeBgModal = document.querySelector('.modal__bg.js-close-modal')
		//Проверка заполненности полей
		let requiredInputs = currentForm.querySelectorAll('.modal__input');
		requiredInputs.forEach(requiredInput => {
			if (requiredInput.dataset['id'] == 'email') {
				if(!(EMAIL_REGEXP.test(requiredInput.value))) {
					alert('Введён некорректный e-mail!')
					required = false;
					return
				}
			}
			if (requiredInput.dataset['id'] == 'question') {
				if((requiredInput.value).length < 6) {
					alert('Минимальная длинна вопроса - 6 символов!')
					required = false;
					return
				}
			}
			if (requiredInput.dataset['id'] == 'phone') {
				if((requiredInput.value).length > 11) {
					alert('Номер телефона не может быть больше 11 симоволов')
					required = false;
					returncurrentForm
				}
				else if (((requiredInput.value).length < 7) && ((requiredInput.value).length != 0)) {
					alert('Номер телефона не может быть меньше 7 симоволов')
					required = false;
					return
				}
			}
		})
		if (required) {
			let params = new FormData(currentForm)
			// await fetch('#', {
			// 	method: 'post',
			// 	body: params
			// })
			currentForm.style.display = 'none';
			currentForm.reset();
			currentAccept.classList.add('accept-msg--visible');
			currentCloseBtns.forEach(currentCloseBtn => {
				currentCloseBtn.classList.add('js-close-modal--form')
			})
			closeBgModal.classList.add('js-close-modal--form');


		}
	})
})


//Инициализация работы свайперов
const quoteSwiper = new Swiper('.quote-swiper', {
	pagination: {
		el: '.swiper-pagination',
	},
	autoHeight: true,
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween:30,
		},
		1024: {
			slidesPerView: 3,
			spaceBetween:90,
		}
	}
});

const resultsSwiper = new Swiper('.results-swiper', {
	pagination: {
		el: '.swiper-pagination',
	},
	autoHeight: true,
	slidesPerView: 1,
	spaceBetween:30,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	 },
});


// Кнопки, открывающие спойлеры
const spoilerButtons = document.querySelectorAll('.js-spoiler-button');

spoilerButtons.forEach(spoilerButton => {
	spoilerButton.addEventListener('click', () => {
		let currentSpoiler = spoilerButton.closest('.section__spoiler-field');
		let spoilerBody = currentSpoiler.querySelector('.section__spoiler-body')
		spoilerBody.classList.toggle('section__spoiler-body--visible');
		spoilerButton.classList.toggle('section__spoiler-head-button--rotate');
	})
})