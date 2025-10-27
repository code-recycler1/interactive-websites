function showPrompt() {
    let postalCode = prompt('Enter your postal code', 'postal code');
    let text = 'The postal code you entered was: ' + postalCode;
    document.getElementById('divResult').innerHTML = text;
}