# Macro calculator

A one-page macro and TDEE calculator: height, weight, age, sex, activity, and goal in; daily calories and protein, carb, and fat targets out. Plain HTML, CSS, and JavaScript. No build step, no backend, no accounts.

Open `index.html` in a browser, or serve the folder with any static file server.

## How the numbers are made

- Resting energy: Mifflin-St Jeor.
- Maintenance: resting energy times an activity multiplier (1.2 to 1.9).
- Goal: −500 kcal to lose fat, +300 to build muscle, floored at 1,200 kcal. The floor never goes above maintenance, so a small or sedentary person cutting gets maintenance, not a surplus. The page says when the floor kicks in.
- Protein 1.8 g per kg of body weight, fat 25% of calories, carbs the rest.

Estimates only. Not medical advice.

## Licence

[Fair Core License, FCL-1.0-ALv2](LICENSE.md): use it, read it, change it, and run your own copy; don't sell it as a competing service. Each version becomes Apache 2.0 two years after release.

## Status

A test seed for the HybridSource pipeline. It exists to run a project through the platform once, start to finish. Not a product.
