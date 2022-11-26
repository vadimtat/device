import Inputmask from 'inputmask';

const maskPhone = document.querySelectorAll('.phone-us');
export function initMaskPhone() {
  const im = new Inputmask('+7 (999) 999-99-99');
  im.mask(maskPhone);
}

