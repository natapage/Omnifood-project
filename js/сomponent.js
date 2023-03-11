export class Component {
  constructor(options) {
    const { tag, content, className } = options;
    this.element = document.createElement(tag);
    this.element.innerText = content || "";
    this.element.className = className || "";
  }

  render(parent) {
    if (parent instanceof Component) {
      parent.element.append(this.element);
    } else {
      parent.append(this.element);
    }
    return this;
  }

  setContent(newContent) {
    this.element.innerText = newContent;
    return this;
  }

  addClass(cls) {
    this.element.classList.add(cls);
    return this;
  }

  removeClass(cls) {
    this.element.classList.remove(cls);
    return this;
  }

  setListener(event, cb) {
    this.element.addEventListener(event, cb);
    return this;
  }
}
