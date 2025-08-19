// Інтерактивність для інтерфейсу та базові розрахунки на клієнті

document.addEventListener('DOMContentLoaded', () => {
// Перемикач статі
const genderBtns = document.querySelectorAll('.gender-btn');
let gender = 'female';
genderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        genderBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        gender = btn.dataset.gender;
    });
});

// Слайдери та відображення значень
const birthYearSlider = document.getElementById('birthYearSlider');
const birthYearValue = document.getElementById('birthYearValue');
birthYearValue.textContent = birthYearSlider.value;
birthYearSlider.addEventListener('input', () => {
    birthYearValue.textContent = birthYearSlider.value;
});

const heightSlider = document.getElementById('heightSlider');
const heightValue = document.getElementById('heightValue');
heightValue.textContent = heightSlider.value + ' см';
heightSlider.addEventListener('input', () => {
    heightValue.textContent = heightSlider.value + ' см';
});

const weightSlider = document.getElementById('weightSlider');
const weightValue = document.getElementById('weightValue');
weightValue.textContent = weightSlider.value + ' кг';
weightSlider.addEventListener('input', () => {
    weightValue.textContent = weightSlider.value + ' кг';
});

const bodyFatSlider = document.getElementById('bodyFatSlider');
const bodyFatValue = document.getElementById('bodyFatValue');
bodyFatValue.textContent = bodyFatSlider.value + '%';
bodyFatSlider.addEventListener('input', () => {
    bodyFatValue.textContent = bodyFatSlider.value + '%';
});

// Вибір типу тіла
const bodyTypes = document.querySelectorAll('.body-type');
let bodyType = 'mesomorph';
bodyTypes.forEach(type => {
    type.addEventListener('click', () => {
        bodyTypes.forEach(t => t.classList.remove('selected'));
        type.classList.add('selected');
        bodyType = type.dataset.type;
    });
});

// Вибір рівня активності
const activityLevelSelect = document.getElementById('activityLevel');

// Вибір мети (поки в UI нема, якщо буде - додавай)

// Кнопка розрахунку
const calculateBtn = document.getElementById('calculateBtn');
const resultsPanel = document.getElementById('resultsPanel');

// Результати
const bmrValue = document.getElementById('bmrValue');
const bmrKjValue = document.getElementById('bmrKjValue');
const bmiValue = document.getElementById('bmiValue');
const bmiStatus = document.getElementById('bmiStatus');
const caloriesValue = document.getElementById('caloriesValue');
const caloriesKjValue = document.getElementById('caloriesKjValue');
const proteinAmount = document.getElementById('proteinAmount');
const carbsAmount = document.getElementById('carbsAmount');
const fatsAmount = document.getElementById('fatsAmount');
const fiberAmount = document.getElementById('fiberAmount');

function calculateBMR(weight, height, age, gender) {
    // Формула Харріса-Бенедикта
    if (gender === 'male') {
        return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
}

function calculateBMI(weight, height) {
    // Вага у кг, зріст у см -> BMI
    return weight / ((height / 100) ** 2);
}

function bmiCategory(bmi) {
    if (bmi < 18.5) return {text: 'Недостатня вага', className: 'warning'};
    if (bmi < 25) return {text: 'Нормальна вага', className: 'normal'};
    if (bmi < 30) return {text: 'Надмірна вага', className: 'overweight'};
    return {text: 'Ожиріння', className: 'obese'};
}

function toKJ(calories) {
    return (calories * 4.184).toFixed(0);
}

function calculateMacros(calories) {
    // У відсотках за замовчуванням для мети набору м’язової маси
    // білки 30%, вуглеводи 45%, жири 25%, клітковина - фіксовано 35г
    const proteinPercent = 30;
    const carbsPercent = 45;
    const fatsPercent = 25;
    const fiberGrams = 35;

    // 1 г білків = 4 ккал, вуглеводів = 4 ккал, жирів = 9 ккал
    const proteinGrams = ((calories * proteinPercent / 100) / 4).toFixed(0);
    const carbsGrams = ((calories * carbsPercent / 100) / 4).toFixed(0);
    const fatsGrams = ((calories * fatsPercent / 100) / 9).toFixed(0);

    return {
        protein: {grams: proteinGrams, percent: proteinPercent},
        carbs: {grams: carbsGrams, percent: carbsPercent},
        fats: {grams: fatsGrams, percent: fatsPercent},
        fiber: fiberGrams
    };
}

calculateBtn.addEventListener('click', () => {
    const weight = +weightSlider.value;
    const height = +heightSlider.value;
    const age = new Date().getFullYear() - +birthYearSlider.value;
    const activity = +activityLevelSelect.value;

    // Розрахунок BMR
    let bmr = calculateBMR(weight, height, age, gender);
    let totalCalories = bmr * activity;

    // BMI
    let bmi = calculateBMI(weight, height);
    let bmiCat = bmiCategory(bmi);

    // Макроси
    let macros = calculateMacros(totalCalories);

    // Показати панель результатів
    resultsPanel.style.display = 'flex';

    // Відображення результатів
    bmrValue.textContent = Math.round(bmr) + ' ккал';
    bmrKjValue.textContent = toKJ(bmr) + ' кДж';
    bmiValue.textContent = bmi.toFixed(1);
    bmiStatus.textContent = bmiCat.text;
    bmiStatus.className = 'bmi-status ' + bmiCat.className;
    caloriesValue.textContent = Math.round(totalCalories) + ' ккал';
    caloriesKjValue.textContent = toKJ(totalCalories) + ' кДж';

    proteinAmount.textContent = `${macros.protein.grams} г (${macros.protein.percent}%)`;
    carbsAmount.textContent = `${macros.carbs.grams} г (${macros.carbs.percent}%)`;
    fatsAmount.textContent = `${macros.fats.grams} г (${macros.fats.percent}%)`;
    fiberAmount.textContent = `${macros.fiber} г`;
});
});