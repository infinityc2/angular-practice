import { DialogNotificationComponent } from 'src/app/components/dialog-notification/dialog-notification.component';
import { MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  customerTypes: Array<any>;
  genders: Array<any>;
  provinces: Array<any>;

  registerForm: FormGroup;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.initRegisterForm();
    this.getCustomerTypes();
    this.getGenders();
    this.getProvinces();
  }

  initRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      customerType: ['', Validators.required],
      gender: ['', Validators.required],
      province: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      address: ['', Validators.required]
    });
  }

  getCustomerTypes(): void {
    this.api.getCustomerType().subscribe(response => {
      this.customerTypes = response;
    })
  }

  getGenders():void {
    this.api.getGenders().subscribe(response => {
      this.genders = response;
    })
  }

  getProvinces(): void {
    this.api.getProvinces().subscribe(response => {
      this.provinces = response;
    })
  }

  register(): void {
    if (this.registerForm.valid) {
      this.api.register(this.registerForm).subscribe(response => {
        
      }, error => {
        this.dialog.open(DialogNotificationComponent, {
          width: `300px`,
          data: {
            header: `$Error `,
            message: `${error.response}: Cannot Register`
          }
        })
      });
    } else {
      this.dialog.open(DialogNotificationComponent, {
        width: `300px`,
        data: {
          header: `Invalid Form`,
          message: `This form is invalid`
        }
      })
    }
  }
}
