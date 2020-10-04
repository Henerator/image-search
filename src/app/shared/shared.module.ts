import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from './services/api.service';
import { PhotosListComponent } from './components/photos-list/photos-list.component';
import { PhotoComponent } from './components/photo/photo.component';
import { SelectCollectionDialogComponent } from './components/select-collection-dialog/select-collection-dialog.component';
import { CollectionComponent } from './components/collection/collection.component';
import { CollectionsDataService } from './services/collections-data.service';


@NgModule({
    declarations: [
        PhotosListComponent,
        PhotoComponent,
        CollectionComponent,
        SelectCollectionDialogComponent,
    ],
    imports: [
        CommonModule,
        NoopAnimationsModule,
        MatDialogModule,
    ],
    exports: [
        PhotosListComponent,
        PhotoComponent,
        CollectionComponent,
    ],
    providers: [
        ApiService,
        CollectionsDataService,
    ],
    entryComponents: [
        SelectCollectionDialogComponent,
        CollectionComponent,
    ],
})
export class SharedModule { }
