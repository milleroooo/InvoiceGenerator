import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/modal/invoice';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css']
})
export class NewInvoiceComponent implements OnInit {

  invoiceForm: FormGroup | any;
  items: Invoice[] = [];

  constructor(
    private fb: FormBuilder,
    private snackBarService: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      items: this.fb.array([this.createNewInvoice()])
    });
  };

  createNewInvoice(): FormGroup {
    return this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      price: [null, [Validators.required, Validators.min(1), Validators.max(1000000)]],
      count: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      service: [null, Validators.required],
      availability: [null, Validators.required],
    })
  };

  //Function that adds a new item form to the invoice form's items array
  addAnotherInvoice() {
    const formArray = this.invoiceForm.get('items') as FormArray;
    formArray.push(this.createNewInvoice())
  };

  //Function that checking if the form is valid and pushes data into table
  onSubmit(): void {
    if (this.invoiceForm.valid) {
      this.router.navigate(['/show-invoices'],
      {state: {items: (this.invoiceForm.get('items') as FormArray).value}});
      this.snackBarService.success('Invoice has been added successfully.');
      this.invoiceForm.reset();
    } else if (this.invoiceForm.dirty && !this.invoiceForm.valid) {
      this.snackBarService.error('Please fix the errors in the form.');
    } else {
      this.snackBarService.error('Please add items.');
    }
  }

  //Function that removes an item form from the invoice form's items array
  deleteInvoice(index: number) {
    const formArray = this.invoiceForm.get('items') as FormArray;
    formArray.removeAt(index);
  };

  services = [
    { type: 'Management System' },
    { type: 'CRM System' },
    { type: 'Mobile App' },
    { type: 'Portfolio' },
    { type: 'Website' },
  ];

}

