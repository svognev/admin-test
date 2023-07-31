import dateFormat from "dateformat";
import Chip from '@mui/material/Chip';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';

import "./Message.scss";

export default function Message({
  children,
  donater,
  text,
  amount,
  date,
  isVerified,
  isRead,
}) {
  const formattedDate = dateFormat(date, "dd.mm.yy");
  const messageClassname = `message${!isVerified ? " message_warn" : ""}${isRead ? " message_read" : ""}`;

  return (
    <div className={messageClassname}>
      <div className="message-title">
        <h4 className="message-author">{ donater }</h4>
        <div className="message-amount">
          <Chip label={amount} color="gold" size="small" icon={<CurrencyRubleIcon />} variant="outlined" />
        </div>
      </div>
      <p className="message-date">{ formattedDate }</p>
      <p className="message-text">{ text }</p>
      <div className="message-buttons">{ children }</div>
    </div>
  );
}