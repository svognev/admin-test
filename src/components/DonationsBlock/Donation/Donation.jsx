import dateFormat from "dateformat";
import Chip from '@mui/material/Chip';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';

import "./Donation.scss";

export default function Donation({
  children,
  donator,
  text,
  amount_in_rub,
  created_at,
  is_good,
}) {
  const formattedDate = dateFormat(created_at, "dd.mm.yy hh:MM");
  const donationClassname = `donation${!is_good ? " donation_warn" : ""}`;
  const amount = parseInt(amount_in_rub);

  return (
    <div className={donationClassname}>
      <div className="donation-title">
        <h4 className="donation-author">{ donator }</h4>
        <div className="donation-amount">
          <Chip label={amount} color="gold" size="small" icon={<CurrencyRubleIcon />} variant="outlined" />
        </div>
      </div>
      <p className="donation-date">{ formattedDate }</p>
      <p className="donation-text">{ text }</p>
      <div className="donation-buttons">{ children }</div>
    </div>
  );
}