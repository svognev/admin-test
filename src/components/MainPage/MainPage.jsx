import useMainPageState from 'components/MainPage/MainPage.reducer';
import { MainPageStates } from "components/MainPage/MainPage.constants.js";
import MessagesBlock from 'components/MessagesBlock/MessagesBlock';
import useMessagesBlockState from "components/MessagesBlock/MessagesBlock.reducer";
import "./MainPage.scss";

export default function MainPage() {
  const [state, handlers] = useMainPageState();
  const [messagesState, messagesHandlers] = useMessagesBlockState();
  const { switchToMessages, switchToSettings, switchToTokens } = handlers;

  const messagesButtonClassName = `header-button${state === MainPageStates.MESSAGES ? " header-button_active" : ""}`;
  const settingsButtonClassName = `header-button${state === MainPageStates.SETTINGS ? " header-button_active" : ""}`;
  const tokensButtonClassName = `header-button${state === MainPageStates.TOKENS ? " header-button_active" : ""}`;

  return (
    <div className="mainPage">
      <div className="header">
        <div className="header-buttons">
          <button className={messagesButtonClassName} onClick={switchToMessages}>MESSAGES</button>
          <button className={settingsButtonClassName} onClick={switchToSettings}>SETTINGS</button>
          <button className={tokensButtonClassName} onClick={switchToTokens}>TOKENS</button>
        </div>
      </div>
      { state === MainPageStates.MESSAGES ? <MessagesBlock state={messagesState} handlers={messagesHandlers}/> : "" }
      {/* { state === MainPageStates.SETTINGS ? <h1>Настройки</h1> : "" }
      { state === MainPageStates.TOKENS ? <h1>Токены</h1> : "" } */}
    </div>
  );
}
