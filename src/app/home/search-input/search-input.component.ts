import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CONTROL_VALUE_CHANGE_DELAY } from '@shared/constants/controls.const';
import { SubscriptionStorage } from '@shared/models/subscriptions-storage';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit, OnDestroy {
  @Input() placeholder = '';
  @Output() valueChange = new EventEmitter<string>();

  inputControl = new FormControl('');

  private subscriptions = new SubscriptionStorage();

  ngOnInit(): void {
    this.subscriptions.add(
      this.inputControl.valueChanges.pipe(
        debounceTime(CONTROL_VALUE_CHANGE_DELAY),
        distinctUntilChanged()
      )
      .subscribe(value => this.valueChange.emit(value))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
