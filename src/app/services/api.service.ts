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

  getBrands(): Observable<any> {
    return this.http.get(`${environment.api}/computer/brand`);
  }

  getTools(): Observable<any> {
    return this.http.get(`${environment.api}/tool/name`);
  }

  getGenders(): Observable<any> {
    return this.http.get(`${environment.api}/gender`);
  }

  getProvinces(): Observable<any> {
    return this.http.get(`${environment.api}/province`);
  }

  getCustomerType(): Observable<any> {
    return this.http.get(`${environment.api}/customertype`);
  }

  login(user: FormGroup): Observable<any> {
    return this.http.post(`${environment.api}/customer/login`, {
      email: user.get('email').value,
      password: user.get('password').value
    });
  }

  register(register: FormGroup): Observable<any> {
    return this.http.post(`${environment.api}/customer/register`, {
      customerType: register.get('customerType').value,
      gender: register.get('gender').value,
      province: register.get('province').value,
      email: register.get('email').value,
      firstname: register.get('firstname').value,
      lastname: register.get('lastname').value,
      password: register.get('password').value,
      phone: register.get('phone').value,
      address: register.get('address').value
    })
  }
}
