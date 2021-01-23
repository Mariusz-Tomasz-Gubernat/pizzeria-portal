import {
  templates,
  select,
  settings,
  classNames
} from '../settings.js';
import AmountWidget from './AmountWidget.js';
import utils from '../utils.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';
class Booking {
  constructor(element) {
    const thisBooking = this;

    thisBooking.render(element);
    thisBooking.initWidgets();
    thisBooking.getData();
    thisBooking.bookingTable();
    thisBooking.initActions();
  }

  getData() {
    const thisBooking = this;

    const startDateParam = settings.db.dateStartParamKey + '=' + utils.dateToStr(thisBooking.datePicker.minDate);
    const endDateParam = settings.db.dateEndParamKey + '=' + utils.dateToStr(thisBooking.datePicker.maxDate);

    const params = {
      booking: [
        startDateParam,
        endDateParam,
      ],
      eventsCurrent: [
        settings.db.notRepeatParam,
        startDateParam,
        endDateParam,
      ],
      eventsRepeat: [
        settings.db.repeatParam,
        endDateParam,
      ]
    };

    const urls = {
      booking: settings.db.url + '/' + settings.db.booking + '?' + params.booking.join('&'),
      eventsCurrent: settings.db.url + '/' + settings.db.event + '?' + params.eventsCurrent.join('&'),
      eventsRepeat: settings.db.url + '/' + settings.db.event + '?' + params.eventsRepeat.join('&'),
    };

    Promise.all([fetch(urls.booking), fetch(urls.eventsCurrent), fetch(urls.eventsRepeat), ])
      .then(function (allResponses) {
        const bookingsReponse = allResponses[0];
        const eventsCurrentReponse = allResponses[1];
        const eventsRepeatReponse = allResponses[2];
        return Promise.all([
          bookingsReponse.json(),
          eventsCurrentReponse.json(),
          eventsRepeatReponse.json(),
        ]);
      })
      .then(function ([bookings, eventsCurrent, eventsRepeat]) {
        thisBooking.parseData(bookings, eventsCurrent, eventsRepeat);
      });

  }

  parseData(bookings, eventsCurrent, eventsRepeat) {
    const thisBooking = this;

    thisBooking.booked = {};

    for (let item of bookings) {
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }

    for (let item of eventsCurrent) {
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);
    }

    const minDate = thisBooking.datePicker.minDate;
    const maxDate = thisBooking.datePicker.maxDate;

    for (let item of eventsRepeat) {
      if (item.repeat == 'daily') {
        for (let loopDate = minDate; loopDate <= maxDate; loopDate = utils.addDays(loopDate, 1)) {
          thisBooking.makeBooked(utils.dateToStr(loopDate), item.hour, item.duration, item.table);
        }
      }
    }

    thisBooking.updateDOM();
  }

  makeBooked(date, hour, duration, table) {
    const thisBooking = this;

    if (typeof thisBooking.booked[date] == 'undefined') {
      thisBooking.booked[date] = {};
    }

    const startHour = utils.hourToNumber(hour);

    for (let hourBlock = startHour; hourBlock < startHour + duration; hourBlock += 0.5) {
      if (typeof thisBooking.booked[date][hourBlock] == 'undefined') {
        thisBooking.booked[date][hourBlock] = [];
      }
      thisBooking.booked[date][hourBlock].push(table);
    }
  }

  updateDOM() {
    const thisBooking = this;

    thisBooking.date = thisBooking.datePicker.value;
    thisBooking.hour = utils.hourToNumber(thisBooking.hourPicker.value);

    let allAvailable = false;

    if (
      typeof thisBooking.booked[thisBooking.date] == 'undefined' ||
      typeof thisBooking.booked[thisBooking.date][thisBooking.hour] == 'undefined'
    ) {
      allAvailable = true;
    }

    for (let table of thisBooking.dom.tables) {
      let tableId = table.getAttribute(settings.booking.tableIdAttribute);
      if (!isNaN(tableId)) {
        tableId = parseInt(tableId);
      }

      if (
        !allAvailable &&
        thisBooking.booked[thisBooking.date][thisBooking.hour].includes(tableId)
      ) {
        table.classList.add(classNames.booking.tableBooked);
      } else {
        table.classList.remove(classNames.booking.tableBooked);
        table.classList.remove('reserved');
      }
    }

    thisBooking.colorfoulRangSlider();

  }


  render(element) {
    const thisBooking = this;

    const generatedHTML = templates.bookingWidget();
    thisBooking.dom = {};
    thisBooking.dom.wrapper = element;
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);
    thisBooking.dom.wrapper.appendChild(generatedDOM);
    thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.querySelector(select.booking.peopleAmount);
    thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(select.booking.hoursAmount);
    thisBooking.dom.datePicker = thisBooking.dom.wrapper.querySelector(select.widgets.datePicker.wrapper);
    thisBooking.dom.hourPicker = thisBooking.dom.wrapper.querySelector(select.widgets.hourPicker.wrapper);
    thisBooking.dom.tables = thisBooking.dom.wrapper.querySelectorAll(select.booking.tables);
    thisBooking.dom.starters = thisBooking.dom.wrapper.querySelectorAll(select.booking.starters);
    thisBooking.dom.phone = thisBooking.dom.wrapper.querySelector(select.booking.phone);
    thisBooking.dom.address = thisBooking.dom.wrapper.querySelector(select.booking.address);
    thisBooking.dom.form = thisBooking.dom.wrapper.querySelector(select.booking.form);
  }

  initWidgets() {
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);

    thisBooking.dom.wrapper.addEventListener('updated', function () {
      thisBooking.updateDOM();


    });
  }
  colorfoulRangSlider() {
    const thisBooking = this;

    const bookedHours = thisBooking.booked[thisBooking.datePicker.correctValue];
    const sliderElement = document.querySelector('.rangeSlider');

    let colorSlider = [];

    for (let bookedHour in bookedHours) {
      const firstOfInterval = 0;
      const secondOfInterval = (((bookedHour - 12) + .5) * 100) / 12;
      if (bookedHour < 24) {
        if (bookedHours[bookedHour].length <= 1) {
          colorSlider.push('/*' + bookedHour + '*/green ' + firstOfInterval + '%, green ' + secondOfInterval + '%');
        } else if (bookedHours[bookedHour].length == 2) {
          colorSlider.push('/*' + bookedHour + '*/orange ' + firstOfInterval + '%, orange ' + secondOfInterval + '% ');
        } else if (bookedHours[bookedHour].length >= 3) {
          colorSlider.push('/*' + bookedHour + '*/red ' + firstOfInterval + '%, red ' + secondOfInterval + '%');
        }
      }
    }

    colorSlider.sort();
    const colorStr = colorSlider.join();
    sliderElement.style.background = 'linear-gradient(to right, ' + colorStr + ')';

  }

  bookingTable() {
    const thisBooking = this;

    for (let table of thisBooking.dom.tables) {

      table.addEventListener('click', function (event) {
        event.preventDefault();

        if (table.classList.contains(classNames.booking.tableBooked)) {
          alert('Table not available.');

        } else {
          thisBooking.removeSelected();
          table.classList.add(classNames.booking.tableSelected);
          const tableNumber = table.getAttribute(settings.booking.tableIdAttribute);
          thisBooking.bookedTable = parseInt(tableNumber);

        }

      });

    }
  }

  removeSelected() {
    const thisBooking = this;

    const selectedTables = document.querySelectorAll('.selected');
    for (let selected of selectedTables) {
      selected.classList.remove(classNames.booking.tableSelected);
    }
    delete thisBooking.bookedTable;
  }
  initActions() {
    const thisBooking = this;
    const formSubmit = document.querySelector('form.booking-form');
    formSubmit.addEventListener('submit', function (event) {
      event.preventDefault();
      thisBooking.sendOrder();
    });

    thisBooking.dom.hourPicker.addEventListener('updated', function () {
      thisBooking.removeSelected();
    });


    thisBooking.dom.datePicker.addEventListener('updated', function () {
      thisBooking.removeSelected();
    });

  }

  sendOrder() {
    const thisBooking = this;
    const url = settings.db.url + '/' + settings.db.booking;
    const payload = {
      starters: [],
      date: thisBooking.datePicker.value,
      people: thisBooking.peopleAmount.value,
      hour: thisBooking.hourPicker.value,
      duration: thisBooking.hoursAmount.value,
      table: thisBooking.bookedTable,
    };


    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    fetch(url, options)
      .then(function (response) {
        return response.json();
      }).then(function (parsedResponse) {

        thisBooking.makeBooked(parsedResponse.date, parsedResponse.hour, parsedResponse.duration, parsedResponse.table);
        thisBooking.removeSelected();
        thisBooking.updateDOM();
      });


  }

}

export default Booking;
