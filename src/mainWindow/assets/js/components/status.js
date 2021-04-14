const status = {
  container: document.querySelector('.status-container'),
  text: document.querySelector('.status-text'),
  icon: document.querySelector('.status-icon'),
  wrapper: document.querySelector('.status-wrapper')
}
function setStatus(icon, text) {
  // replace undefined parameters with empty string
  icon.src = icon.src ? icon.src : '';  
  let classListAction = icon.rotate ? 'add' : 'remove';
  text = text ? text : '';

  // old status draw out animation
  status.wrapper.classList.add('wrapper-draw-out');

  // update status
  setTimeout( () => {
    status.text.textContent = text;
    status.icon.src = icon.src;
    status.icon.classList[classListAction]('rotate');
    status.wrapper.classList.remove('status-wrapper-animation');
    setTimeout(() => {
      status.wrapper.classList.add('status-wrapper-animation');
      status.wrapper.classList.remove('wrapper-draw-out');
    }, 200);
  }, 200);
}