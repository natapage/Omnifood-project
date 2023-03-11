import { Component } from "./сomponent.js";
import { Button } from "./button.js";

export class Ingredient extends Component {
  constructor(ingredient, onChange) {
    super({ tag: "li", className: "pref-item" });
    this.ingredient = ingredient;
    const { name, preference } = ingredient;
    if (preference) {
      new Button(() => {
        this.removePreferense();
        onChange();
      })
        .setContent(name)
        .addClass("pref-ingredient")
        .addClass(
          preference === "include" ? "pref-item__include" : "pref-item__exclude"
        )
        .render(this);
    } else {
      new Button(() => {
        this.setExclude();
        onChange();
      })
        .setContent("👎🏻")
        .addClass("pref-item__exclude")
        .render(this);
      new Component({
        tag: "span",
        content: name,
        className: "pref-ingredient pref-ingredient__undone",
      }).render(this);
      new Button(() => {
        this.setInclude();
        onChange();
      })
        .setContent("👍🏻")
        .addClass("pref-item__include")
        .render(this);
    }
  }

  removePreferense() {
    this.ingredient.preference = "";
  }

  setInclude() {
    this.ingredient.preference = "include";
  }

  setExclude() {
    this.ingredient.preference = "exclude";
  }
}
