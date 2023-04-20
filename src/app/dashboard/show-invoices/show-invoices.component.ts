import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Invoice } from 'src/app/modal/invoice';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-show-invoices',
  templateUrl: './show-invoices.component.html',
  styleUrls: ['./show-invoices.component.css']
})
export class ShowInvoicesComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'count', 'price', 'service', 'availability'];
  dataSource = new MatTableDataSource<Invoice>();

  rows: Invoice[] = [];
  pageSizeOptions = [1, 2, 3, 5, 10, 15];
  pageSize = 2;
  totalRows = 0;
  enablePagination = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {}

  ngOnInit(): void {
    if (history.state.items) {
      this.rows = history.state.items;
    }
  }

  //Function that calculates a value for each pair of elements
  getAmount(invoice: Invoice[]) {
    return invoice?.reduce((prev, curr) => prev + curr.count * curr.price, 0)
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
}

