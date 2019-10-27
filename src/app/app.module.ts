import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule, MatNativeDateModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { LoginComponent } from './views/login/login.component';
import { RequestComponent } from './views/request/request.component';
import { ApiService } from './services/api.service';
import { DialogNotificationComponent } from './components/dialog-notification/dialog-notification.component';
import { LayoutCustomerComponent } from './layouts/layout-customer/layout-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RequestComponent,
    DialogNotificationComponent,
    LayoutCustomerComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatIconModule,
    FlexLayoutModule
  ],
  providers: [MatDatepickerModule, ApiService],
  bootstrap: [AppComponent],
  entryComponents: [DialogNotificationComponent]
})
export class AppModule { }
