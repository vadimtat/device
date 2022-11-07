const accordions = document.querySelectorAll('.accordion');
const mobileQuery = '(max-width: 767px)';
const mobileMedia = window.matchMedia(mobileQuery);
let openedAccordionOnMobile = false;

const triggerClosePrevHandlers = Array.from(
  { length: accordions.length },
  (_, index) => closePreviousAccordion(index)
);

/* Проверяем мобильный квери */

updateMatches();
mobileMedia.addEventListener('change', updateMatches);

function updateMatches() {
  if (mobileMedia.matches) {
    accordions.forEach((accordion, index) => {
      accordion.open = false;

      const summary = accordion.firstElementChild;
      summary.removeEventListener('click', cancelEvent);
      summary.addEventListener('click', triggerClosePrevHandlers[index]);
    });
  } else {
    openedAccordionOnMobile = false;
    accordions.forEach((accordion, index) => {
      /* По умолчанию открыты, но закрывает на мобильных
       */
      accordion.open = true;

      const summary = accordion.firstElementChild;
      summary.removeEventListener('click', triggerClosePrevHandlers[index]);
      summary.addEventListener('click', cancelEvent);
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
