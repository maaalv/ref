import { Component, inject } from '@angular/core';
import { Dispatcher } from '@ngrx/signals/events';
import { refComponentEvents } from './ref.component.events';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RefComponentStore } from './ref.component.store';
import { GlobalStore } from '../global/global.store';
import { Store } from '@ngrx/store';
import { ClassicActions } from '../classic-store/classic.actions';

@Component({
  selector: 'ref',
  imports: [ReactiveFormsModule],
  providers: [RefComponentStore],
  template: `
    <div class="p-4">
      <input
        [formControl]="inputControl"
        (change)="inputChange()"
        class="border mr-2 p-2"
      />
      <button (click)="buttonClicked()" class="border p-2">Button</button>

      {{ store.a.very.deep.object() }}
    </div>
  `,
})
export class RefComponent {
  // Classic ngrx
  #globalStore = inject(Store);

  // Modern ngrx
  #dispatcher = inject(Dispatcher);
  protected readonly globalStore = inject(GlobalStore);
  protected readonly store = inject(RefComponentStore);

  protected inputControl = new FormControl<string>('');

  protected inputChange() {
    const { value: input } = this.inputControl;

    this.#dispatcher.dispatch(refComponentEvents.inputChange({ input }));
    this.#globalStore.dispatch(() => ClassicActions.inputChanged({ input }));
  }

  protected buttonClicked() {
    this.#dispatcher.dispatch(refComponentEvents.buttonClicked());
    this.#globalStore.dispatch(() => ClassicActions.buttonClicked());
  }
}
