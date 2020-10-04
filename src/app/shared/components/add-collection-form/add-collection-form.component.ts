import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddCollectionFormData } from '@shared/models/add-collection-form-data.model';

@Component({
    selector: 'app-add-collection-form',
    templateUrl: './add-collection-form.component.html',
    styleUrls: ['./add-collection-form.component.scss']
})
export class AddCollectionFormComponent implements OnInit {
    @Output() submitForm = new EventEmitter<AddCollectionFormData>();

    addCollectionForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.addCollectionForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: [''],
        });
    }

    onSubmit(): void {
        if (this.addCollectionForm.valid) {
            this.submitForm.emit(this.addCollectionForm.value);
        }
    }
}
