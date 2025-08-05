import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';
import { ClassicActions } from './classic.actions';
import { HttpMockService } from '../http-mock.service';

@Injectable({ providedIn: 'root' })
export class ClassicEffects {
  #actions$ = inject(Actions);
  #httpMock = inject(HttpMockService);

  buttonClick$ = createEffect(() => {
    return this.#actions$.pipe(
      ofType(ClassicActions.buttonClicked),
      switchMap(() =>
        this.#httpMock.getMock().pipe(
          map((mock) => ClassicActions.getMockSuccess({ mock })),
          catchError(() => EMPTY)
        )
      )
    );
  });
}
