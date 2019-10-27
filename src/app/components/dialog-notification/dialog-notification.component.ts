import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-notification',
  templateUrl: './dialog-notification.component.html',
  styleUrls: ['./dialog-notification.component.sass']
})
export class DialogNotificationComponent {

  constructor(private dialogRef: MatDialogRef<DialogNotificationComponent>, @Inject(MAT_DIALOG_DATA) private data: String) { }

  onClose():void {
    this.dialogRef.close()
  }
}
