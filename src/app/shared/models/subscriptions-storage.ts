import { Subscription } from 'rxjs';

export class SubscriptionStorage {
    private subscriptions: Subscription[] = [];

    add(subcription: Subscription): void {
        this.subscriptions.push(subcription);
    }

    unsubscribe(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
