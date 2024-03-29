import Grid, { Orientation } from "../types/grid";
import ToggleBlockCommand from "./toggleBlockCommand";
import UpdateFillCommand from "./updateFillCommand";
import MoveCommand from "./moveCommand";
import NextWordCommand from "./nextWordCommand";

export const GridActions = {
  keyDown: 'keydown',
  updateFill: 'updateFill',
  deleteFill: 'deleteFill',
  toggleBlock: 'toggleBlock',
  moveleft: 'moveleft',
  moveright: 'moveright',
  moveup: 'moveup',
  movedown: 'movedown',
  moveNext: 'movenext',
  click: 'click',
  toggleOrientation: 'toggleOrientation',
  nextWord: 'nextWord',
};

export type GridReducerPayload = {
  x: number,
  y: number,
  value: string
};

const gridReducer = (state: Grid, action: {type: string, payload: GridReducerPayload}): Grid => {
  const payload: GridReducerPayload = action.payload;
  let newCoords: [number, number] = [0,0];


  switch(action.type) {
  case GridActions.toggleBlock:
    return new ToggleBlockCommand(payload.x, payload.y).do(state);
  case GridActions.updateFill:
    newCoords = state.orientation == Orientation.across ?
      [state.xPos, state.yPos + 1] : [state.xPos + 1, state.yPos];

    return new MoveCommand(...newCoords,
                          state.orientation).do(new UpdateFillCommand(payload.x, payload.y, payload.value).do(state));
  case GridActions.deleteFill:
    newCoords = state.orientation == Orientation.across ?
      [state.xPos, state.yPos - 1] : [state.xPos - 1, state.yPos];

    return new MoveCommand(...newCoords,
                           state.orientation).do(new UpdateFillCommand(payload.x, payload.y, '').do(state));
  case GridActions.moveleft:
    if(state.yPos > 0)
      return new MoveCommand(state.xPos, state.yPos-1,
                            Orientation.across).do(state);
    return state;
  case GridActions.moveright:
    if(state.yPos < (state.width-1))
      return new MoveCommand(state.xPos, state.yPos+1,
                            Orientation.across).do(state);
    return state;
  case GridActions.moveup:
    if(state.xPos > 0)
      return new MoveCommand(state.xPos-1, state.yPos,
                            Orientation.down).do(state);
    return state;
  case GridActions.movedown:
    if(state.xPos < (state.height-1))
      return new MoveCommand(state.xPos+1, state.yPos,
                            Orientation.down).do(state);
    return state;
  case GridActions.click:
    return new MoveCommand(payload.x, payload.y,
                           state.orientation).do(state);
  case GridActions.toggleOrientation:
    return new MoveCommand(state.xPos, state.yPos,
                           state.orientation === Orientation.across ?
                           Orientation.down : Orientation.across).do(state);
  case GridActions.nextWord:
    return new NextWordCommand().do(state);
  default:
    return state;
  };
};

export default gridReducer;
