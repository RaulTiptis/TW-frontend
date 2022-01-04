import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {Classroom} from '../classroom';
import {Subject} from '../subject';
import {UserService} from '../user.service';
import {ClassroomService} from '../classroom.service';
import {SubjectService} from '../subject.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-student-actual',
  templateUrl: './studentinter.component.html',
  styleUrls: ['./studentinter.component.css']
})
export class StudentinterComponent implements OnInit {

  title = 'checkin';
  public users: User[];
  public classrooms: Classroom[];
  public subjects: Subject[];
  public updateClassroom: Classroom;

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

  public onRegisterClassroom(registerForm: NgForm): void{
    document.getElementById('register-classroom-form').click();
    console.log(registerForm.value);
    this.classroomService.registerClassroom(registerForm.value.name, registerForm.value.location, registerForm.value.capacity, registerForm.value.teacher, registerForm.value.subject, registerForm.value.id, registerForm.value.day, registerForm.value.hour, registerForm.value.month).subscribe(
      (response: Classroom) => {
        console.log(response);
        this.getClassrooms();
        registerForm.reset();
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
  public onModalCalendar(): void{
    this.router.navigate(['./student']);
  }
  public onOpenModalRegister(classroom: Classroom, mode: string): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'register'){
      this.updateClassroom = classroom;
      button.setAttribute('data-target', '#registerModal');
    }
    container.appendChild(button);
    button.click();
  }
}
