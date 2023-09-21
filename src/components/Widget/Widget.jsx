import { useEffect, useState } from "react";

import TokenService from "services/TokenService";
import { TOKEN } from "constants/index";
import WidgetPage from "components/Widget/WidgetPage/WidgetPage";
import GoalService from "services/GoalService";

import "./Widget.scss";

export default function App() {
  const [tokens, setTokens] = useState();
  const [goal, setGoal] = useState(null);

  const updateGoal = (donateSum) => {
    setGoal(prevState => ({
      ...prevState,
      current: parseInt(prevState.current) + parseInt(donateSum),
    }));
  };

  useEffect(() => {
    async function getTokens() {
      if (TOKEN) {
        const tokens = await TokenService.getAll();
        setTokens(tokens);
      } else {
        setTokens(null);
      }
    }

    async function getGoal() {
      const goals = await GoalService.getAll();

      if (goals?.length) {
        const goal = goals[goals.length - 1];
        setGoal(goal);
      }
    }

    async function loadAllData() {
      await getTokens();
      await getGoal();
    }

    loadAllData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const errorPage = (<h1>Invalid token!</h1>);
  const checkPage = (<h1>Token verification...</h1>);
  
  if (tokens === undefined) {
    return checkPage;
  } else if (tokens === null) {
    return errorPage;
  } else if (!goal) {
    console.warn("Goals not found!");
    return "";
  }

  return (
    <div className="widget">
      <WidgetPage goal={goal} goalCurrent={goal} updateGoal={updateGoal} />
    </div>
  );
}
