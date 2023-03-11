import { Component } from "./сomponent.js";

export class Recipie extends Component {
  constructor(recipie) {
    super({ tag: "li", className: "pref-recipie" });
    new Component({
      tag: "span",
      content: recipie.name,
      className: "pref-recipie-name",
    }).render(this);
    const ul = new Component({
      tag: "ul",
      className: "pref-recipie-ingredients-list",
    }).render(this);

    Array.from(recipie.ingredients).forEach((item) =>
      new Component({
        tag: "li",
        className: "pref-recipie-ingredient",
        content: item,
      }).render(ul)
    );
  }
}
