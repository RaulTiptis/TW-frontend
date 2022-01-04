import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import {StudentComponent} from "./student/student.component";
import {SelectScreenComponent} from "./select-screen/select-screen.component";
import {StudentinterComponent} from './studentinter/studentinter.component';

const routes: Routes = [
  {path: 'teacher', component: TeacherComponent},
  {path: 'student', component: StudentComponent},
  {path: 'select-screen', component: SelectScreenComponent},
  {path: 'studentinter', component: StudentinterComponent},
  {path: '', redirectTo: '/select-screen', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
