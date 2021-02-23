import { Component, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-mini-calendar',
  templateUrl: './mini-calendar.component.html',
  styleUrls: ['./mini-calendar.component.scss']
})
export class MiniCalendarComponent {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    height: '100%',
    headerToolbar: {
      left: 'prev',
      center: 'title',
      end: 'next',
    },
    dayHeaderFormat: { weekday: 'narrow' },
    showNonCurrentDates: false,
    fixedWeekCount: true,
    dateClick: this.dateClicked.bind(this),
  };

  dateClicked(args) {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.select(args.date);
    console.log('click', args.date); 
  }
}
