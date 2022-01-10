import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './teacher/teacher.component';
import {StudentComponent} from "./student/student.component";
import {SelectScreenComponent} from "./select-screen/select-screen.component";
import {StudentinterComponent} from './studentinter/studentinter.component';
import {StudentregisteredComponent} from "./studentregistered/studentregistered.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {CheckEmailComponent} from "./check-email/check-email.component";

const routes: Routes = [
  {path: 'teacher', component: TeacherComponent},
  {path: 'student', component: StudentComponent},
  {path: 'select-screen', component: SelectScreenComponent},
  {path: 'studentinter', component: StudentinterComponent},
  {path: 'studentregistered', component: StudentregisteredComponent},
  {path: 'home-page', component: HomePageComponent},
  {path: 'check-email', component: CheckEmailComponent},
  {path: '', redirectTo: '/home-page', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
