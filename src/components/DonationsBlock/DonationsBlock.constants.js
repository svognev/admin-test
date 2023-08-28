export const DonationFolders = Object.freeze({
  NEW: "new", 
  READING: "reading",
  ARCHIVED: "archived"
});

export const DonationActionTypes = Object.freeze({
  MOVE_TO_READING_AS_VERIFIED: "MOVE_TO_READING_AS_VERIFIED",
  MOVE_TO_READING_AS_WARNED: "MOVE_TO_READING_AS_WARNED",
  MOVE_TO_ARCHIVE: "MOVE_TO_ARCHIVE",
  RETURN_FROM_ARCHIVE: "RETURN_FROM_ARCHIVE",
  REFRESH_NEW_DONATIONS: "REFRESH_NEW_DONATIONS",
  SET_ALL_DONATIONS: "SET_ALL_DONATIONS",
});
