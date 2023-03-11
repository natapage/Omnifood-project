import { Component } from "./сomponent.js";
import { Recipie } from "./recipie.js";

export class Recipies extends Component {
  constructor(recipies) {
    super({ tag: "ul", className: "pref-list" });
    this.recipies = recipies;
    this.fill();
  }

  fill() {
    this.recipies.forEach((item) => new Recipie(item).render(this));
  }
}
