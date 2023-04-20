import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isAuth = false;
  authSubscription!: Subscription;

   constructor(private authService : AuthService) {}

   ngOnInit(): void {
     this.authSubscription = this.authService.authChange.subscribe(authStatus => {
       this.isAuth = authStatus;
     })
   }

   onLogout(){
    this.authService.logout();
  }

   ngOnDestroy(): void {
     this.authSubscription.unsubscribe();
   }
 }
