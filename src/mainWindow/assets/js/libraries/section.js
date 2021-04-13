class Section {
  constructor(id, title, parent) {
    this.section = addElement('div', { class: 'section', id: id + '-section' }, '', parent);
    this.head = addElement('div', { class: 'section-header', id: id + '-section-header' }, title, this.section);
    this.body = addElement('div', { class: 'section-body', id: id + '-section-body' }, '', this.section);
    
  }
} 