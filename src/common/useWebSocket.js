import { useEffect } from "react";
import { WS_URL, TOKEN } from "constants/index";

const useWebSocket = (route, onMessage) => {
  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}/${route}?${new URLSearchParams({ access_token: TOKEN })}`);

    ws.onopen = () => {
      console.log(`WS "${route}" connection established!`);
    };
  
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);  
      onMessage(response);
    };
  
    ws.onclose = () => {
      console.log(`WS "${route}" connection closed!`);
    };
  
    ws.onerror = () => {
      console.log(`WS "${route}" error`);
    };
  
    return () => {
      ws.close();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useWebSocket;
