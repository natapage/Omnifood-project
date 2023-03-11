import { Ingredient } from "./ingredient.js";
import { Component } from "./сomponent.js";

export class Ingredients extends Component {
  constructor(ingredients, onChange) {
    super({ tag: "ul", className: "pref-list" });
    this.ingredients = ingredients;
    this.onChange = onChange;
    this.fill();
  }

  fill() {
    this.ingredients.forEach((item) =>
      new Ingredient(item, this.onChange).render(this)
    );
  }
}
