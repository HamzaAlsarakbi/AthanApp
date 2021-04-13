class Popup {
  constructor(id, title, icon) {
    // create overlay
    this.overlay = addElement('overlay', {id: id + '-overlay' }, '', document.body);

    // create window
    this.window = addElement('div', { class: 'popup window', id: id + '-window' }, '', this.overlay);

    // create titlebar
    let titlebar = addElement('div', { class: 'title-bar', id: id + '-title-bar' }, '', this.window);

    // create info section
    let info = addElement('div', { class: 'title-bar-item title-bar-info' }, '', titlebar);

    // create icon and text
    let img = addElement('img', { class: 'popup-icon icon', id: id + '-popup-icon', src: icon.src }, '', info);
    if(icon.rotate) img.classList.add('rotate');
    if(icon.height) img.style = `height: ${icon.height}`;
    addElement('div', { class: 'window-title', id: id + '-window-title' }, title, info);

    // create controls
    let controls = addElement('div', { class: 'window-controls controls', id: id + '-window-controls', onclick: `removePopup('${id}')` }, '', titlebar);
    addElement('img', { class: 'window-controls-item window-close', id: id + '-window-close', src: 'assets/img/window_icons/close.png' }, '', controls);

    // create window body
    this.body = addElement('div', { class: 'window-body', id: id + '-window-body' }, '', this.window);
    document.body.addEventListener('keydown', popupHandler);
  }
  removePopup() {
    this.window.classList.add('popup-draw-out');
    this.overlay.classList.add('popup-draw-out');
    setTimeout(() => {
      document.body.removeChild(this.overlay);
    }, 200);
  }
}

function removePopup(id) {
  let window = document.querySelector('#' + id + '-window');
  let overlay = document.querySelector('#' + id + '-overlay');
  window.classList.add('popup-draw-out');
  overlay.classList.add('popup-draw-out');
  setTimeout(() => {
    document.body.removeChild(overlay);
  }, 200);
}

function popupHandler(e) {
  // remove popup then remove event listener
  if(e.code == 'Escape') {
    removePopup(document.querySelector('overlay').id.replace('-overlay', ''));
    document.body.removeEventListener('keydown', popupHandler)
  }
}