import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css']
})
export class NewInvoiceComponent {

  invoiceForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private snackBarService: SnackbarService,
    private router: Router
  ) {
    this.invoiceForm = fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      price: [null, [Validators.required, Validators.min(1), Validators.max(1000000)]],
      count: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      service: [null, Validators.required],
      availability: [null, Validators.required],
    });
  }

  //Function that checking if the form is valid and pushes data into database
  onSubmit(): void {
    if (this.invoiceForm.valid) {
      this.dataService.addInvoice({
        name: this.invoiceForm.value.name,
        price: this.invoiceForm.value.price,
        count: this.invoiceForm.value.count,
        service: this.invoiceForm.value.service,
        availability: this.invoiceForm.value.availability,
      });
      this.snackBarService.success('Invoice has been added successfully.');
      this.router.navigate(['/show-invoices']);
      this.invoiceForm.reset();
    } else if (this.invoiceForm.dirty && !this.invoiceForm.valid) {
      this.snackBarService.error('Please fix the errors in the form.');
    } else {
      this.snackBarService.error('Please add items.');
    }
  }

  hasUnitNumber = false;

  services = [
    { type: 'Management System' },
    { type: 'CRM System' },
    { type: 'Mobile App' },
    { type: 'Portfolio' },
    { type: 'Website' },
  ];

}

