import { EventEmitter, Output } from '@angular/core';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.scss']
})
export class PhotoComponent {
    @Input() url: string;
    @Input() author: string;
    @Output() addToCollection = new EventEmitter<void>();

    onAddToCollection(): void {
        this.addToCollection.emit();
    }
}
