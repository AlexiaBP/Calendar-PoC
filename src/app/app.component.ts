import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventSourceInput, FullCalendarComponent } from '@fullcalendar/angular';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  // references the #calendar in the template
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  calendarApi;

  events$ = of([
    // Date event
    { title: 'event 1', date: '2021-02-01', id: 123 },
    // Timed events
    { title: 'event 2.b', start: new Date('02-04-2021 11:00'), end: new Date('02-04-2021 12:00'), id: 456 },
    { title: 'event 2.a', start: new Date('02-04-2021 9:00'), end: new Date('02-04-2021 11:30'), id: 457 },
    // All day event
    { title: 'event 3 allday', date: '2021-02-02', allDay: true, id: 789 },
    // Multiday event
    { title: 'event 4 multiday', start: new Date('02-05-2021 11:00'), end: new Date('02-06-2021 9:00'), id: 999 },
    // Background event (holidays)
    { title: 'holiday', date: '2021-02-04', id: 781, display: 'background' },
    // Content inject
    { title: 'event 5.a', start: new Date('02-07-2021 11:00'), end: new Date('02-07-2021 12:00'), id: 112, stamp: true },
    { title: 'event 5.b', start: new Date('02-07-2021 13:00'), end: new Date('02-07-2021 14:00'), id: 121, stamp: false },
    { title: 'event 5.c', start: new Date('02-07-2021 15:00'), end: new Date('02-07-2021 16:00'), id: 211, stamp: true },
    // Pending
    { title: 'event 6', start: new Date('02-08-2021 11:00'), end: new Date('02-07-2021 12:00'), id: 112, isPending: true, backgoundColor: '#2e8be0' },
  ]);

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    eventDisplay: 'block',
    // true renders each event source as it is received. Will result in more renders.
    // false waits until all event sources have been received and renders them all at once. Results in less renders.
    progressiveEventRendering: true,
    // Time format
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: false,
      hour12: false,
    },
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: false,
      hour12: false,
    },
    // Button display
    customButtons: {
      filterButton: {
        text: 'Affichage',
        click: this.openFilterPane.bind(this),
      }
    },
    // Calendar controls
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      end: 'dayGridMonth timeGridWeek timeGridOneDay filterButton',
    },
    // View specific
    views: {
      dayGrid: {
        // Add button day cells
        dayCellDidMount: this.handleAddButton.bind(this),
      },
      timeGrid: {
        displayEventEnd: false,
        dayHeaderFormat: {
          weekday: 'short', 
          day: 'numeric',
        },
        // Add button header cells
        dayHeaderDidMount: this.handleAddButton.bind(this),
      },
      timeGridOneDay: {
        type: 'timeGrid',
        duration: { days: 1 },
        buttonText: '1 day',
        nowIndicator: true,
      }
    },
    // Alter event dom directly
    eventDidMount: this.handleStamps.bind(this),
    // Add classNames
    eventClassNames: this.handleClassNames.bind(this),
    // Event click handler
    eventClick: this.eventClicked.bind(this),
    // Event hover handler
    eventMouseEnter: this.eventHovered.bind(this),
    eventMouseLeave: this.eventLeft.bind(this),
    // Select dates
    // selectable: true,
    // unselectAuto: false,
    // select: this.selectDates.bind(this),
  };

  ngAfterViewInit() {
    this.calendarApi = this.calendarComponent.getApi();

    // Add ics source
    // Repeat to add multiple ics sources
    // calendarApi.addEventSource({
    //   url: '/canada.ics',
    //   format: 'ics',
    //   color: '#aaa',
    // });

    this.events$.subscribe((events) => {
      // Add api source
      this.calendarApi.addEventSource(events as EventSourceInput);
    });
  }

  eventClicked(args) {
    console.log('click', args.event.id); 
  }

  eventHovered(args) {
    console.log('hover', args.event.id); 
  }

  eventLeft(args) {
    console.log('leave', args.event.id); 
  }

  handleStamps(arg) {
    if (arg.event.extendedProps.stamp) {
      const italicEl = document.createElement('i')
      italicEl.className = 'stamp';
      italicEl.innerHTML = 'I'
      arg.el.append(italicEl);
    }
    return arg.el;
  }

  handleClassNames(arg) {
    if (arg.event.extendedProps.isPending) {
      return [ 'pending' ];
    }
  }

  handleAddButton(arg) {
    const buttonEl = document.createElement('button');
    buttonEl.innerHTML = '+';
    buttonEl.addEventListener('click', this.add.bind(this, arg.date));
    arg.el.append(buttonEl);
    return arg.el;
  }

  add(date) {
    this.calendarApi.addEvent({
      title: 'dynamic event',
      start: date,
    });
  }
  
  openFilterPane() {
    console.log('open pane');
  }

  selectDates(info) {
    const events = this.calendarApi.getEvents();
    for(
      let date = new Date(info.startStr);
      date < new Date(info.endStr);
      date.setDate(date.getDate()+1)
    ){
      const existingEvent = events.find(e => e.start.toDateString() === date.toDateString());
      if (existingEvent) {
        existingEvent.remove();
      } else {
        this.add(date);
      }
    }
  }
}
