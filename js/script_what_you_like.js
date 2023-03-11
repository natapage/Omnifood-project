// getRecipies() - принимает json с рецептами и возвращает массив из объектов с рецептами

// getIngredients() - принимает массив из объектов с рецептами и возвращает массив из объектов, где есть название ингредиента и статус в зависимости от выбора
// { name, preference: "" } где preference может быть 'include' | 'exclude' | ''

// метод filterRecipies() - принимает массив из объектов рецептов и массив из ингредиентов с предпочтениями. И в зависимости от предпочтения фильтрует нужные рецепты

// хочу чтобы работало так: клацаешь на + или - и ингредиент улетает вверх с соответствующим цветом фона( см. скриншот экрана в разделе выше).
// потом если тыкнуть на эту кнопку уже помеченную красным или зеленым , она откинется обратно в список с несделанным выбором (где + и -)

import { Widget } from "./widget.js";

export async function getRecipies(path) {
  const response = await fetch(path);
  const recipies = await response.json();

  return recipies.map(({ name, ingredients }) => ({
    name,
    ingredients: new Set(ingredients.map((i) => i.name)), // меняем стуктуру данных на Set для более быстрого поиска в будущем
  }));
}

export function getIngredients(recipies) {
  const ingredients = [];

  for (const recipe of recipies) {
    ingredients.push(...recipe.ingredients);
  }

  return [...new Set(ingredients)].map((name) => ({ name, preference: "" })); // 'include' | 'exclude' | ''
}

const container = document.querySelector(".section-preferences");
const widget = new Widget("data.json");
widget.render(container);
