import Inputmask from 'inputmask';

const maskPhone = document.querySelectorAll('.phone_us');
export function initMaskPhone() {
  const im = new Inputmask('+7 (999) 99-99-999');
  im.mask(maskPhone);
}
