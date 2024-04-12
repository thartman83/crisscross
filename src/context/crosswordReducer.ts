import Crossword from "../types/crossword";
import CrosswordCommand from "../types/crosswordCommand";

export const CrosswordActions = {
  newCrossword: 'newCrossword',
  crosswordCommand: 'crosswordCommand',
  undoCrosswordCommand: 'undoCrosswordCommand'
};

export type CrosswordActionPayload = {
  x: number,
  y: number,
  value: string,
};

const crosswordReducer =
  (crossword: Crossword,
   action: {type: string, payload: CrosswordCommand[] }) => {
  const actionType = action.type;

  let newCrosswordState = crossword;
  const cmds = action.payload;

  switch (actionType) {

    case CrosswordActions.crosswordCommand: {
      newCrosswordState = cmds.reduce((acc, cmd) => cmd.do(acc), crossword);
      break;
    }

    case CrosswordActions.undoCrosswordCommand: {
      newCrosswordState = cmds.reduce((acc, cmd) => cmd.undo(acc), crossword);
      break;
    }

    case CrosswordActions.newCrossword: {
      newCrosswordState = cmds[0].do(crossword);
      break;
    }

    default:
      newCrosswordState = crossword;
  }

  localStorage.setItem('crossword', JSON.stringify(newCrosswordState));

  return newCrosswordState;
};

export default crosswordReducer;
