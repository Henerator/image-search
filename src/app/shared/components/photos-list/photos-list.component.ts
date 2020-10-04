import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Photo } from '@shared/models/photo.model';

@Component({
    selector: 'app-photos-list',
    templateUrl: './photos-list.component.html',
    styleUrls: ['./photos-list.component.scss']
})
export class PhotosListComponent {
    @Input() photos: Photo[];
    @Output() addToCollection = new EventEmitter<Photo>();

    onAddToCollection(photo: Photo): void {
        this.addToCollection.emit(photo);
    }
}
