import Button from "@mui/material/Button";
import { useState } from "react";

import GoalService from "services/GoalService";
import GoalModal from "components/Admin/SettingsBlock/GoalsSection/GoalModal";
import { DEFAULT_GOAL_STYLE_NAME } from "components/Admin/SettingsBlock/SettingsBlock.constants";

export default function GoalsSection({ goals, setGoals }) {
  const hasLastGoal = goals.length === 1;

  const refreshGoals = async () => {
    const result = await GoalService.getAll();
    setGoals(result);
  };

  const createOrUpdateGoal = async (goalData, goalId = null) => {
    let result = null;

    if (goalId) {
      result = await GoalService.updateById(goalId, goalData);
    } else {
      result = await GoalService.create(goalData);
    }
    
    if (result) {
      refreshGoals();
    }

    return result;
  };
  
  const removeGoal = async (id) => {
    if (!hasLastGoal) {
      const result = await GoalService.removeById(id);
    
      if (result) {
        refreshGoals();
      }
    }
  };

  const [goalModalState, setGoalModalState] = useState({ isOpen: false, values: null });

  const openGoalModal = (goalValues = null) => {
    setGoalModalState({ isOpen: true, values: goalValues });
  };

  const closeGoalModal = () => {
    setGoalModalState({ isOpen: false, values: null });
  };

  const goalModalProps = {
    isOpen: goalModalState.isOpen, 
    values: goalModalState.values, 
    close: closeGoalModal, 
    submit: createOrUpdateGoal,
  };

  const goalsComponents = goals.map(goal => (
    <div className="settingsItem settingsItem_goal" key={goal.id}>
      <div className="settingsItem-info">
        <div className="settingsItem-labels">
          <p>Name:</p>
          <p>Max limit:</p>
          <p>Current:</p>
          <p>Style:</p>
        </div>
        <div className="settingsItem-values">
          <p>{goal.name}</p>
          <p>{parseInt(goal.max_limit)}</p>
          <p>{parseInt(goal.current)}</p>
          <p>{goal.style || DEFAULT_GOAL_STYLE_NAME}</p>
        </div>
      </div>
      <div className="settingsItem-editButton">
        <Button 
          onClick={() => openGoalModal(goal)}
          variant="outlined" 
          color={"gold"}
        >
          Edit goal
        </Button>
      </div>
      <div className="settingsItem-removeButton">
        <Button 
          onClick={() => removeGoal(goal.id)}
          disabled={hasLastGoal}
          variant="outlined" 
          color={hasLastGoal ? "gainsboro" : "red"}
        >
          Remove goal
        </Button>
      </div>
    </div>
  ));

  return (
    <div className="settingsSection settingsSection_goals">
      <h2 className="settingsSection-title">
        Donate goals
      </h2>
      <div className="settingsSection-items">
        { goalsComponents }
      </div>
      <div className="settingsSection-createButton">
        <Button 
          onClick={() => openGoalModal()}
          variant="outlined" 
          color="blue"
        >
          Create new goal
        </Button>
      </div>
      <GoalModal { ...goalModalProps }/>
    </div>
  );
}
