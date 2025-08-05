import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { signalStore, withMethods, withState } from '@ngrx/signals';

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withDevtools('Global'),
  withState({
    wow: 100,
  }),
  withMethods(() => {
    return {};
  })
);
