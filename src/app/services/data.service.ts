import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../modal/company';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private http: HttpClient) {}

  //Function that fetches data from json file
  getCompany() {
    return this.http.get<Company>('assets/company.json');
  }
}
