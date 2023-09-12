import useMainPageState from "components/MainPage/MainPage.reducer";
import { MainPageStates } from "components/MainPage/MainPage.constants.js";
import DonationsBlock from "components/DonationsBlock";
import TokensBlock from "components/TokensBlock";
import SettingsBlock from "components/SettingsBlock/SettingsBlock";

import "./MainPage.scss";

export default function MainPage({
  tokens, setTokens,
  goals, setGoals,
  rules, setRules,
  donations, donationsHandlers,
}) {
  const [state, handlers] = useMainPageState();
  const { switchToDonations, switchToSettings, switchToTokens } = handlers;

  const donationsButtonClassName = `header-button${state === MainPageStates.DONATIONS ? " header-button_active" : ""}`;
  const settingsButtonClassName = `header-button${state === MainPageStates.SETTINGS ? " header-button_active" : ""}`;
  const tokensButtonClassName = `header-button${state === MainPageStates.TOKENS ? " header-button_active" : ""}`;

  return (
    <div className="mainPage">
      <div className="header">
        <div className="header-buttons">
          <button className={donationsButtonClassName} onClick={switchToDonations}>DONATIONS</button>
          <button className={settingsButtonClassName} onClick={switchToSettings}>SETTINGS</button>
          <button className={tokensButtonClassName} onClick={switchToTokens}>TOKENS</button>
        </div>
      </div>
      { state === MainPageStates.DONATIONS ? <DonationsBlock state={donations} handlers={donationsHandlers}/> : "" }
      { state === MainPageStates.SETTINGS ? <SettingsBlock { ...{ goals, setGoals, rules, setRules } } /> : "" }
      { state === MainPageStates.TOKENS ? <TokensBlock { ...{ tokens, setTokens } } /> : "" } 
    </div>
  );
}
