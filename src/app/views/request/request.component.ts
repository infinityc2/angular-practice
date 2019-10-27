import { ApiService } from './../../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.sass']
})
export class RequestComponent implements OnInit {

  brands: Array<any>;
  computerTypes: Array<any>;

  requestForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService
  ) {

  }

  ngOnInit(): void {
    this.initRequestForm()
    this.getBrands()
  }

  getBrands(): void {
    this.api.getBrands().subscribe(response => {
      this.brands = response;
    });
  }

  initRequestForm(): void {
    this.requestForm = this.formBuilder.group({
      brand: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      phone: ['', Validators.required, Validators.maxLength(10)],
      symptom: ['', Validators.required, Validators.minLength(10)],
      customer: ['', Validators.required],
      sentDate: ['', Validators.required],
      computerType: ['', Validators.required]
    })
  }

}
