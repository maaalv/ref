import { createFeature, createReducer, on } from '@ngrx/store';
import { ClassicActions } from './classic.actions';

interface State {
  number: number;
  string: string | null;
}

const initialState: State = {
  number: 0,
  string: '',
};

export const classicFeature = createFeature({
  name: 'classic',
  reducer: createReducer(
    initialState,
    on(ClassicActions.inputChanged, (state, { input }) => ({
      ...state,
      string: input,
    })),
    on(ClassicActions.buttonClicked, (state) => ({
      ...state,
      number: state.number + 1,
    })),
    on(ClassicActions.getMockSuccess, (state, { mock }) => ({
      ...state,
      string: mock,
    }))
  ),
});

export const {
  //
  name,
  reducer,
  selectClassicState,
  selectNumber,
  selectString,
} = classicFeature;
