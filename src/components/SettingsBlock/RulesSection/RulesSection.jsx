import Button from '@mui/material/Button';
import { useState } from "react";

import RuleService from "services/RuleService";
import RuleModal from 'components/SettingsBlock/RulesSection/RuleModal';

export default function RulesSection({ rules, setRules }) {
  const refreshRules = async () => {
    const result = await RuleService.getAll();
    setRules(result);
  }

  const createOrUpdateRule = async (ruleData, ruleId = null) => {
    let result = null;

    if (ruleId) {
      result = await RuleService.updateById(ruleId, ruleData);
    } else {
      result = await RuleService.create(ruleData);
    }
    
    if (result) {
      refreshRules();
    }

    return result;
  };
  
  const removeRule = async (id) => {
    const result = await RuleService.removeById(id);
  
    if (result) {
      refreshRules();
    }
  };

  const [ruleModalState, setRuleModalState] = useState({ isOpen: false, values: null });

  const openRuleModal = (ruleValues = null) => {
    setRuleModalState({ isOpen: true, values: ruleValues });
  };

  const closeRuleModal = () => {
    setRuleModalState({ isOpen: false, values: null });
  };

  const ruleModalProps = {
    isOpen: ruleModalState.isOpen, 
    values: ruleModalState.values, 
    close: closeRuleModal, 
    submit: createOrUpdateRule,
  };

  const rulesComponents = rules.map(rule => (
    <div className="settingsItem settingsItem_rule" key={rule.id}>
      <div className='settingsItem-info'>
        <div className='settingsItem-labels'>
          <p>Amount:</p>
          <p>Is equal:</p>
          <p>Animation:</p>
        </div>
        <div className='settingsItem-values'>
          <p>{parseInt(rule.amount)}</p>
          <p>{rule.is_equal ? "Yes" : "No"}</p>
          <p>{rule.animation || ""}</p>
        </div>
      </div>
      <div className='settingsItem-editButton'>
        <Button 
          onClick={() => openRuleModal(rule)}
          variant="outlined" 
          color={"gold"}
        >
          Edit rule
        </Button>
      </div>
      <div className='settingsItem-removeButton'>
        <Button 
          onClick={() => removeRule(rule.id)}
          variant="outlined"
          color={"red"}
        >
          Remove rule
        </Button>
      </div>
    </div>
  ));

  return (
    <div className="settingsSection settingsSection_rules">
      <h2 className="settingsSection-title">
        Animation rules
      </h2>
      <div className="settingsSection-items">
        { rulesComponents }
      </div>
      <div className="settingsSection-createButton">
        <Button 
          onClick={() => openRuleModal()}
          variant="outlined" 
          color="blue"
        >
          Create new rule
        </Button>
      </div>
      <RuleModal { ...ruleModalProps } />
    </div>
  );
}
