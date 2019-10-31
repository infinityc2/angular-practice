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

  requestForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
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
      brand: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      phone: ['', Validators.required, Validators.maxLength(10)],
      symptom: ['', Validators.required, Validators.minLength(10)],
      customer: ['', Validators.required],
      sentDate: ['', Validators.required],
      computerType: ['', Validators.required]
    })
  }

  showDialogTool() {
    const dialog = this.dialog.open(DialogToolsComponent, {
      width: '750px',
    })
    dialog.afterClosed().subscribe(response => {
      this.tools = response;
    })
  }

}
