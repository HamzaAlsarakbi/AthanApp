const statusContainer = document.querySelector('.status-container');
function setStatus(icon, text) {

  // old status draw out animation
  let wrapper = document.querySelector('.status-wrapper');

  wrapper.classList.add('wrapper-draw-out');
  setTimeout( () => {
    statusContainer.removeChild(wrapper);
  }, 300);

  // replace undefined parameters with empty string
  icon.src = icon.src ? icon.src : '';  
  text = text ? text : '';

  let newWrapper = addElement('div', { class: 'status-wrapper' }, '', statusContainer);
  addElement('img', { class: icon.rotate ? 'status-icon rotate' : 'status-icon', src: icon.src }, text, newWrapper);
  addElement('div', { class: 'status-text' }, text, newWrapper);
}