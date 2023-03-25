import { getRecipies } from "./script_what_you_like.js";
import { getIngredients } from "./script_what_you_like.js";
import { Ingredients } from "./ingredients.js";
import { Recipies } from "./recipies.js";
import { Component } from "./сomponent.js";

export class Widget extends Component {
  constructor(path) {
    super({ tag: "div", className: "pref-widget" });
    this.path = path;
    this.init();
  }

  async init() {
    this.recipies = await getRecipies(this.path);
    this.ingredients = getIngredients(this.recipies);
    this.update();
  }

  sortIngredients() {
    this.ingredients.sort((a, b) => !!b.preference - !!a.preference);
  }

  filterRecipies() {
    const activePrefs = this.ingredients.reduce(
      (acc, ingredient) => {
        const { preference, name } = ingredient;
        if (preference) {
          acc[preference].push(name);
        }
        return acc;
      },
      { include: [], exclude: [] }
    );

    return this.recipies.filter(
      (recipe) =>
        activePrefs.include.every((ingredient) =>
          recipe.ingredients.has(ingredient)
        ) &&
        activePrefs.exclude.every(
          (ingredient) => !recipe.ingredients.has(ingredient)
        )
    );
  }

  update() {
    this.element.innerHTML = "";

    this.sortIngredients();
    // new Screen().render(this);
    // new Screen().render(this);
    new Ingredients(this.ingredients, () => this.update()).render(this);
    new Recipies(this.filterRecipies()).render(this);
  }
}
