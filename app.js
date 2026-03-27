const amountOfBill = document.getElementById('bill');
const numberOfPeople = document.getElementById('number-of-people');
const tipInputRadios = document.querySelectorAll('input[name="tip"]');
const customInput = document.getElementById('custom-input');
const tipCustom = document.getElementById('tip-custom');
const singleTipDisplay = document.getElementById('single-tip-amount');
const totalDisplay = document.getElementById('total-amount');
const resetButton = document.querySelector('.reset-button');
const form = document.getElementById('calculator-form');

[amountOfBill, ...tipInputRadios, customInput, numberOfPeople].forEach(
	(input) => {
		input.addEventListener('input', calculateTip);
	}
);

customInput.addEventListener('focus', () => {
	tipCustom.checked = true;
});

customInput.addEventListener('input', () => {
	tipCustom.checked = true;
});

// Prevent the label click from interfering with typing
customInput.addEventListener('click', (e) => {
	e.stopPropagation();
});

function calculateTip() {
	const bill = parseFloat(amountOfBill.value) || 0;

	const parsedPeople = parseInt(numberOfPeople.value);
	const people =
		Number.isInteger(parsedPeople) && parsedPeople > 0 ? parsedPeople : 1;

	// Get selected tip percentage
	let tipPercent = 0;
	const selectedTip = document.querySelector('input[name="tip"]:checked');

	if (selectedTip) {
		if (selectedTip.id === 'tip-custom') {
			tipPercent = parseFloat(customInput.value) || 0;
		} else {
			tipPercent = parseFloat(selectedTip.value);
		}
	}

	// Calculate totals
	const tipAmount = (bill * tipPercent) / 100;
	const totalPerPerson = (bill + tipAmount) / people;
	const tipPerPerson = tipAmount / people;

	// Update display
	singleTipDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
	totalDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
}

resetButton.addEventListener('click', function () {
	amountOfBill.value = '';
	numberOfPeople.value = '';
	customInput.value = '';
	tipInputRadios.forEach((radio) => (radio.checked = false));
	singleTipDisplay.textContent = '$0';
	totalDisplay.textContent = '$0';
});
