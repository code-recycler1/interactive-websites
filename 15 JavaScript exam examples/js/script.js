// --- CACHE ALERT ELEMENTS ---
// These three panels are shown/hidden depending on validation outcome
const errorAlert = document.querySelector('#errorAlert');
const paymentAlert = document.querySelector('#paymentAlert');
const successAlert = document.querySelector('#successAlert');

// --- PROVINCE DATA ---
// Each array contains the provinces for its country, sorted alphabetically on load
const belgium = ['Antwerp', 'East Flanders', 'Flemish Brabant', 'Hainaut',
    'Liège', 'Limburg', 'Luxembourg', 'Namur',
    'Walloon Brabant', 'West Flanders'];

const netherlands = ['Drenthe', 'Flevoland', 'Friesland', 'Gelderland', 'Groningen',
    'Limburg', 'North Brabant', 'North Holland', 'Overijssel',
    'South Holland', 'Utrecht', 'Zeeland'];

// --- HIDE ALL ALERTS ON PAGE LOAD ---
// Alerts are invisible until validateForm() decides which ones to show
errorAlert.style.display = 'none';
paymentAlert.style.display = 'none';
successAlert.style.display = 'none';

// --- validateCountry() ---
// Called by the country dropdown's onchange event.
// Clears and repopulates the province dropdown based on the selected country.
function validateCountry() {
    const countryValue = document.getElementById('country').value;
    const provinceSelect = document.getElementById('province');

    // Clear all existing options first
    provinceSelect.innerHTML = '';

    // Always add the placeholder option at the top
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Choose a province';
    provinceSelect.appendChild(placeholder);

    // Select the correct province array based on the chosen country
    let provinces = [];
    if (countryValue === 'Belgium') {
        provinces = [...belgium].sort(); // sort a copy — don't mutate the original
    } else if (countryValue === 'Netherlands') {
        provinces = [...netherlands].sort();
    }

    // Create an <option> element for each province and append it to the select
    provinces.forEach(province => {
        const opt = document.createElement('option');
        opt.value = province;
        opt.textContent = province;
        provinceSelect.appendChild(opt);
    });
}

// --- showAlerts() ---
// Decides which combination of alerts to display based on whether errors exist.
// Called at the end of validateForm() after all checks have run.
function showAlerts() {
    if (errors.length === 0) {
        // No errors — show payment confirmation and success message
        errorAlert.style.display = 'none';
        paymentAlert.style.display = 'block';
        successAlert.style.display = 'block';
    } else {
        // Errors found — show only the error list
        errorAlert.style.display = 'block';
        paymentAlert.style.display = 'none';
        successAlert.style.display = 'none';
    }
}

// --- validateForm() ---
// Main entry point — called when the submit button is clicked.
// Collects all field values, runs every validation check,
// then displays the appropriate alerts.
function validateForm() {

    // Reset the errors array at the start of every validation run
    errors = [];

    // Read every form field value once and store in local variables
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeatPassword').value;
    const address = document.getElementById('address').value;
    const country = document.getElementById('country').value;
    const province = document.getElementById('province').value;
    const postalCode = document.getElementById('postalCode').value;
    // getElementsByName returns a NodeList of all radio buttons in the "paymentMethod" group
    const paymentMethodRadios = document.getElementsByName('paymentMethod');

    // --- EMPTY FIELD CHECKS ---
    // Each call adds a message to `errors` if the field is empty
    checkEmptyField(firstName, 'The first name field is required.');
    checkEmptyField(lastName, 'The last name field is required.');
    checkEmptyField(username, 'The username field is required.');
    checkEmptyField(address, 'The address field is required.');
    checkEmptyField(country, 'The country field is required.');
    checkEmptyField(province, 'The province field is required.');

    // --- EMAIL VALIDATION ---
    // Only validate format if the field is not empty (empty is caught above)
    if (email === '') {
        errors.push('The email field is required.');
    } else if (!validateEmail(email)) {
        errors.push('Email address is incorrect.');
    }

    // --- PASSWORD VALIDATION ---
    validatePasswords(password, repeatPassword);

    // --- PAYMENT METHOD ---
    // Always runs — shows the selected method in the blue alert
    validatePaymentMethod(paymentMethodRadios);

    // --- POSTAL CODE ---
    validatePostalCode(postalCode);

    // --- TERMS AND CONDITIONS ---
    validateTermsAndConditions();

    // --- DISPLAY RESULTS ---
    showAlerts();

    // Resize the form and alerts columns now that the alerts panel is visible.
    // Replaces the full-width col-12 with col-lg-8 to make room for the alerts.
    document.getElementById('form').classList.replace('col-12', 'col-lg-8');
    document.getElementById('alerts').classList.replace('col', 'col-lg-4');

    // Render error messages as list items in the error alert panel
    const errorList = document.getElementById('errorText');
    errorList.innerHTML = errors
        .map(err => `<li class="list-group-item list-group-item-danger border-0">${err}</li>`)
        .join('');

    console.log(errors);
}

// --- checkEmptyField() ---
// Checks whether `field` is an empty string.
// If so, pushes `message` into the global `errors` array.
// Called with a field value and a descriptive error message.
function checkEmptyField(field, message) {
    if (field === '') {
        errors.push(message);
    }
}

// --- validateEmail() ---
// Tests the email address against a regex pattern.
// Returns true if valid, false if not.
// The regex checks for:
//   - Username: at least one char, letters/numbers/underscores allowed,
//     dots/hyphens allowed but not as the first character
//   - Domain: starts with letter or number, may contain dots or hyphens
function validateEmail(emailAddress) {
    // Regex breakdown:
    // ^[a-zA-Z0-9]         — username must start with a letter or number
    // [a-zA-Z0-9._-]*      — followed by letters, numbers, dots, underscores, or hyphens
    // @                    — literal @ symbol
    // [a-zA-Z0-9]          — domain must start with a letter or number
    // [a-zA-Z0-9.-]+       — followed by letters, numbers, dots, or hyphens
    // \.[a-zA-Z]{2,}$      — must end with a dot and at least 2 letters (TLD)
    const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._-]*@[a-zA-Z0-9][a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(emailAddress);
}

// --- validatePasswords() ---
// Checks both password fields — called with the two password values.
// Adds up to two messages to `errors`:
//   - If either field is empty (checked before this via checkEmptyField)
//   - If the password is shorter than 8 characters
//   - If the two passwords don't match
function validatePasswords(field1, field2) {
    if (field1 === '') {
        errors.push('The password field is required.');
    } else if (field2 === '') {
        errors.push('The repeat password field is required.');
    } else if (field1.length < 8) {
        errors.push('Your password must be at least 8 characters long.');
    } else if (field1 !== field2) {
        errors.push('Your passwords do not match.');
    }
}

// --- validatePaymentMethod() ---
// Iterates over the radio NodeList to find the checked option.
// Writes the selected payment method into the blue payment alert paragraph.
// A radio group always has one option checked, so betaling will always be set.
function validatePaymentMethod(field) {
    let selectedPayment = '';

    field.forEach(radio => { radio.checked ? selectedPayment = radio.value : null; });

    document.getElementById('paymentText').textContent =
        `Your payment method is: ${selectedPayment}.`;
}

// --- validatePostalCode() ---
// Validates the postal code field.
// - Empty: adds "The postal code field is required."
// - Out of range: adds "The postal code value must be between 1000 and 9999."
// Valid range is 1000–9999 inclusive.
function validatePostalCode(field) {
    if (field === '') {
        errors.push('The postal code field is required.');
    } else if (parseInt(field) < 1000 || parseInt(field) > 9999) {
        errors.push('The postal code value must be between 1000 and 9999.');
    }
}

// --- validateTermsAndConditions() ---
// Checks whether the terms and conditions checkbox is ticked.
// Adds a message to `errors` if not checked — acceptance is mandatory.
function validateTermsAndConditions() {
    if (!document.getElementById('terms').checked) {
        errors.push('You must accept the general terms and conditions.');
    }
}