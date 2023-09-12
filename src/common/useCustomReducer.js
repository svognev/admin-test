import { useImmerReducer } from "use-immer";

const useCustomReducer = (reducer, handlers, initialState) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const dispatchedHandlers = {};

  Object.keys(handlers).forEach(key => {
    dispatchedHandlers[key] = handlers[key](dispatch);
  });
  
  return [state, dispatchedHandlers];
};

export default useCustomReducer;