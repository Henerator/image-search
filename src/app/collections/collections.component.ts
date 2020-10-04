import { Component } from '@angular/core';
import { Collection } from './models/collection.model';

@Component({
    selector: 'app-collections',
    templateUrl: './collections.component.html',
    styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent {
    collections: Collection[] = [
        {
            id: '1',
            name: 'Surfing',
            description: 'Some colleciton description',
            count: 3,
            urls: [],
        },
        {
            id: '2',
            name: 'Iceland',
            description: 'Some colleciton description',
            count: 7,
            urls: [],
        },
    ];
}
