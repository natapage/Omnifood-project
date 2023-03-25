import { Component } from "./сomponent.js";
import { Recipie } from "./recipie.js";
import { PhoneContainer } from "./phone-container.js";

export class Recipies extends PhoneContainer {
  constructor(recipies) {
    super();
    this.recipies = recipies;
    this.list = new Component({ tag: "ul", className: "pref-list" }).render(
      this
    );
    this.fill();
  }

  fill() {
    if (this.recipies.length === 0) {
      const apology = new Component({
        tag: "div",
        content: "Sorry we don't have meals for you",
        className: "apology",
      });
      apology.render(this.list);
    }
    this.recipies.forEach((item) => new Recipie(item).render(this.list));
  }
}
