import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CourseRegistration} from "./course-registration";

@Injectable({
  providedIn: 'root'
})
export class CourseRegistrationService {
  apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) {}

  public getCourseRegistrations(): Observable<CourseRegistration[]>{
    return this.http.get<CourseRegistration[]>(`${this.apiServerUrl}/CourseReg/all`);
  }

  public addCourseRegistration(classroomId: number): Observable<CourseRegistration>{
    return this.http.post<CourseRegistration>(`${this.apiServerUrl}/CourseReg/add`, [classroomId]);
  }

  public updateCourseRegistration(courseRegistration: CourseRegistration): Observable<CourseRegistration>{
    return this.http.put<CourseRegistration>(`${this.apiServerUrl}/CourseReg/update`, courseRegistration);
  }

  public deleteCourseRegistration(courseRegistrationId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/CourseReg/delete/${courseRegistrationId}`);
  }

}
