// getIngredients() - принимает массив из объектов с рецептами и возвращает массив из объектов, где есть название ингредиента и статус в зависимости от выбора
// { name, preference: "" } где preference может быть 'include' | 'exclude' | ''

// getRecipies() - принимает json с рецептами и возвращает массив из объектов с рецептами
// filterRecepies() - принимает массив из объектов рецептов и массив из ингредиентов с предпочтениями. И в зависимости от предпочтения фильтрует нужные рецепты

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

function filterRecepies(recipies, ingredients) {
  const activePrefs = ingredients.reduce(
    (acc, ingredient) => {
      const { preference, name } = ingredient;
      if (preference) {
        acc[preference].push(name);
      }
      return acc;
    },
    { include: [], exclude: [] }
  );

  return recipies.filter(
    (recipe) =>
      activePrefs.include.every((ingredient) =>
        recipe.ingredients.has(ingredient)
      ) &&
      activePrefs.exclude.every(
        (ingredient) => !recipe.ingredients.has(ingredient)
      )
  );
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
  constructor(ingredients) {
    super({ tag: "ul", className: "pref-list" });
    this.ingredients = ingredients;
    this.fill();
  }

  sort() {
    this.ingredients.sort((a, b) => !!b.preference - !!a.preference);
  }

  fill() {
    this.ingredients.forEach((item) =>
      new Ingredient(item, () => this.update()).render(this)
    );
  }

  update() {
    this.element.innerHTML = "";
    this.sort();
    this.fill();
  }
}

async function init() {
  const recipies = await getRecipies("data.json");
  const ingredients = getIngredients(recipies);

  const container = document.querySelector(".section-preferences");
  let list = new Ingredients(ingredients);
  list.render(container);
}

init();
