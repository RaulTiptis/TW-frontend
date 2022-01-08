import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeacherComponent } from './teacher/teacher.component';
import {UserService} from './user.service';
import {HttpClientModule} from '@angular/common/http';
import {ClassroomService} from './classroom.service';
import {SubjectService} from './subject.service';
import {FormsModule} from '@angular/forms';
import { StudentComponent } from './student/student.component';
import { SelectScreenComponent } from './select-screen/select-screen.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { StudentinterComponent } from './studentinter/studentinter.component';
import { StudentregisteredComponent } from './studentregistered/studentregistered.component';

@NgModule({
  declarations: [
    AppComponent,
    TeacherComponent,
    StudentComponent,
    SelectScreenComponent,
    StudentinterComponent,
    StudentregisteredComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [UserService, ClassroomService, SubjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
