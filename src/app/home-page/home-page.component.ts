import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Classroom} from '../classroom';
import {User} from '../user';
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../user.service';
import {Subject} from '../subject';
import {Router} from '@angular/router';

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


  constructor(private userService: UserService, private router: Router) {
    this.isStudent = false;
  }

  ngOnInit(): void{
    this.getUsers();
  }

  public addAccount(userForm: NgForm): void{
    document.getElementById('closeUserForm').click();
    userForm.value.isStudent = this.isStudent;
    console.log(userForm.value);
    this.userService.addUser(userForm.value).subscribe(
      (response: User) => {
        console.log(response);
        userForm.reset();
        if (this.isStudent) {
          this.router.navigate(['/studentinter']);
        }
        else { this.router.navigate(['/teacher']); }

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
