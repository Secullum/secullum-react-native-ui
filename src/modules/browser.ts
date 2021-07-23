import { Platform } from 'react-native';

export function ehIE() {
  return /MSIE|Trident\//.test(navigator.userAgent);
}

export function setDatePickerColor(color: string) {
  if (['ios', 'android'].includes(Platform.OS)) {
    return;
  }

  const STYLE_ID = 'custom-datepicker-color';

  removeElements(`style#${STYLE_ID}`);

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.innerHTML = `
  .rdrMonthAndYearWrapper {
    background-color: ${color};
  }

  .rdrDayToday .rdrDayNumber span:after {
    background: ${color}
  }

  .rdrSelected,
  .rdrInRange,
  .rdrStartEdge,
  .rdrEndEdge {
    background: ${color};
  }

  .rdrDay {
    color: ${color} !important;
  }

  .rdrDayStartPreview,
  .rdrDayInPreview,
  .rdrDayEndPreview {
    border: 0px solid ${color};
  }
  `;

  document.body.appendChild(style);
}

function removeElements(query: string) {
  const elements = document.querySelectorAll(query);

  if (elements) {
    elements.forEach(el => el.remove());
  }
}
