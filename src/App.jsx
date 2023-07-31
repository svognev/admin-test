import { useEffect, useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import AuthService from "services/authService";
import MainPage from "components/MainPage";
import theme from "./theme";
import "./App.scss";

export default function MyApp() {
  const searchParams = new URLSearchParams(document.location.search);
  const token = searchParams.get("access_token");
  
  const [isAuthorized, setIsAuthorized] = useState();
  
  useEffect(() => {
    async function checkToken() {
      if (token) {
        const checkResult = await AuthService.checkToken(token);
        setIsAuthorized(checkResult);
      } else {
        setIsAuthorized(false);
      }
    }

    checkToken();
  }, [token]);

  const errorPage = (<h1>Invalid token!</h1>);
  const checkPage = (<h1>Token verification...</h1>);
  const pageToDisplay = isAuthorized ? (<MainPage/>) : isAuthorized === false ? errorPage : checkPage;   

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        {pageToDisplay}
      </div>
    </ThemeProvider>
  );
}
