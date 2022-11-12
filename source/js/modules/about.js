const hideSection = document.querySelector('.about__right-side');
let trigger = null;
let hiddenElement = null;
let trimmedElement = null;
let savedTrimedText = '';

export function initAbouts() {
  if (hideSection) {
    trigger = hideSection.querySelector('.about__trigger');
    hiddenElement = hideSection.querySelector('[data-hide]');
    trimmedElement = hideSection.querySelector('[data-trim]');
    savedTrimedText = trimmedElement ? trimmedElement.innerText : '';
    checkSection();
    window.addEventListener('resize', checkSection);
    trigger.addEventListener('click', () => {
      if (trigger) {
        const isWillBeExpanded = !checkIsExpanded();
        trigger.innerText = isWillBeExpanded ? 'Свернуть' : 'Подробнее';
        trigger.ariaExpanded = String(isWillBeExpanded);

        updateSectionState(isWillBeExpanded);
      }
    });
  }
}


function checkSection() {
  updateSectionState(checkIsExpanded());
}

function updateSectionState(isWillBeExpanded = false) {
  if (hiddenElement && trimmedElement) {
    hiddenElement.hidden = !isWillBeExpanded;

    trimmedElement.innerText = isWillBeExpanded
      ? savedTrimedText
      : getTrimmedText();
  }
}

function getTrimmedText() {
  if (trimmedElement && savedTrimedText) {
    const { trim, trimOn } = trimmedElement.dataset;

    if (trimOn === 'mobile') {
      const isMobile = window.innerWidth < 768;
      return isMobile ? savedTrimedText.slice(0, Number(trim)) : savedTrimedText;
    }
  }
}

function checkIsExpanded() {
  if (trigger) {
    return trigger.ariaExpanded === 'true';
  }
}
