import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShowInvoicesComponent } from './dashboard/show-invoices/show-invoices.component';
import { NewInvoiceComponent } from './dashboard/new-invoice/new-invoice.component';
import { RemindComponent } from './auth/remind/remind.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  { path: '',   component: LoginComponent },
  { path: 'signup',  component: SignupComponent },
  { path: 'remind',  component: RemindComponent },
  { path: 'new-invoice',  component: NewInvoiceComponent, canActivate: [AuthGuard] },
  { path: 'show-invoices',  component: ShowInvoicesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
