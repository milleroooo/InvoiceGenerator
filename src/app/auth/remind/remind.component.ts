import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-remind-password',
  templateUrl: './remind.component.html',
  styleUrls: ['./remind.component.css'],
})
export class RemindComponent implements OnInit, OnDestroy {
  remindForm!: FormGroup;
  isLoading = false;
  loadingSubscription!: Subscription;

  constructor(private authService: AuthService, private uiService: UiService) {}

  ngOnInit(): void {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );
    this.remindForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
    });
  }
  onSubmit() {
    this.authService.remind({
      email: this.remindForm.value.email,
      password: this.remindForm.value.password,
    });
  }
  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
