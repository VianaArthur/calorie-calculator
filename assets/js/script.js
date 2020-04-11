const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);
form.addEventListener("reset", handleReset);

function handleSubmit(event) {
  event.preventDefault();

  const gender = getSelectedValue("gender");
  const age = getInputNumberValue("age");
  const weight = getInputNumberValue("weight");
  const height = getInputNumberValue("height");
  const activityLevel = getSelectedValue("activity_level");

  if (validateForm()) {
    getCalorieResult(gender, age, weight, height, activityLevel);
  }
}

function handleReset() {
  const result = document.getElementById("result");
  result.innerHTML = "";
}

function getSelectedValue(id) {
  const select = document.getElementById(id);
  return select.options[select.selectedIndex].value;
}

function getInputNumberValue(id) {
  return Number(document.getElementById(id).value);
}

function validateForm() {
  // TODO
  return true;
}

function getCalorieResult(gender, age, weight, height, activityLevel) {
  // Result fields do be displayed in result-container
  const bmr = Math.round(
    gender === "female"
      ? 655 + 9.6 * weight + 1.8 * height - 4.7 * age
      : 66 + 13.7 * weight + 5 * height - 6.8 * age
  );

  const maintenance = Math.round(bmr * Number(activityLevel));
  const loseWeight = maintenance - 450;
  const gainWeight = maintenance + 450;

  const layout = `
    <h2>Here's your result:</h2>
    <div class="result-content">
        <ul>
            <li>
            &bull; Your Basal Metabolic Rate is <strong> ${bmr} calories</strong>.
            </li>
            <li>
            &bull; To maintain your weight, you need to consume on average <strong> ${maintenance} calories</strong>.
            </li>
            <li>
            &bull; To loose weight, you need to consume on average<strong> ${loseWeight} calories</strong>.
            </li>
            <li>
            &bull; To gain weight, you need to consume on average<strong> ${gainWeight} calories</strong>.
            </li>
        </ul>
    </div>
    `;

  const result = document.getElementById("result");
  result.innerHTML = layout;
  result.scrollIntoView();
}
