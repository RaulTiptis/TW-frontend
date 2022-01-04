import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Classroom} from './classroom';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) {}

  public getClassrooms(): Observable<Classroom[]>{
    return this.http.get<Classroom[]>(`${this.apiServerUrl}/Classroom/all`);
  }

  public addClassroom(name: string, location: string, capacity: string, teacherID: string, subjectID: string, day: string, hour: string, month: string): Observable<Classroom>{
    return this.http.post<Classroom>(`${this.apiServerUrl}/Classroom/add`, [name, location, capacity, teacherID, subjectID, day, hour, month]);
  }

  public updateClassroom(name: string, location: string, capacity: string, teacherID: string, subjectID: string, id: string, day: string, hour: string, month: string): Observable<Classroom>{
    return this.http.put<Classroom>(`${this.apiServerUrl}/Classroom/update`, [name, location, capacity, teacherID, subjectID, id, day, hour, month]);
  }

  public registerClassroom(name: string, location: string, capacity: string, teacherID: string, subjectID: string, id: string, day: string, hour: string, month: string): Observable<Classroom>{
    return this.http.put<Classroom>(`${this.apiServerUrl}/Classroom/register`, [name, location, capacity, teacherID, subjectID, id, day, hour, month]);
  }

  public deleteClassroom(classroomId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/Classroom/delete/${classroomId}`);
  }
}
