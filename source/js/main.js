import { iosVhFix } from './utils/ios-vh-fix';
import { initModals } from './modules/modals/init-modals';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
  });
});
let footerSection = document.querySelector('.footer-section');
let footerSectionToggle = document.querySelector('.footer-section__toggle');

footerSection.classList.remove('footer-section--nojs');

footerSectionToggle.addEventListener('click', function () {
  if (footerSection.classList.contains('footer-section--closed')) {
    footerSection.classList.remove('footer-section--closed');
    footerSection.classList.add('footer-section--opened');
    footerAddress.classList.remove('footer-address--opened');
    footerAddress.classList.add('footer-address--closed');
  } else {
    footerSection.classList.add('footer-section--closed');
    footerSection.classList.remove('footer-section--opened');
  }
});
let footerAddress = document.querySelector('.footer-address');
let footerAddressToggle = document.querySelector('.footer-address__toggle');

footerAddress.classList.remove('footer-address--nojs');

footerAddressToggle.addEventListener('click', function () {
  if (footerAddress.classList.contains('footer-address--closed')) {
    footerAddress.classList.remove('footer-address--closed');
    footerAddress.classList.add('footer-address--opened');
    footerSection.classList.remove('footer-section--opened');
    footerSection.classList.add('footer-section--closed');
  } else {
    footerAddress.classList.add('footer-address--closed');
    footerAddress.classList.remove('footer-address--opened');
  }
});
let mainModal = document.querySelector('.main-modal');
let mainnavButton = document.querySelector('.main-nav__button');
let maimodalButton = document.querySelector('.main-modal__close-button');
mainnavButton.addEventListener('click', function () {
  if (mainModal.classList.contains('main-modal--closed')) {
    mainModal.classList.remove('main-modal--closed');
    mainModal.classList.add('main-modal--opened');
  } else {
    mainModal.classList.add('main-modal--closed');
    mainModal.classList.remove('main-modal--opened');
  }
})
maimodalButton.addEventListener('click', function () {
  if (mainModal.classList.contains('main-modal--opened')) {
    mainModal.classList.remove('main-modal--opened');
    mainModal.classList.add('main-modal--closed');
  }
  else {
    mainModal.classList.add('main-modal--closed');
    mainModal.classList.remove('main-modal--opened');
  }
});
let aboutExtension = document.querySelector('.about__extension');
let aboutExtensionButton = document.querySelector('.about__button');

aboutExtensionButton.addEventListener('click', function () {
  if (aboutExtension.classList.contains('about__extension--closed')) {
    aboutExtension.classList.remove('about__extension--closed');
    aboutExtension.classList.add('about__extension--opened');
  } else {
    aboutExtension.classList.add('about__extension--closed');
    aboutExtension.classList.remove('about__extension--opened');
  }
});

let aboutButton = document.querySelector('.about__button');
aboutButton.addEventListener('click', function () {
  (aboutButton.innerHTML === 'Подробнее') ? aboutButton.innerHTML = 'Свернуть' : aboutButton.innerHTML = 'Подробнее';
});

const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
  animationTime = 300,
  framesCount = 20;

anchors.forEach(function (item) {
  // каждому якорю присваиваем обработчик события
  item.addEventListener('click', function (e) {
    // убираем стандартное поведение
    e.preventDefault();

    // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
    let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;

    // запускаем интервал, в котором
    let scroller = setInterval(function () {
      // считаем на сколько скроллить за 1 такт
      let scrollBy = coordY / framesCount;

      // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
      // и дно страницы не достигнуто
      if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
        // то скроллим на к-во пикселей, которое соответствует одному такту
        window.scrollBy(0, scrollBy);
      } else {
        // иначе добираемся до элемента и выходим из интервала
        window.scrollTo(0, coordY);
        clearInterval(scroller);
      }
      // время интервала равняется частному от времени анимации и к-ва кадров
    }, animationTime / framesCount);
  });
});
// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
