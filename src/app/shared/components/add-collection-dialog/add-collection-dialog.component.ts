import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddCollectionFormData } from '@shared/models/add-collection-form-data.model';

@Component({
    selector: 'app-add-collection-dialog',
    templateUrl: './add-collection-dialog.component.html',
    styleUrls: ['./add-collection-dialog.component.scss']
})
export class AddCollectionDialogComponent {
    constructor(
        private dialogRef: MatDialogRef<AddCollectionDialogComponent>,
    ) {
    }

    onSubmitForm(data: AddCollectionFormData): void {
        this.dialogRef.close(data);
    }
}
