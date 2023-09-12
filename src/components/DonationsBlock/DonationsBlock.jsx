import { useState } from "react";
import { isMobile } from "react-device-detect";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import CastConnectedIcon from "@mui/icons-material/CastConnected";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { DonationFolders } from "components/DonationsBlock/DonationsBlock.constants";
import Donation from "components/DonationsBlock/Donation/Donation";
import DonationService from "services/DonationService";
import useWebSocket from "common/useWebSocket";

import "./DonationsBlock.scss";

const { NEW, READING, ARCHIVED } = DonationFolders;

export default function DonationsBlock({ state, handlers: reducerHandlers }) {
  
  useWebSocket("new", (donation) => {
    reducerHandlers.addNewDonation(donation);
  });

  useWebSocket("validate", (donation) => {
    reducerHandlers.updateDonation(donation);
  });

  useWebSocket("read", (donation) => {
    reducerHandlers.updateDonation(donation);
  });

  const moveToReadingAsVerified = async(id) => {
    await DonationService.moveToReading(id);
  };

  const moveToReadingAsWarned = async(id) => {
    await DonationService.moveToReading(id, true);
  };
  
  const moveToArchive = async(id) => {
    await DonationService.moveToArchive(id);
  };
  
  const returnFromArchive = async(id) => {
    await DonationService.returnFromArchive(id);
  };

  const [isSuccessAlertOpen, setSuccessAlertOpen] = useState(false);
  const [folder, setFolder] = useState(NEW);

  const showNextFolder = () => {
    const nextFolder = folder === NEW ? READING : folder === READING ? ARCHIVED : NEW;
    setFolder(nextFolder);
  };

  const showPreviousFolder = () => {
    const previousFolder = folder === NEW ? ARCHIVED : folder === READING ? NEW : READING;
    setFolder(previousFolder);
  };

  const openSuccessAlert = () => {
    setSuccessAlertOpen(true);
  };

  const closeSuccessAlert = () => {
    setSuccessAlertOpen(false);
  };

  const showOnDisplay = (id) => async () => {
    await DonationService.resend(id);
    openSuccessAlert();
  };

  const donationsToVerify = state.filter(el => el.status === NEW)
    .sort((a, b) => a.created_at < b.created_at ? -1 : 1)
    .map(({ id, ...props}) => (
      <Donation key={id} {...props}>
        <Button 
          onClick={() => moveToReadingAsWarned(id)}
          variant="outlined" 
          endIcon={<ReportGmailerrorredIcon />}
          color="orange"
        >
          Send as warned
        </Button>
        <Button 
          onClick={() => moveToReadingAsVerified(id)}
          variant="outlined" 
          endIcon={<ArrowForwardIcon />}
          color="seagreen"
        >
          Send as verified
        </Button>
      </Donation>
    ));
  
  const donationsToRead = state.filter(el => el.status === READING)
    .sort((a, b) => a.updated_at < b.updated_at ? -1 : 1)
    .map(({ id, ...props}) => (
      <Donation key={id} {...props}>
        <Button 
          onClick={showOnDisplay(id)}
          variant="outlined" 
          endIcon={<CastConnectedIcon />}
          color="gainsboro"
        >
          Show on screen
        </Button>
        <Button 
          onClick={() => moveToArchive(id)}
          variant="outlined" 
          endIcon={<ArrowForwardIcon />}
          color="seagreen"
        >
          Move to archive
        </Button>
      </Donation>
    ));

  const archivedDonations = state.filter(el => el.status === ARCHIVED)
    .sort((a, b) => a.updated_at < b.updated_at ? -1 : 1)
    .map(({ id, ...props}) => (
      <Donation key={id} {...props}>
        <Button 
          onClick={showOnDisplay(id)}
          variant="outlined" 
          endIcon={<CastConnectedIcon />}
          color="gainsboro"
        >
          Show on screen
        </Button>
        <Button 
          onClick={() => returnFromArchive(id)}
          variant="outlined" 
          startIcon={<ArrowBackIcon />}
          color="seagreen"
        >
          Return to reading
        </Button>
      </Donation>
    ));

  return (
    <div className="donationsBlock">
      <div className="donationBlock-arrows">
        <IconButton
          onClick={showPreviousFolder}
          color="gainsboro"
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          onClick={showNextFolder}
          color="gainsboro"
        >
          <ArrowForwardIcon />
        </IconButton>
      </div>
      { !isMobile || folder === NEW ? (
          <div className="donationsCol">
            <h3 className="donationsCol-title">Unverified</h3>
            <div className="donationsCol-donations">
              { donationsToVerify }
            </div>
          </div>
        ) : ("")
      }
      { !isMobile || folder === READING ? (
          <div className="donationsCol">
            <h3 className="donationsCol-title">Reading</h3>
            <div className="donationsCol-donations">
              { donationsToRead }
            </div>
          </div>
        ) : ("")
      }
      
      { !isMobile || folder === ARCHIVED ? (
          <div className="donationsCol">
            <h3 className="donationsCol-title">Archived</h3>
            <div className="donationsCol-donations">
              { archivedDonations }
            </div>
          </div>
        ) : ("")
      }
      <div className="donationsAlert">
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={isSuccessAlertOpen}
          onClose={closeSuccessAlert}
          message="Success!"
          color="green"
          autoHideDuration="800"
        />
      </div>
    </div>
  );
}
