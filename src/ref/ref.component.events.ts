import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';

export const refComponentEvents = eventGroup({
  source: 'RefComponent',
  events: {
    inputChange: type<{ input: string | null }>(),
    buttonClicked: type<void>(),
  },
});
