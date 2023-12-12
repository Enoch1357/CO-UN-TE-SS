#!/usr/bin/node
const nameInput = document.getElementById('name-input');
const categorySelect = document.getElementById('category-select');
const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');

const validateForm = () => {

    const inputs = [nameInput, dateInput, timeInput]

    inputs.forEach(input => {
        input.style.borderColor = "white";
    })
    categorySelect.style.borderColor = "white";

    if (nameInput.value == "" || dateInput.value == "" || timeInput.value == "" || categorySelect.value == "0") {
        inputs.forEach(input => {
            if (input.value == "") {
                input.style.borderColor = "red";
            }
        });

        if (categorySelect.value == "0") {
            categorySelect.style.borderColor = "red";
        }
        return false;
    }
    return true;
}

const resetForm = () => {
    const inputs = [nameInput, dateInput, timeInput];

    inputs.forEach(input => {
        input.value = "";
    });
    categorySelect.value = "0";

}

const getFormInput = () => {
    const name = nameInput.value;
    const category = categorySelect.value;
    const date = dateInput.value;
    const time = timeInput.value;

    const [year, rawMonth, rawDay] = date.split('-');
    const day = rawDay;
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = parseInt(rawMonth) - 1;
    const displayMonth = monthNames[month];
    
    const displayDate = `${day}th ${displayMonth}, ${year}`;

    return {name, category, date, displayDate, time}
}

// Exporting functions into the global scope
export { validateForm, resetForm, getFormInput };