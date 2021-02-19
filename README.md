# Proof of Concept using FullCalendar V5 Angular port

## Walkthrough 

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
`const calendarApi = this.calendarComponent.getApi();`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
