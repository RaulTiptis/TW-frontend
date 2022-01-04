import {Component, OnInit} from '@angular/core';
import {User} from './user';
import {UserService} from './user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Classroom} from './classroom';
import {ClassroomService} from './classroom.service';
import {SubjectService} from './subject.service';
import {Subject} from './subject';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit{
  title = 'checkin';
  public users: User[];
  public classrooms: Classroom[];
  public subjects: Subject[];
  public updateClassroom: Classroom;
  public deleteClassroom: Classroom;
  public months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public hours = ['8:00 - 9:30', '9:40 - 11:10', '11:20 - 12:50', '13:00 - 14:30', '14:40 - 16:10', '16:20 - 17:50', '18:00 - 19:30', '19:40 - 21:10' ];

  constructor(private userService: UserService, private classroomService: ClassroomService, private subjectService: SubjectService, private router: Router){}

  ngOnInit(): void{
    this.getClassrooms();
    this.getUsers();
    this.getSubjects();
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

  public searchSubject(key: string): void {
    console.log(key);
    const results: Classroom[] = [];
    for (const classroom of this.classrooms) {
      if (classroom.subject.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(classroom);
      }
    }
    this.classrooms = results;
    const res: Classroom[] = [];
    for (const classroom of this.classrooms) {
      if (classroom.subject.name.toLowerCase().indexOf(key.toLowerCase()) === -1) {
        res.push();
        this.classrooms = res;
      }
    }
    if (!key) {
      this.getClassrooms();
    }
  }

  public onAddClassroom(addForm: NgForm): void{
    document.getElementById('add-classroom-form').click();
    console.log(addForm.value.subject);
    this.classroomService.addClassroom(addForm.value.name, addForm.value.location, addForm.value.capacity, addForm.value.teacher, addForm.value.subject, addForm.value.day, addForm.value.hour, addForm.value.month).subscribe(
      (response: Classroom) => {
        console.log(response);
        this.getClassrooms();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        console.log(error);
      }
    );
  }

  public onUpdateClassroom(updateForm: NgForm): void{
    document.getElementById('update-classroom-form').click();
    console.log(updateForm.value);
    this.classroomService.updateClassroom(updateForm.value.name, updateForm.value.location, updateForm.value.capacity, updateForm.value.teacher, updateForm.value.subject, updateForm.value.id, updateForm.value.day, updateForm.value.hour, updateForm.value.month).subscribe(
      (response: Classroom) => {
        console.log(response);
        this.getClassrooms();
        updateForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteClassroom(classroomId: number): void{
    this.classroomService.deleteClassroom(classroomId).subscribe(
      (response: void) => {
        console.log(response);
        this.getClassrooms();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddSubject(addSubjectForm: NgForm): void{
    document.getElementById('add-subject-form').click();
    this.subjectService.addSubject(addSubjectForm.value).subscribe(
      (response: Subject) => {
        console.log(response);
        this.getSubjects();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModalClassroom(classroom: Classroom, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addClassroomModal');
    }
    if (mode === 'update') {
      this.updateClassroom = classroom;
      button.setAttribute('data-target', '#updateClassroomModal');
    }
    if (mode === 'delete') {
      this.deleteClassroom = classroom;
      button.setAttribute('data-target', '#deleteClassroomModal');
    }
    container.appendChild(button);
    button.click();
  }
  public onOpenModalSubject(subject: Subject, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addSubjectModal');
    }
    container.appendChild(button);
    button.click();
  }
  public onModalCalendar(): void{
    this.router.navigate(['./student']);
  }
}
