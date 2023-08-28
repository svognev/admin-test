import GoalsSection from "components/SettingsBlock/GoalsSection"
import RulesSection from "components/SettingsBlock/RulesSection";

import "./SettingsBlock.scss";

export default function SettingsBlock({ goals, setGoals, rules, setRules }) {
  return (
    <div className="settingsBlock">
      <GoalsSection { ...{ goals, setGoals } } />
      <RulesSection { ...{ rules, setRules } } />
    </div>
  );
}
