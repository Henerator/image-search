import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { PhotosListComponent } from './components/photos-list/photos-list.component';
import { PhotoComponent } from './components/photo/photo.component';


@NgModule({
  declarations: [
    PhotosListComponent,
    PhotoComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PhotosListComponent,
    PhotoComponent,
  ],
  providers: [
    ApiService,
  ]
})
export class SharedModule { }
