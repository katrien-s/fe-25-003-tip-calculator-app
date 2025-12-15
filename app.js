const amountOfBill = document.getElementById('bill');
const numberOfPeople = document.getElementById('number-of-people');
const tipInputRadios = document.querySelectorAll('input[name="tip"]');
const customTipInput = document.getElementById('custom-input');
const singleTipDisplay = document.getElementById('single-tip-amount');
const totalDisplay = document.getElementById('total-amount');
const resetButton = document.querySelector('.reset-button');

[amountOfBill, ...tipInputRadios, customTipInput, numberOfPeople].forEach(
	(input) => {
		input.addEventListener('input', calculateTip);
	}
);

customTipInput.addEventListener('focus', function () {
	document.getElementById('tip-custom').checked = true;
	calculateTip();
});

function calculateTip() {
	const bill = parseFloat(amountOfBill.value) || 0;
	const people = parseInt(numberOfPeople.value) || 1;

	// Get selected tip percentage
	let tipPercent = 0;
	const selectedTip = document.querySelector('input[name="tip"]:checked');

	if (selectedTip) {
		if (selectedTip.id === 'tip-custom') {
			tipPercent = parseFloat(customTipInput.value) || 0;
		} else {
			tipPercent = parseFloat(selectedTip.value);
		}
	}

	// Calculate totals
	const tipAmount = (bill * tipPercent) / 100;
	const totalPerPerson = (bill + tipAmount) / people;
	const tipPerPerson = tipAmount / people;

	console.log(tipAmount, totalPerPerson, tipPerPerson);

	// Update display
	singleTipDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
	totalDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
}

resetButton.addEventListener('click', function () {
	amountOfBill.value = '';
	numberOfPeople.value = '';
	customTipInput.value = '';
	tipInputRadios.forEach((radio) => (radio.checked = false));
	singleTipDisplay.textContent = '$0.00';
	totalDisplay.textContent = '$0.00';
});
