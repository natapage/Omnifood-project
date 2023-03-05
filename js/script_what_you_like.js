// getIngredients() - принимает массив из объектов с рецептами и возвращает массив из объектов, где есть название ингредиента и статус в зависимости от выбора
// { name, preference: "" } где preference может быть 'include' | 'exclude' | ''

// getRecipies() - принимает json с рецептами и возвращает массив из объектов с рецептами
// filterRecipies() - принимает массив из объектов рецептов и массив из ингредиентов с предпочтениями. И в зависимости от предпочтения фильтрует нужные рецепты

// хочу чтобы работало так: клацаешь на + или - и ингредиент улетает вверх с соответствующим цветом фона( см. скриншот экрана в разделе выше).
// потом если тыкнуть на эту кнопку уже помеченную красным или зеленым , она откинется обратно в список с несделанным выбором (где + и -)

function getIngredients(recipies) {
  const ingredients = [];

  for (const recipe of recipies) {
    ingredients.push(...recipe.ingredients);
  }

  return [...new Set(ingredients)].map((name) => ({ name, preference: "" })); // 'include' | 'exclude' | ''
}

async function getRecipies(path) {
  const response = await fetch(path);
  const recipies = await response.json();

  return recipies.map(({ name, ingredients }) => ({
    name,
    ingredients: new Set(ingredients.map((i) => i.name)), // меняем стуктуру данных на Set для более быстрого поиска в будущем
  }));
}

class Component {
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

  toggleClass(cls) {
    this.element.classList.toggle(cls);
    return this;
  }

  setListener(event, cb) {
    this.element.addEventListener(event, cb);
    return this;
  }
}

class Button extends Component {
  constructor(clickHandler) {
    super({ tag: "button", className: "btn-pref" });
    this.setListener("click", clickHandler);
  }
}

class Ingredient extends Component {
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
        .setContent("-")
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
        .setContent("+")
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

class Ingredients extends Component {
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

class Widget extends Component {
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
    new Ingredients(this.ingredients, () => this.update()).render(this);
    new Recipies(this.filterRecipies()).render(this);
  }
}

class Recipies extends Component {
  constructor(recipies) {
    super({ tag: "ul", className: "pref-list" });
    this.recipies = recipies;
    this.fill();
  }

  fill() {
    this.recipies.forEach((item) => new Recipie(item).render(this));
  }
}

class Recipie extends Component {
  constructor(recipie) {
    super({ tag: "li", className: "pref-recipie" });
    new Component({
      tag: "span",
      content: recipie.name,
      className: "pref-ingredient pref-ingredient__undone",
    }).render(this);
  }
}

const container = document.querySelector(".section-preferences");
const widget = new Widget("data.json");
widget.render(container);
