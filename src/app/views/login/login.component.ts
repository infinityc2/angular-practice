import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogNotificationComponent } from 'src/app/components/dialog-notification/dialog-notification.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.api.login(this.loginForm).subscribe(response => {
        
      }, error => {
        this.dialog.open(DialogNotificationComponent, {
          width: `300px`,
          data: {
            header: `Wrong email or password`,
            message: `email or not correct`
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
      });
    }
  }

}
