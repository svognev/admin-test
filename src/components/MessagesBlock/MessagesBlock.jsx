import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CastConnectedIcon from '@mui/icons-material/CastConnected';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { MessageFolders } from "components/MessagesBlock/MessagesBlock.constants";
import Message from "components/MessagesBlock/Message/Message";

import "./MessagesBlock.scss"

export default function MessagesBlock({ state, handlers }) {
  const { 
    moveToReadingAsVerified,
    moveToReadingAsWarned,
    markAsRead,
    moveToArchive,
    returnFromArchive,
  } = handlers;

  const { VERIFICATION, READING, ARCHIVE } = MessageFolders;

  const [isSuccessAlertOpen, setSuccessAlertOpen] = useState(false);
  const [folder, setFolder] = useState(VERIFICATION);

  const moveToNextFolder = () => {
    const nextFolder = folder === VERIFICATION ? READING : folder === READING ? ARCHIVE : VERIFICATION;
    setFolder(nextFolder);
  };
  const moveToPreviousFolder = () => {
    const previousFolder = folder === VERIFICATION ? ARCHIVE : folder === READING ? VERIFICATION : READING;
    setFolder(previousFolder);
  };

  const openSuccessAlert = () => {
    setSuccessAlertOpen(true);
  };

  const closeSuccessAlert = () => {
    setSuccessAlertOpen(false);
  };

  const showOnDisplay = (id) => async () => {
    await new Promise(res => setTimeout(() => res(), 600));
    openSuccessAlert();
    markAsRead(id);
  };

  const messagesToVerify = state.filter(el => el.folder === VERIFICATION)
    .map(({ id, ...props}) => (
      <Message key={id} {...props}>
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
      </Message>
    ));
  
  const messagesToRead = state.filter(el => el.folder === READING)
    .map(({ id, ...props}) => (
      <Message key={id} {...props}>
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
      </Message>
    ));

  const archivedMessages = state.filter(el => el.folder === ARCHIVE)
    .map(({ id, ...props}) => (
      <Message key={id} {...props}>
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
      </Message>
    ));

  return (
    <div className="messagesBlock">
      <div className="messageBlock-arrows">
        <IconButton
          onClick={moveToPreviousFolder}
          color="gainsboro"
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          onClick={moveToNextFolder}
          color="gainsboro"
        >
          <ArrowForwardIcon />
        </IconButton>
      </div>
      { !isMobile || folder === VERIFICATION ? (
          <div className="messagesCol">
            <h3 className="messagesCol-title">Unverified</h3>
            <div className="messagesCol-messages">
              { messagesToVerify }
            </div>
          </div>
        ) : ("")
      }
      { !isMobile || folder === READING ? (
          <div className="messagesCol">
            <h3 className="messagesCol-title">Reading</h3>
            <div className="messagesCol-messages">
              { messagesToRead }
            </div>
          </div>
        ) : ("")
      }
      
      { !isMobile || folder === ARCHIVE ? (
          <div className="messagesCol">
            <h3 className="messagesCol-title">Archived</h3>
            <div className="messagesCol-messages">
              { archivedMessages }
            </div>
          </div>
        ) : ("")
      }
      <div className="messagesAlert">
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
