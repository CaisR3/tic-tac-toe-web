import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error-feedback',
  templateUrl: './error-feedback.component.html',
  styleUrls: ['./error-feedback.component.scss']
})
export class ErrorFeedbackComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
    }
}
