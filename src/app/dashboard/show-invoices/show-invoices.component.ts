import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Invoice } from 'src/app/modal/invoice';
import { DataService } from 'src/app/services/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-invoices',
  templateUrl: './show-invoices.component.html',
  styleUrls: ['./show-invoices.component.css']
})
export class ShowInvoicesComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns = ['name', 'count', 'price', 'service', 'availability'];
  dataSource = new MatTableDataSource<Invoice>();
  invoiceSubscription!: Subscription;

  rows: Invoice[] = [];
  pageSizeOptions = [3, 5, 10, 25, 50];
  pageSize = 5;
  totalRows = 0;
  enablePagination = true;
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.invoiceSubscription =
    this.dataService.invoiceSubject.subscribe(
      (invoices: Invoice[]) => {
        this.dataSource.data = invoices;
        this.isLoading = false;
      }
    );
    setTimeout(() => {
      this.dataService.getAllInvoices();
    }, 2000);
  }

  //Function that shows all data (only if pagination is not enabled)
  togglePagination() {
    this.dataSource.paginator = null;
  }

  //Function that filters html target values from table (dataSource) and deleting whitespaces by trim(), lowercasing values by toLowerCase();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource<Invoice>(this.rows);
    this.totalRows = this.rows.length;
    if (this.enablePagination) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnDestroy(): void {
    if (this.invoiceSubscription) {
      this.invoiceSubscription.unsubscribe();
    }
  }
}

