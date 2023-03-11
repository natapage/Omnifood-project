import { Component } from "./сomponent.js";

export class Button extends Component {
  constructor(clickHandler) {
    super({ tag: "button", className: "btn-pref" });
    this.setListener("click", clickHandler);
  }
}
