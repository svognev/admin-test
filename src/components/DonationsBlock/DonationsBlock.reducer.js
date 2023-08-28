import useCustomReducer from "common/useCustomReducer.js";
import { DonationFolders, DonationActionTypes } from "components/DonationsBlock/DonationsBlock.constants";

const donationsBlockReducer = (state, action) => {
  let donation = null;
  console.warn(188, action);

  if (action.donationId) {
    donation = state.find(el => el.id === action.donationId);

    if (!donation) {
      throw Error('Donation not found: ' + action.donationId);
    }
  }

  switch (action.type) {
    case DonationActionTypes.MOVE_TO_READING_AS_VERIFIED: {
      donation.status = DonationFolders.READING;
      donation.isVerified = true;
      donation.updatedAt = Date.now();
      break;
    }
    case DonationActionTypes.MOVE_TO_READING_AS_WARNED: {
      donation.status = DonationFolders.READING;
      donation.isVerified = false;
      donation.updatedAt = Date.now();
      break;
    }
    case DonationActionTypes.MOVE_TO_ARCHIVE: {
      donation.status = DonationFolders.ARCHIVED;
      donation.isRead = true;
      donation.updatedAt = Date.now();
      break;
    }
    case DonationActionTypes.RETURN_FROM_ARCHIVE: {
      donation.status = DonationFolders.READING;
      donation.updatedAt = Date.now();
      break;
    }
    case DonationActionTypes.REFRESH_NEW_DONATIONS: {
      const donationsToAdd = action.newDonations.filter(({ id }) => state.findIndex(el => el.id === id) === -1);
      state = [ ...state, ...donationsToAdd ];
      return state;
    }
    case DonationActionTypes.SET_ALL_DONATIONS: {
      state = action.newState;
      return state;
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const handlers = {
  moveToReadingAsVerified: (dispatch) => (donationId) => {
    dispatch({
      type: DonationActionTypes.MOVE_TO_READING_AS_VERIFIED,
      donationId,
    });
  },
  
  moveToReadingAsWarned: (dispatch) => (donationId) => {
    dispatch({
      type: DonationActionTypes.MOVE_TO_READING_AS_WARNED,
      donationId,
    });
  },

  moveToArchive: (dispatch) => (donationId) => {
    dispatch({
      type: DonationActionTypes.MOVE_TO_ARCHIVE,
      donationId,
    });
  },

  returnFromArchive: (dispatch) => (donationId) => {
    dispatch({
      type: DonationActionTypes.RETURN_FROM_ARCHIVE,
      donationId,
    });
  },

  refreshNewDonations: (dispatch) => (newDonations) => {
    dispatch({
      type: DonationActionTypes.REFRESH_NEW_DONATIONS,
      newDonations,
    });
  },

  setAllDonations: (dispatch) => (donations) => {
    dispatch({
      type: DonationActionTypes.SET_ALL_DONATIONS,
      newState: donations,
    });
  },
};

const initialState = [];

const useDonationsBlockState = () => useCustomReducer(donationsBlockReducer, handlers, initialState);

export default useDonationsBlockState;