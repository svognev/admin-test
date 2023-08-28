import Button from '@mui/material/Button';

import TokenService from "services/TokenService";
import { TOKEN } from "constants/index";
import { formatDate } from "common/utils";

import "./TokensBlock.scss";

export default function TokenBlock({ tokens, setTokens }) {
  const refreshTokens = async () => {
    const tokens = await TokenService.getAll();
    setTokens(tokens);
  }
  
  const createToken = async () => {
    const newToken = await TokenService.create();
    
    if (newToken) {
      refreshTokens();
    }
  }

  const removeToken = async (id) => {
    if (id !== TOKEN) {
      const result = await TokenService.removeById(id);
    
      if (result) {
        refreshTokens();
      }
    }
  }

  const tokensComponents = (tokens || []).map(token => (
    <div className="token" key={token.token}>
      <h4 className='token-title'>{token.token}</h4>
      <div className='token-metadata'>
        <div className='token-labels'>
          <p>Created:</p>
          <p>Used at:</p>
        </div>
        <div className='token-values'>
          <p>{formatDate(token.created_at)}</p>
          <p>{formatDate(token.used_at)}</p>
        </div>
      </div>
      <div className='token-removeButton'>
        <Button 
          onClick={() => removeToken(token.token)}
          disabled={token.token === TOKEN}
          variant="outlined" 
          color={token.token === TOKEN ? "gainsboro" : "red"}
        >
          Remove token
        </Button>
      </div>
    </div>
  ));

  return (
    <div className="tokenBlock">
      <div className="tokenBlock-createButton">
        <Button 
          onClick={createToken}
          variant="outlined" 
          color="blue"
        >
          Create new token
        </Button>
      </div>
      <div className="tokenBlock-tokens">
        { tokensComponents }
      </div>
    </div>
  );
}

