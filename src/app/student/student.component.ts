import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {User} from "../user";
import {HttpErrorResponse} from "@angular/common/http";
import {Classroom} from "../classroom";
import {Subject} from "../subject";
import {NgForm} from "@angular/forms";
import {UserService} from "../user.service";
import {ClassroomService} from "../classroom.service";
import {SubjectService} from "../subject.service";
import {CalendarEvent, CalendarModule, CalendarView, DateAdapter} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css', '../../../node_modules/angular-calendar/css/angular-calendar.css']
})
export class StudentComponent implements OnInit {
  public users: User[];
  public classrooms: Classroom[];
  public subjects: Subject[];
  public months = {
    'January': 0,
    'February': 1,
    'March': 2,
    'April': 3,
    'May': 4,
    'June': 5,
    'July': 6,
    'August': 7,
    'September': 7,
    'October': 9,
    'November': 10,
    'December': 11,
  }
  public days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  public hours = {
    '8:00 - 9:30': {
      startH: 8,
      startM: 0,
      endH: 9,
      endM: 30
    },
    '9:40 - 11:10': {
      startH: 9,
      startM: 40,
      endH: 11,
      endM: 10
    },
    '11:20 - 12:50': {
      startH: 11,
      startM: 20,
      endH: 12,
      endM: 50
    },
    '13:00 - 14:30': {
      startH: 13,
      startM: 0,
      endH: 14,
      endM: 30
    },
    '14:40 - 16:10': {
      startH: 14,
      startM: 40,
      endH: 16,
      endM: 10
    },
    '16:20 - 17:50': {
      startH: 16,
      startM: 20,
      endH: 17,
      endM: 50
    },
    '18:00 - 19:30': {
      startH: 18,
      startM: 0,
      endH: 19,
      endM: 30
    },
    '19:40 - 21:10': {
      startH: 19,
      startM: 40,
      endH: 21,
      endM: 10
    }
  };
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Week;
  events: CalendarEvent[] = this.renderClassrooms();

  activeDayIsOpen = true;


 constructor(private userService: UserService, private classroomService: ClassroomService, private subjectService: SubjectService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getClassrooms();
    this.getUsers();
    this.getSubjects();
    console.log(this.events);

  }


  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (userResponse: User[]) => {
        this.users = userResponse;
        console.log(userResponse);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  // tslint:disable-next-line:typedef
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  public getClassrooms(): void {
    this.classroomService.getClassrooms().subscribe(
      (classroomResponse: Classroom[]) => {
        this.classrooms = classroomResponse;
        console.log(classroomResponse);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public renderClassrooms() {
    let listamea = []
    this.classroomService.getClassrooms().subscribe(
      (classroomResponse: Classroom[]) => {
        for (let classroom of classroomResponse) {
          console.log(classroom)
          let event1 = {
            start: new Date(2021, this.months[classroom.month], parseInt(classroom.day), this.hours[classroom.hour].startH, this.hours[classroom.hour].startM),
            end: new Date(2021, this.months[classroom.month], parseInt(classroom.day), this.hours[classroom.hour].endH, this.hours[classroom.hour].endM),
            title: classroom.name,
            resizable: {
              beforeStart: false,
              afterEnd: false
            },
            draggable: false
          }
          listamea.push(event1);
          this.cdr.detectChanges();

          console.log(this.events)
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    return listamea;
  }

/*    */

  public getSubjects(): any {
    this.subjectService.getSubjects().subscribe(
      (subjectResponse: Subject[]) => {
        this.subjects = subjectResponse;
        console.log(subjectResponse);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEvent(eventForm: NgForm): void {
    document.getElementById('add-event-form').click();
    switch (eventForm.value.day){
      case 'Monday':
        break;
    }
  }
  public prevModal(): void {
    console.log("clicked prev");
    this.viewDate.setDate(this.viewDate.getDate() - 7);
    console.log(this.viewDate);
  }
  public nextModal(): void {
    console.log("clicked next");
    this.viewDate.setDate(this.viewDate.getDate() + 7);
    console.log(this.viewDate);
  }
}
