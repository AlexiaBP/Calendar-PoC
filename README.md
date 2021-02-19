# Proof of Concept using FullCalendar V5 Angular port

## Walkthrough 

FullCalendar docs https://fullcalendar.io/docs

### Installation

Install the FullCalendar-related dependencies
```
npm install --save @fullcalendar/angular @fullcalendar/daygrid
```

Include the FullCalendarModule into app’s root module as well as all plugins
```
import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid';
```

Register all plugins
```
FullCalendarModule.registerPlugins([
  dayGridPlugin,
]);
```

Import FullCalendarModule
```
imports: [
    [...]
    FullCalendarModule,
],
```
### Basic Use

Import CalendarOptions for typing purpose
```
import { CalendarOptions } from '@fullcalendar/angular';
```

Declare calendarOptions in component
```
calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
};
```

Add FullCalendar to template
```
<full-calendar [options]="calendarOptions"></full-calendar>
```
### FullCalendar API
Useful to access the underlying Calendar object for raw data and methods

Get ahold of the ViewChild reference
```
<full-calendar #calendar [options]="calendarOptions"></full-calendar>
---
@ViewChild('calendar') calendarComponent: FullCalendarComponent;
```

After the calendar is initiated, we can access the API like so
```
const calendarApi = this.calendarComponent.getApi();
```
## Concepts

### Events Sources

Consider a `events$` attribute stocking the info fetched from the server and the `calendarAPI` (see above)

```
ngAfterViewInit() {
  [...]
  this.events$.subscribe((events) => {
    calendarApi.addEventSource(events);
  });
  [...]
}
```

### Event handlers

For any event handler, you'll need to bind `this` to the callback, for example
```
// Event click handler
eventClick: this.eventClicked.bind(this),
// Event hover handler
eventMouseEnter: this.eventHovered.bind(this),
eventMouseLeave: this.eventLeft.bind(this),
// Select dates
select: this.selectDates.bind(this),
```

### Event render hooks

For any event handler, you'll need to bind `this` to the callback, for example
```
// Alter event dom directly
eventDidMount: this.handleStamps.bind(this),
// Add classNames
eventClassNames: this.handleClassNames.bind(this),
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
