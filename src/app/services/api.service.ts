import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL: string = "https://repair-invoice-system-api.herokuapp.com";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getComputerTypes(): Observable<any> {
    return this.http.get(`${BASE_URL}/computer/type`);
  }
  login(user: FormGroup) {
    return this.http.post(`${BASE_URL}/customer/login`, {
      email: user.get("email").value,
      password: user.get("password").value
    });
  }
}
