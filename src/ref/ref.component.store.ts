import { inject } from '@angular/core';
import { signalStore, withState } from '@ngrx/signals';
import { Events, on, withEffects, withReducer } from '@ngrx/signals/events';
import { refComponentEvents } from './ref.component.events';
import { switchMap, tap } from 'rxjs';
import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { HttpMockService } from '../http-mock.service';

export const RefComponentStore = signalStore(
  withDevtools('RefComponent'),
  withState({
    a: {
      very: {
        deep: {
          object: 100,
        },
      },
    },
    b: '',
    c: '',
    _andAPrivate: 200,
  }),
  withReducer(
    on(refComponentEvents.inputChange, () => ({ c: '' + Math.random() * 1000 }))
  ),
  withEffects((store) => {
    const events = inject(Events);
    const httpMock = inject(HttpMockService);

    return {
      inputChange$: events
        .on(refComponentEvents.inputChange)
        .pipe(tap(({ type, payload: { input } }) => console.warn(input))),

      buttonClicked$: events.on(refComponentEvents.buttonClicked).pipe(
        tap(({ type }) =>
          updateState(store, type, {
            a: {
              very: {
                deep: {
                  object: Math.random() * 100,
                },
              },
            },
          })
        ),
        switchMap(({ type }) =>
          httpMock
            .getMock()
            .pipe(
              tap((mock) =>
                updateState(store, type, { b: mock + Math.random() * 1000 })
              )
            )
        )
      ),
    };
  })
);
