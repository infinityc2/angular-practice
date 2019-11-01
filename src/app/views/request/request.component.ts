import { DialogNotificationComponent } from './../../components/dialog-notification/dialog-notification.component';
import { ActivatedRoute } from '@angular/router';
import { AppDateAdapter, APP_DATE_FORMATS } from './../../shared/date-format';
import { DialogToolsComponent } from './../../components/dialog-tools/dialog-tools.component';
import { MatDialog, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { ApiService } from './../../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.sass'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class RequestComponent implements OnInit {

  brands: Array<any>;
  computerTypes: Array<any>;
  tools: Array<any>;
  customer: Number;

  requestForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.customer = Number(this.route.snapshot.paramMap.get('id'));
    this.initRequestForm();
    this.getBrands();
    this.getComputerTypes();
  }

  getBrands(): void {
    this.api.getBrands().subscribe(response => {
      this.brands = response;
    });
  }

  getComputerTypes(): void {
    this.api.getComputerTypes().subscribe(response => {
      this.computerTypes = response;
    })
  }

  initRequestForm(): void {
    this.requestForm = this.formBuilder.group({
      brand: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.maxLength(10)]],
      symptom: [null, [Validators.required, Validators.minLength(10)]],
      sentDate: [null, Validators.required],
      computerType: [null, Validators.required],
      customer: [this.customer]
    })
  }

  showDialogTool(): void {
    const dialog = this.dialog.open(DialogToolsComponent, {
      width: '750px',
    });
    dialog.afterClosed().subscribe(response => {
      this.tools = response;
    });
  }

  addRequest(): void {
    let toolTemp: Array<any> = [];
    if (this.tools) {
      this.tools.forEach(tool => {
        toolTemp.push(tool.id);
      });
    }
    if (this.requestForm.valid) {
      this.api.addRequest(this.requestForm, toolTemp).subscribe(response => {
        this.dialog.open(DialogNotificationComponent, {
          width: `300px`,
          data: {
            header: `Notification`,
            message: `${response}: Add Your Request Completed`
          }
        });
      }, error => {
        this.dialog.open(DialogNotificationComponent, {
          width: `300px`,
          data: {
            header: `Error`,
            message: `${error.response}: Cannot Add Your Request`
          }
        });
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
