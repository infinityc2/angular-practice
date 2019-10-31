import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initRegisterForm()
  }

  initRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      customerType: ['', Validators.required],
      gender: ['', Validators.required],
      province: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(8)],
      phone: ['', Validators.required, Validators.pattern('^[0-9]*$'), Validators.length === 10],
      address: ['', Validators.required]
    })
  }

  register() {
    if (this.registerForm.valid) {
      this.api.register(this.registerForm).subscribe(response => {
        
      }, error => {

      })
    }
  }
}
