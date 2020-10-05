import { EventEmitter, HostListener, Output } from '@angular/core';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-photo',
    templateUrl: './photo.component.html',
    styleUrls: ['./photo.component.scss']
})
export class PhotoComponent {
    @Input() url: string;
    @Input() author: string;
    @Input() downloadable: boolean;
    @Output() addToCollection = new EventEmitter<void>();

    @HostListener('click', ['$event.target'])
    onClick(): void {
        if (this.downloadable) {
            // TODO: find another way
            fetch(this.url).then((response) => {
                return response.blob();
            }).then(blob => {
                const linkElement = document.createElement('a');
                linkElement.href = URL.createObjectURL(blob);
                linkElement.download = '';
                document.body.appendChild(linkElement);
                linkElement.click();
                document.body.removeChild(linkElement);
            });
        }
    }

    onAddToCollection(event: MouseEvent): void {
        event.stopPropagation();
        this.addToCollection.emit();
    }
}
