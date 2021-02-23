import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import iCalendarPlugin from '@fullcalendar/icalendar';
import interactionPlugin from '@fullcalendar/interaction';
import { MiniCalendarComponent } from './mini-calendar/mini-calendar.component';
import { CalendarComponent } from './calendar/calendar.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin,
  iCalendarPlugin,
]);

@NgModule({
  declarations: [
    AppComponent,
    MiniCalendarComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule // register FullCalendar with you app
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
