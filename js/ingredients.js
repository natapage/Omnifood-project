import { Ingredient } from "./ingredient.js";
import { PhoneContainer } from "./phone-container.js";
import { Component } from "./сomponent.js";

export class Ingredients extends PhoneContainer {
  constructor(ingredients, onChange) {
    super();
    this.ingredients = ingredients;
    this.onChange = onChange;
    this.list = new Component({ tag: "ul", className: "pref-list" }).render(
      this
    );
    this.fill();
  }

  fill() {
    this.ingredients.forEach((item) =>
      new Ingredient(item, this.onChange).render(this.list)
    );
  }
}
