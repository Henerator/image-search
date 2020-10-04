import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from './services/api.service';
import { PhotosListComponent } from './components/photos-list/photos-list.component';
import { PhotoComponent } from './components/photo/photo.component';
import { SelectCollectionDialogComponent } from './components/select-collection-dialog/select-collection-dialog.component';
import { CollectionComponent } from './components/collection/collection.component';
import { CollectionsDataService } from './services/collections-data.service';
import { AddCollectionDialogComponent } from './components/add-collection-dialog/add-collection-dialog.component';
import { AddCollectionFormComponent } from './components/add-collection-form/add-collection-form.component';


@NgModule({
    declarations: [
        PhotosListComponent,
        PhotoComponent,
        CollectionComponent,
        SelectCollectionDialogComponent,
        AddCollectionDialogComponent,
        AddCollectionFormComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
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
        AddCollectionDialogComponent,
        CollectionComponent,
    ],
})
export class SharedModule { }
