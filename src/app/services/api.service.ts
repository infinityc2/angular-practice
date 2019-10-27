import { environment } from './../../environments/environment';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getComputerTypes(): Observable<any> {
    return this.http.get(`${environment.api}/computer/type`);
  }

  login(user: FormGroup): Observable<any> {
    return this.http.post(`${environment.api}/customer/login`, {
      email: user.get("email").value,
      password: user.get("password").value
    });
  }
  
}
