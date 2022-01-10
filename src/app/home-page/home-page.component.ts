import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Classroom} from '../classroom';
import {User} from '../user';
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../user.service';
import {Subject} from '../subject';
import {Router} from '@angular/router';
import {RegistrationService} from "../email.service";
import {Registration} from "../email";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public users: User[];
  public classrooms: Classroom[];
  public subjects: Subject[];
  public isStudent: boolean;


  constructor(private userService: UserService, private registrationservice: RegistrationService, private router: Router) {
    this.isStudent = false;
  }

  ngOnInit(): void{
    this.getUsers();
  }

  public addAccount(userForm: NgForm): void{
    document.getElementById('closeUserForm').click();
    this.registrationservice.register(userForm.value).subscribe(
      (response: Registration) => {
        console.log(response);
        userForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
        console.log(error);
      }
    );
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

}
