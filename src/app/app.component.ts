import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isAuth = false;
  authSubscription!: Subscription;

  title = 'Invoice Generator';
  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router, private authService: AuthService) {
    this.navLinks = [
      {
        label: 'New Invoice',
        link: './new-invoice',
        index: 0,
      },
      {
        label: 'Show Invoices',
        link: './show-invoices',
        index: 1,
      },
    ];
  }
  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
      }
    );
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this.router.url)
      );
    });
  }
}

