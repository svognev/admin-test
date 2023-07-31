import useCustomReducer from "common/useCustomReducer.js";
import { MessageFolders, MessageActionTypes } from "components/MessagesBlock/MessagesBlock.constants";

const messagesBlockReducer = (newState, action) => {
  const message = newState.find(el => el.id === action.messageId);

  if (!message) {
    throw Error('Message not found: ' + action.messageId);
  }

  switch (action.type) {
    case MessageActionTypes.MOVE_TO_READING_AS_VERIFIED: {
      message.folder = MessageFolders.READING;
      message.isVerified = true;
      message.updatedAt = Date.now();
      break;
    }
    case MessageActionTypes.MOVE_TO_READING_AS_WARNED: {
      message.folder = MessageFolders.READING;
      message.isVerified = false;
      message.updatedAt = Date.now();
      break;
    }
    case MessageActionTypes.MARK_AS_READ: {
      message.isRead = true;
      break;
    }
    case MessageActionTypes.MOVE_TO_ARCHIVE: {
      message.folder = MessageFolders.ARCHIVE;
      message.isRead = true;
      message.updatedAt = Date.now();
      break;
    }
    case MessageActionTypes.RETURN_FROM_ARCHIVE: {
      message.folder = MessageFolders.READING;
      message.updatedAt = Date.now();
      break;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const handlers = {
  moveToReadingAsVerified: (dispatch) => (messageId) => {
    dispatch({
      type: MessageActionTypes.MOVE_TO_READING_AS_VERIFIED,
      messageId,
    });
  },
  moveToReadingAsWarned: (dispatch) => (messageId) => {
    dispatch({
      type: MessageActionTypes.MOVE_TO_READING_AS_WARNED,
      messageId,
    });
  },
  markAsRead: (dispatch) => (messageId) => {
    dispatch({
      type: MessageActionTypes.MARK_AS_READ,
      messageId,
    });
  },
  moveToArchive: (dispatch) => (messageId) => {
    dispatch({
      type: MessageActionTypes.MOVE_TO_ARCHIVE,
      messageId,
    });
  },
  returnFromArchive: (dispatch) => (messageId) => {
    dispatch({
      type: MessageActionTypes.RETURN_FROM_ARCHIVE,
      messageId,
    });
  },
};

const initialState = [
  {
    id: 1,
    donater: "Хугуберт",
    text: "Ваш любимый цвет, цветок, запах, звук?",
    amount: 500,
    folder: MessageFolders.VERIFICATION,
    isVerified: true,
    isRead: false,
    createdAt: 10000,
    updatedAt: Date.now(),
  },
  {
    id: 2,
    donater: "Джозеф",
    text: "Есть ли у вас домашние животные и какие?",
    amount: 400,
    folder: MessageFolders.VERIFICATION,
    isVerified: true,
    isRead: false,
    createdAt: 20000,
    updatedAt: Date.now(),
  },
  {
    id: 3,
    donater: "Леонхардт",
    text: "Ваша любимая историческая личность?",
    amount: 1000,
    folder: MessageFolders.VERIFICATION,
    isVerified: true,
    isRead: false,
    createdAt: 30000,
    updatedAt: Date.now(),
  },
  {
    id: 4,
    donater: "Раймунд",
    text: "Кто, на ваш взгляд, самый выдающийся человек современности?",
    amount: 450,
    folder: MessageFolders.VERIFICATION,
    isVerified: true,
    isRead: false,
    createdAt: 40000,
    updatedAt: Date.now(),
  },
  {
    id: 5,
    donater: "Сиджисвалд",
    text: "Что в последний раз вас огорчило, а что обрадовало?",
    amount: 700,
    folder: MessageFolders.VERIFICATION,
    isVerified: true,
    isRead: false,
    createdAt: 50000,
    updatedAt: Date.now(),
  },
  {
    id: 6,
    donater: "Флоренц",
    text: "Самое счастливое событие в вашей жизни?",
    amount: 2000,
    folder: MessageFolders.VERIFICATION,
    isVerified: true,
    isRead: false,
    createdAt: 60000,
    updatedAt: Date.now(),
  },
  {
    id: 7,
    donater: "Николаус",
    text: "Самый любимый афоризм/изречение?",
    amount: 750,
    folder: MessageFolders.VERIFICATION,
    isVerified: true,
    isRead: false,
    createdAt: 70000,
    updatedAt: Date.now(),
  },
  {
    id: 8,
    donater: "Ортвин",
    text: "Ваше любимое место в любимом городе?",
    amount: 400,
    folder: MessageFolders.VERIFICATION,
    isVerified: true,
    isRead: false,
    createdAt: 80000,
    updatedAt: Date.now(),
  },
  {
    id: 9,
    donater: "Вилберт",
    text: "Что вы подарили бы любимому человеку, если были бы всемогущи?",
    amount: 400,
    folder: MessageFolders.VERIFICATION,
    isVerified: true,
    isRead: false,
    createdAt: 90000,
    updatedAt: Date.now(),
  },
  {
    id: 10,
    donater: "Апсэль",
    text: "Ваше наилучшее достижение в жизни?",
    amount: 800,
    folder: MessageFolders.VERIFICATION,
    isVerified: true,
    isRead: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 11,
    donater: "Готтлиб",
    text: "Что вы цените в людях?",
    amount: 500,
    folder: MessageFolders.VERIFICATION,
    isVerified: true,
    isRead: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 12,
    donater: "Дедрич",
    text: "Любите ли путешествовать и где успели побывать?",
    amount: 800,
    folder: MessageFolders.VERIFICATION,
    isVerified: true,
    isRead: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 13,
    donater: "Харальд",
    text: "Что сразу сделали бы, если выиграли миллион долларов?",
    amount: 500,
    folder: MessageFolders.VERIFICATION,
    isVerified: true,
    isRead: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 14,
    donater: "Ральф",
    text: "Есть ли у вас жизненный девиз и какой?",
    amount: 400,
    folder: MessageFolders.VERIFICATION,
    isVerified: true,
    isRead: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

const useMessagesBlockState = () => useCustomReducer(messagesBlockReducer, handlers, initialState);

export default useMessagesBlockState;