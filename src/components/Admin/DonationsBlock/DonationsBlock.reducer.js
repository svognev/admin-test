import useCustomReducer from "common/useCustomReducer.js";
import { DonationActionTypes } from "components/Admin/DonationsBlock/DonationsBlock.constants";

const donationsBlockReducer = (state, action) => {
  switch (action.type) {
    case DonationActionTypes.UPDATE_DONATION: {
      const donationIndex = state.findIndex(el => el.id === action.donation.id);

      if (donationIndex !== -1) {
        state[donationIndex] = action.donation;
      }

      break;
    }
    case DonationActionTypes.ADD_NEW_DONATION: {
      state = [ ...state, action.donation ];
      return state;
    }
    case DonationActionTypes.SET_ALL_DONATIONS: {
      state = action.donations;
      return state;
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const handlers = {
  setAllDonations: (dispatch) => (donations) => {
    dispatch({
      type: DonationActionTypes.SET_ALL_DONATIONS,
      donations,
    });
  },

  addNewDonation: (dispatch) => (donation) => {
    dispatch({
      type: DonationActionTypes.ADD_NEW_DONATION,
      donation,
    });
  },

  updateDonation: (dispatch) => (donation) => {
    dispatch({
      type: DonationActionTypes.UPDATE_DONATION,
      donation,
    });
  },
};

const initialState = [];

const useDonationsBlockState = () => useCustomReducer(donationsBlockReducer, handlers, initialState);

export default useDonationsBlockState;