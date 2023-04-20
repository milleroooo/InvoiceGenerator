import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/modal/company';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-show-company',
  templateUrl: './show-company.component.html',
  styleUrls: ['./show-company.component.css'],
})
export class ShowCompanyComponent implements OnInit {
  company!: Company;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getCompany().subscribe((data: Company) => {
      this.company = {
        name: data.name,
        address: data.address,
        phone: data.phone,
      };
    });
  }
}
