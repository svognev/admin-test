import useCustomReducer from "common/useCustomReducer.js";
import { MainPageStates } from "components/MainPage/MainPage.constants.js"

const mainPageReducer = (newState, action) => {
  switch (action.type) {
    case MainPageStates.MESSAGES: {
      return MainPageStates.MESSAGES;
    }
    case MainPageStates.SETTINGS: {
      return MainPageStates.SETTINGS;
    }
    case MainPageStates.TOKENS: {
      return MainPageStates.TOKENS;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const handlers = {
  switchToMessages: (dispatch) => () => {
    dispatch({
      type: MainPageStates.MESSAGES,
    });
  },

  switchToSettings: (dispatch) => () => {
    console.warn(122);
    dispatch({
      type: MainPageStates.SETTINGS,
    });
  },

  switchToTokens: (dispatch) => () => {
    dispatch({
      type: MainPageStates.TOKENS,
    });
  }
};

const initialState = MainPageStates.MESSAGES;

const useMainPageState = () => useCustomReducer(mainPageReducer, handlers, initialState);

export default useMainPageState;