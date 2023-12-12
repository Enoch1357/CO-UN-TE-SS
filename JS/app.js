#!/usr/bin/node
// Imported functions from 'utility.js' module
import { validateForm, resetForm, getFormInput } from "./utility.js";

const nameInput = document.getElementById('name-input');
const categorySelect = document.getElementById('category-select');
const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const startCountButton = document.getElementById('start-count');
const displaySection = document.getElementById('display-section');
const form = document.querySelector('.input-form');
const delModal = document.getElementById('del-modal');
const deleteMessage = document.getElementById('delete-message');
const cancelDel = document.getElementById('cancel-del');
const delDel = document.getElementById('del-del');
const congratsModal = document.getElementById('congrats-modal');
const congratsMessage = document.getElementById('congrats-message');

let events = JSON.parse(localStorage.getItem('events'));
let currentPosition = 0;

const createEventCard = (Event, itemPosition) => {
    // Dynamic event creation

    const outerBox = document.createElement('div');
    outerBox.setAttribute('id', 'outer-box');

    if (Event.category == "Birthday") {
        outerBox.style.background = "radial-gradient(227.6% 142.85% at 97.39% 2.29%, #69BDB3 0%, rgba(146, 199, 193, 0.63) 30.82%, rgba(114, 192, 182, 0.92) 80.93%, rgba(217, 217, 217, 0.00) 100%)";
    } else if (Event.category == "Holiday") {
        outerBox.style.background = "linear-gradient(242deg, #9369BD -98.55%, rgba(169, 146, 199, 0.63) 5.6%, rgba(139, 114, 192, 0.92) 65%, rgba(194, 179, 208, 0.00) 103.55%)";
    } else if (Event.category == "Business") {
        outerBox.style.background = "linear-gradient(242deg, #52B962 -98.55%, rgba(128, 203, 149, 0.63) 5.6%, rgba(92, 195, 133, 0.92) 65%, rgba(132, 211, 164, 0.00) 103.55%)";
    }

    const innerBox = document.createElement('div');
    innerBox.setAttribute('id', 'inner-box');
    
    const eventDisplay = document.createElement('p');
    eventDisplay.setAttribute('id', 'event-display');
    eventDisplay.textContent = `${Event.name}`;
    innerBox.appendChild(eventDisplay);

    const categoryDisplay = document.createElement('p');
    categoryDisplay.setAttribute('id', 'category-display');
    categoryDisplay.textContent = `${Event.category}`;
    innerBox.appendChild(categoryDisplay);

    const outerCircle = document.createElement('div');
    outerCircle.setAttribute('id', 'outer-circle');

    if (Event.category == "Birthday") {
        outerCircle.style.background = "radial-gradient(79.58% 76.69% at 62.44% 27.88%, #86EAC0 0%, rgba(224, 191, 127, 0.17) 26.54%, rgba(127, 224, 189, 0.18) 26.55%, rgba(111, 181, 164, 0.82) 78.09%, rgba(130, 229, 205, 0.82) 86.1%, rgba(149, 208, 194, 0.09) 99.99%, rgba(125, 218, 196, 0.00) 100%)";
    } else if (Event.category == "Holiday") {
        outerCircle.style.background = "radial-gradient(79.58% 76.69% at 62.44% 27.88%, #BE86EA 0%, rgba(224, 191, 127, 0.17) 26.54%, rgba(187, 127, 224, 0.18) 26.55%, rgba(154, 111, 181, 0.82) 78.09%, rgba(180, 130, 229, 0.82) 93.63%, rgba(149, 208, 194, 0.09) 99.99%, rgba(177, 125, 218, 0.00) 100%)";
    } else if (Event.category == "Business") {
        outerCircle.style.background = "radial-gradient(79.58% 76.69% at 62.44% 27.88%, #86EAB4 0%, rgba(224, 191, 127, 0.17) 26.54%, rgba(127, 224, 166, 0.18) 26.55%, rgba(111, 181, 139, 0.82) 78.09%, rgba(130, 229, 182, 0.82) 93.63%, rgba(149, 208, 194, 0.09) 99.99%, rgba(125, 218, 168, 0.00) 100%)";
    }
    
    const innerCircle = document.createElement('div');
    innerCircle.setAttribute('id', 'inner-circle');

    const dateDisplay = document.createElement('p');
    dateDisplay.setAttribute('id', 'date-display');
    dateDisplay.textContent = `${Event.displayDate}`;
    innerCircle.appendChild(dateDisplay);
    
    const countdown = document.createElement('p');
    countdown.setAttribute('id', 'countdown');
    innerCircle.appendChild(countdown);

    const labelDiv = document.createElement('div');
    labelDiv.setAttribute('id', 'label-div');
    
    const days = document.createElement('p');
    days.textContent = 'Days';

    const hours = document.createElement('p');
    hours.textContent = 'Hours';
    
    const minutes = document.createElement('p');
    minutes.textContent = 'Minutes';
    
    const seconds = document.createElement('p');
    seconds.textContent = 'Seconds';
    
    labelDiv.appendChild(days);
    labelDiv.appendChild(hours);
    labelDiv.appendChild(minutes);
    labelDiv.appendChild(seconds);
    
    innerCircle.appendChild(labelDiv);
    outerCircle.appendChild(innerCircle);
    innerBox.appendChild(outerCircle);
    
    const resetButton = document.createElement('img');
    resetButton.setAttribute('src', './Assets/reset.png');
    resetButton.setAttribute('alt', 'Reset');
    resetButton.setAttribute('id', 'reset');
    resetButton.setAttribute('title', 'Edit');
    innerBox.appendChild(resetButton);

    resetButton.addEventListener('click', function() {
        nameInput.value = Event.name
        categorySelect.value = Event.category
        dateInput.value = Event.date
        timeInput.value = Event.time

        startCountButton.textContent = "Resume Countdown";

        currentPosition = itemPosition;

        form.scrollIntoView({behavior:"smooth"});
    })
    
    const delButton = document.createElement('img');
    delButton.setAttribute('src', './Assets/delete.png');
    delButton.setAttribute('alt', 'Del');
    delButton.setAttribute('id', 'delete');
    delButton.setAttribute('title', 'Remove');
    innerBox.appendChild(delButton);

    delButton.addEventListener('click', function() {
        
        
        deleteMessage.textContent = `Are you sure you want to remove ${Event.name}?`;
        delModal.style.display = "block";
        
        cancelDel.addEventListener('click', function () {
            delModal.style.display = "none";
        });
        
        delDel.addEventListener('click', function () {
            // const indexToRemove = events.indexOf(Event);
            events.splice(itemPosition, 1);
            const stringifiedEvents = JSON.stringify(events);
            localStorage.setItem('events', stringifiedEvents);
            location.reload();
        });
        
        renderEvent(events);
    })
    
    outerBox.appendChild(innerBox);

    return outerBox;

}

const renderEvent = (events) => {
    displaySection.innerHTML = "";

    for (let itemPosition = 0; itemPosition < events.length; itemPosition++) {

        const Event = events[itemPosition];
        const item = createEventCard(Event, itemPosition);
        setInterval(function() {
            const timeDifference = timer(itemPosition);
            formatTimeDifference(timeDifference, item, itemPosition);
        }, 1000);
        displaySection.appendChild(item);

        item.scrollIntoView({behavior:"smooth"});
    }

}

if (events != null) {
    renderEvent(events);
}

function timer (itemPosition) {

    const Event = events[itemPosition];
    const [year, rawMonth, rawDay] = (Event.date).split("-");
    const month = rawMonth.trimStart();
    const day = rawDay.trimStart();
    
    const [rawHour, rawMinute] = (Event.time).split(":");
    const hour = rawHour.trimStart();
    const minute = rawMinute.trimStart();

    const targetTime = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hour),
        parseInt(minute),
        0, // seconds
        0 // milliseconds
    );
    
    const currentDate = new Date();
    const timeDifference = targetTime - currentDate;

    // console.log(targetTime);
    // console.log(currentDate);
    // console.log(timeDifference);
    return timeDifference;
}

function formatTimeDifference (timeDifference, item, itemPosition) {
    const countdown = item.querySelector('#countdown');
    const Days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    const Hours = Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const Minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
    const Seconds = Math.floor((timeDifference % (60 * 1000)) / (1000));
    
    function doubleDigit (number) {
        return number.toString().padStart(2, '0');
    }
    let Value = `${Days}:${doubleDigit(Hours)}:${doubleDigit(Minutes)}:${doubleDigit(Seconds)}`;
    
    if (timeDifference < 1000) {

        if (timeDifference > 1) {
            congratsMessage.textContent = `Countdown for ${events[itemPosition].name} has successfully elapsed`;    
            congratsModal.style.display = "block";

            window.addEventListener('click', function (event) {
                if (event.target == congratsModal) {
                    congratsModal.style.display = "none";
                }
            });
        }

        countdown.textContent = `0:00:00:00`;
        return;
    }
    countdown.textContent = Value;
}

startCountButton.addEventListener('click', function() {
    const isValid = validateForm();
    if (!isValid) {
        return;
    }
    
    const eventDetails = getFormInput();
    
    // console.log(eventDetails);

    const [year, rawMonth, rawDay] = (eventDetails.date).split("-");
    const month = rawMonth.trimStart();
    const day = rawDay.trimStart();
    
    const [rawHour, rawMinute] = (eventDetails.time).split(":");
    const hour = rawHour.trimStart();
    const minute = rawMinute.trimStart();

    const targetTime = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
        parseInt(hour),
        parseInt(minute),
        0, // seconds
        0 // milliseconds
        );
        
        const currentDate = new Date();
        const timeDifference = targetTime - currentDate;
        
        if (timeDifference > 0) {
            alert('Countdown initiation success');
        } else {
            alert('The specified time has already passed. Kindly select a future date');
            return;
        }
        resetForm();

    if (startCountButton.textContent == "Resume Countdown") {
        events[currentPosition] = eventDetails;
        startCountButton.textContent = "Initiate Countdown";
    } else {
        events.push(eventDetails);
    }
    
    
    const stringifiedEvents = JSON.stringify(events);
    localStorage.setItem('events', stringifiedEvents);
    renderEvent(events);
});

