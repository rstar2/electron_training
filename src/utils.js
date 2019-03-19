import firebase from 'firebase/app';

const Timestamp = firebase.firestore.Timestamp;

/**
 * @param {String} dateStr
 * @return {firebase.firestore.Timestamp}
 */
const strDateToFirebaseTimestamp = dateStr => {
  return Timestamp.fromDate(new Date(dateStr));
};

/**
 * @param {firebase.firestore.Timestamp} dateStr
 * @return {String}
 */
const firebaseTimestampToDate = timestamp => {
  // Date picker model (ISO 8601 format, YY-mm-dd or YY-mm)
  const /*Date*/ date = timestamp.toDate();
  return date.toISOString();
};

/**
 * @param {Object} data
 * @param {String} owner
 * @return {Object}
 */
export const toDocData = (data, owner) => {
  const dataFixed = { ...data };
  // the incoming 'startDate'/'dueDate' are String types
  if (dataFixed.startDate) {
    dataFixed.startDate = strDateToFirebaseTimestamp(dataFixed.startDate);
  }
  if (dataFixed.dueDate) {
    dataFixed.dueDate = strDateToFirebaseTimestamp(dataFixed.dueDate);
  }
  dataFixed.owner = owner;
  return dataFixed;
};

/**
 * 
 * @param {Object} data
 * @return {Object}
 */
export const fromDocData = data => {
  const dataFixed = { ...data };
  if (dataFixed.startDate) {
    dataFixed.startDate = firebaseTimestampToDate(dataFixed.startDate);
  }
  if (dataFixed.dueDate) {
    dataFixed.dueDate = firebaseTimestampToDate(dataFixed.dueDate);
  }

  return dataFixed;
};
