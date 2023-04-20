import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Invoice } from '../modal/invoice';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Company } from '../modal/company';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  invoiceSubject = new Subject<Invoice[]>();

  constructor(private afs: AngularFirestore, private http: HttpClient) {}

  //Function that returns all invoices from database and subscribes them
  getAllInvoices() {
    this.afs
      .collection('/Invoices')
      .valueChanges()
      .subscribe((invoice: unknown[]): void => {
        this.invoiceSubject.next(invoice as Invoice[]);
      });
  }

  //Function that add invoice to the database
  addInvoice(invoice: Invoice) {
    invoice.id = this.afs.createId();
    return this.afs.collection('/Invoices').add(invoice);
  }

  //Function that fetches data from json file
  getCompany() {
    return this.http.get<Company>('assets/company.json');
  }
}
