import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";

import TokenService from "services/TokenService";
import GoalService from "services/GoalService";
import RuleService from "services/RuleService";
import DonationService from "services/DonationService";
import MainPage from "components/MainPage";
import { TOKEN } from "constants/index";
import useDonationsBlockState from "components/DonationsBlock/DonationsBlock.reducer";
import theme from "./theme";

import "./App.scss";

export default function App() {
  const [tokens, setTokens] = useState();
  const [goals, setGoals] = useState([]);
  const [rules, setRules] = useState([]);
  const [donations, donationsHandlers] = useDonationsBlockState([]);
 
  useEffect(() => {
    async function getTokens() {
      if (TOKEN) {
        const tokens = await TokenService.getAll();
        setTokens(tokens);
      } else {
        setTokens(null);
      }
    }

    async function getGoals() {
      const goals = await GoalService.getAll();
      setGoals(goals);
    }

    async function getRules() {
      const rules = await RuleService.getAll();
      setRules(rules);
    }
    
    async function getDonations() {
      const donations = await DonationService.getAll();
      donationsHandlers.setAllDonations(donations);
    }

    async function loadAllData() {
      await getGoals();
      await getRules();
      await getDonations();
      await getTokens();
    }

    loadAllData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const errorPage = (<h1>Invalid token!</h1>);
  const checkPage = (<h1>Token verification...</h1>);
  const mainPageProps = { tokens, setTokens, goals, setGoals, rules, setRules, donations, donationsHandlers };
  const pageToDisplay = tokens === undefined ? checkPage : tokens === null ? errorPage : (<MainPage { ...mainPageProps }/>);   

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        {pageToDisplay}
      </div>
    </ThemeProvider>
  );
}
