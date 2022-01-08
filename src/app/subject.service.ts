import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Subject} from './subject';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getSubjects(): Observable<Subject[]>{
    return this.http.get<Subject[]>(`${this.apiServerUrl}/Subject/all`);
  }

  public addSubject(subject: Subject): Observable<Subject>{
    return this.http.post<Subject>(`${this.apiServerUrl}/Subject/add`, subject);
  }

  public updateSubject(subject: Subject): Observable<Subject>{
    return this.http.put<Subject>(`${this.apiServerUrl}/Subject/update`, subject);
  }

  public deleteSubject(subjectId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/Subject/delete/${subjectId}`);
  }
}
