import { Component, HostBinding, Input } from '@angular/core';
import { Collection } from '@shared/models/collection.model';

@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.scss']
})
export class CollectionComponent {
    @Input() collection: Collection;
    @Input() showPhotoState: boolean;
    @Input() isPhotoInCollection: boolean;

    @HostBinding('class.selected')
    @Input()
    isSelected = false;
}
