// Mifflin-St Jeor resting energy, in kcal per day.
function bmr({ weight, height, age, sex }) {
  const base = 10 * weight + 6.25 * height - 5 * age;
  return sex === "male" ? base + 5 : base - 161;
}

// Lowest daily intake the calculator will suggest.
const FLOOR = 1200;

// Daily targets. Protein is fixed per kg of body weight, fat is a share of
// calories, carbs take whatever is left. The floor never rises above
// maintenance, so a deficit can shrink to zero but never turn into a surplus.
function targets(input) {
  const resting = bmr(input);
  const tdee = resting * input.activity;
  const floor = Math.min(FLOOR, tdee);
  const floored = tdee + input.goal < floor;
  const calories = floored ? floor : tdee + input.goal;
  const protein = 1.8 * input.weight;
  const fat = (calories * 0.25) / 9;
  const carbs = Math.max(0, (calories - protein * 4 - fat * 9) / 4);
  return { resting, tdee, calories, protein, fat, carbs, floored };
}

function readForm(form) {
  const data = new FormData(form);
  const num = (name) => Number(data.get(name));
  const input = {
    height: num("height"),
    weight: num("weight"),
    age: num("age"),
    sex: data.get("sex"),
    activity: num("activity"),
    goal: num("goal"),
  };
  const problems = [];
  if (!(input.height >= 100 && input.height <= 250)) problems.push("height between 100 and 250 cm");
  if (!(input.weight >= 30 && input.weight <= 300)) problems.push("weight between 30 and 300 kg");
  if (!(input.age >= 14 && input.age <= 100)) problems.push("age between 14 and 100");
  return { input, problems };
}

const form = document.getElementById("calc");
const error = document.getElementById("error");
const results = document.getElementById("results");
const floorNote = document.getElementById("floor-note");
const show = (id, value) => {
  document.getElementById(id).textContent = Math.round(value).toLocaleString();
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const { input, problems } = readForm(form);
  if (problems.length) {
    error.textContent = "Enter a " + problems.join(", ") + ".";
    error.hidden = false;
    results.hidden = true;
    return;
  }
  error.hidden = true;
  const t = targets(input);
  show("bmr", t.resting);
  show("tdee", t.tdee);
  show("calories", t.calories);
  show("protein", t.protein);
  show("carbs", t.carbs);
  show("fat", t.fat);
  floorNote.hidden = !t.floored;
  if (t.floored) {
    floorNote.textContent = t.calories < FLOOR
      ? "Your maintenance is under " + FLOOR.toLocaleString() + " kcal, so the target stays at maintenance instead of cutting further."
      : "Held at the " + FLOOR.toLocaleString() + " kcal minimum, so the deficit is smaller than 500 kcal.";
  }
  results.hidden = false;
});
