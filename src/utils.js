import firebase from 'firebase/app';

const Timestamp = firebase.firestore.Timestamp;

export const strDateToFirebaseTimestamp = dateStr => {
  return Timestamp.fromDate(new Date(dateStr));
};

export const firebaseTimestampToDate = timestamp => {
  // Date picker model (ISO 8601 format, YY-mm-dd or YY-mm)
  const /*Date*/ date = timestamp.toDate();
  return date.toISOString();
};
