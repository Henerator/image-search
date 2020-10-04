import { Injectable, OnDestroy } from '@angular/core';
import { SubscriptionStorage } from '@shared/models/subscriptions-storage';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export abstract class BaseDataService<T> implements OnDestroy {
    data$: Observable<T>;
    error$: Observable<any>;
    isLoading$: Observable<boolean>;

    private subscriptionStorage: SubscriptionStorage = new SubscriptionStorage();

    private data = new Subject<T>();
    private error = new Subject();
    private isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private storage: T = null;

    constructor() {
        this.data$ = this.data.asObservable();
        this.error$ = this.error.asObservable();
        this.isLoading$ = this.isLoading.asObservable();
    }

    ngOnDestroy(): void {
        this.onFetchDone();
    }

    fetchData(dataStream$: Observable<T>): void {
        this.cancelActiveRequest();
        this.resetError();
        this.startLoading();

        this.subscriptionStorage.add(dataStream$
            .subscribe((data: T) => {
                this.updateStorage(data);
                this.onFetchDone();
            }, (error) => {
                this.raiseError(error);
                this.onFetchDone();
            })
        );
    }

    protected getStorage(): T {
        if (this.storage) {
            return (Array.isArray(this.storage)
                ? this.storage.slice()
                : Object.assign({}, this.storage)) as T;
        }
        return this.storage;
    }

    protected updateStorage(storage: T): void {
        this.storage = storage;
        this.data.next(this.storage);
    }

    private startLoading(): void {
        this.isLoading.next(true);
    }

    private stopLoading(): void {
        this.isLoading.next(false);
    }

    private raiseError(error: any): void {
        this.error.next(error);
    }

    private resetError(): void {
        this.error.next(null);
    }

    private onFetchDone(): void {
        this.stopLoading();
        this.subscriptionStorage.unsubscribe();
    }

    private cancelActiveRequest(): void {
        this.subscriptionStorage.unsubscribe();
    }
}
