import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from './home/home.component';
import { SearchInputComponent } from './home/search-input/search-input.component';
import { CollectionsComponent } from './collections/collections.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchInputComponent,
    CollectionsComponent,
    NavigationMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
