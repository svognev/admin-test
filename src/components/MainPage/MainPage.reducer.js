import useCustomReducer from "common/useCustomReducer.js";
import { MainPageStates } from "components/MainPage/MainPage.constants.js"

const mainPageReducer = (prevState, action) => {
  switch (action.type) {
    case MainPageStates.DONATIONS: {
      return MainPageStates.DONATIONS;
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
  switchToDonations: (dispatch) => () => {
    dispatch({
      type: MainPageStates.DONATIONS,
    });
  },

  switchToSettings: (dispatch) => () => {
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

const initialState = MainPageStates.DONATIONS;

const useMainPageState = () => useCustomReducer(mainPageReducer, handlers, initialState);

export default useMainPageState;