import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NewInvoiceComponent } from './dashboard/new-invoice/new-invoice.component';
import { ShowInvoicesComponent } from './dashboard/show-invoices/show-invoices.component';
import { ShowCompanyComponent } from './dashboard/show-company/show-company.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { RemindComponent } from './auth/remind/remind.component';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { UiService } from './services/ui.service';
import { SnackbarService } from './services/snackbar.service';
import { DataService } from './services/data.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth, AuthModule } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ShowInvoicesComponent,
    ShowCompanyComponent,
    NewInvoiceComponent,
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    RemindComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireAuthModule,
    AuthModule,
    HttpClientModule
  ],
  providers: [AuthService, UiService, DataService, SnackbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
