import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Registration} from "./email";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) {}

  public register(registration: Registration): Observable<Registration>{
    return this.http.post<Registration>(`${this.apiServerUrl}/api/v1/registration`, registration);
  }

  public confirm(token: string): Observable<void>{
    return this.http.get<void>(`${this.apiServerUrl}/api/v1/registration/confirm?token=${token}`);
  }
}
