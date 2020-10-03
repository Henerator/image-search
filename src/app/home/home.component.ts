import { Component, OnDestroy, OnInit } from '@angular/core';
import { Photo } from '@shared/models/photo.model';
import { SubscriptionStorage } from '@shared/models/subscriptions-storage';
import { ApiService } from '@shared/services/api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  imagesUrls = [];

  private subscriptions = new SubscriptionStorage();

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.api.get<Photo[]>('https://picsum.photos/v2/list', {
      searchParams: {
        limit: '9',
      }
    })
    .pipe(map(data => data.map(item => item.download_url)))
    .subscribe(urls => this.imagesUrls = urls));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSearchValueChange(value: string): void {
    console.log(value);
  }
}
