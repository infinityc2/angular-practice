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
    return this.http.post(`${environment.api}/customer/login`, user.value);
  }

  register(register: FormGroup): Observable<any> {
    return this.http.post(`${environment.api}/customer/register`, register.value)
  }

  addRequest(request: FormGroup, tool: Array<any>): Observable<any> {
    return this.http.post(`${environment.api}/request/repair/${tool}`, request.value);
  }
}
