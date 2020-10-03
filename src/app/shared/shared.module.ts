import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { ImagesListComponent } from './components/images-list/images-list.component';


@NgModule({
  declarations: [
    ImagesListComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ImagesListComponent
  ],
  providers: [
    ApiService,
  ]
})
export class SharedModule { }
