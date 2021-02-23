import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { MiniCalendarComponent } from './mini-calendar/mini-calendar.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'calendar'
  },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
  {
    path: 'mini',
    component: MiniCalendarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
