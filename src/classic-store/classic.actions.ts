import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ClassicActions = createActionGroup({
  source: 'Classic',
  events: {
    inputChanged: props<{ input: string | null }>(),
    buttonClicked: emptyProps(),
    getMockSuccess: props<{ mock: string }>(),
  },
});
