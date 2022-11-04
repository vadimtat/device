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
const accordions = document.querySelectorAll(".accordion");
const mobileQuery = "(max-width: 767px)";
const mobileMedia = window.matchMedia(mobileQuery);
let openedAccordionOnMobile = false;

const triggerClosePrevHandlers = Array.from(
  { length: accordions.length },
  (_, index) => closePreviousAccordion(index)
);

/* Проверяем мобильный квери */

updateMatches();
mobileMedia.addEventListener("change", updateMatches);

function updateMatches() {
  if (mobileMedia.matches) {
    accordions.forEach((accordion, index) => {
      accordion.open = false;

      const summary = accordion.firstElementChild;
      summary.removeEventListener("click", cancelEvent);
      summary.addEventListener("click", triggerClosePrevHandlers[index]);
    });
  } else {
    openedAccordionOnMobile = false;
    accordions.forEach((accordion, index) => {
      /* По умолчанию открыты, но закрывает на мобильных
       */
      accordion.open = true;

      const summary = accordion.firstElementChild;
      summary.removeEventListener("click", triggerClosePrevHandlers[index]);
      summary.addEventListener("click", cancelEvent);
    });
  }
}

function cancelEvent(evt) {
  evt.preventDefault();
}

function closePreviousAccordion(index) {
  return () => {
    if (
      openedAccordionOnMobile !== false &&
      openedAccordionOnMobile !== index
    ) {
      accordions[openedAccordionOnMobile].open = false;
    }
    openedAccordionOnMobile = index;
  };
}

const hideSection = document.querySelector(".about__right-side");
const trigger = hideSection.querySelector(".about__trigger");
const hiddenElement = hideSection.querySelector("[data-hide]");
const trimmedElement = hideSection.querySelector("[data-trim]");
const savedTrimedText = trimmedElement.innerText;

checkSection();

function checkSection() {
  updateSectionState(checkIsExpanded());
}

window.addEventListener("resize", checkSection);

trigger.addEventListener("click", () => {
  const isWillBeExpanded = !checkIsExpanded();
  trigger.innerText = isWillBeExpanded ? "Свернуть" : "Подробнее";
  trigger.ariaExpanded = String(isWillBeExpanded);

  updateSectionState(isWillBeExpanded);
});

function updateSectionState(isWillBeExpanded = false) {
  hiddenElement.hidden = !isWillBeExpanded;

  trimmedElement.innerText = isWillBeExpanded
    ? savedTrimedText
    : getTrimmedText();
}

function getTrimmedText() {
  const { trim, trimOn } = trimmedElement.dataset;

  if (trimOn === "mobile") {
    const isMobile = window.innerWidth < 768;
    return isMobile ? savedTrimedText.slice(0, Number(trim)) : savedTrimedText;
  }
}

function checkIsExpanded() {
  return trigger.ariaExpanded === "true";
}

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
