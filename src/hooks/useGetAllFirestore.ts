import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

function useGetAllFirestore(collectionName: string, callback?: Function, callbackError?: Function) {
  const [documents, setDocuments] = useState([]);
  const user = useAuth();

  useEffect(() => {
    if (user.uid) {
      const unsubscribe = onSnapshot(
        collection(db, collectionName),
        (snapshot) => {
          const documents: any = snapshot.docs.map((doc) => {
            let docData = doc.data();
            let docId = doc.id;
            return {
              ...docData,
              id: docId,
            };
          });
          if (typeof callback === 'function') {
            callback();
          }
          setDocuments(documents);
        },
        (error: any) => {
          if (typeof callbackError === 'function') {
            callbackError(error);
          }
        },
      );

      return () => {
        unsubscribe();
      };
    }
  }, [collectionName, user.uid, callback, callbackError]);

  return documents;
}

export default useGetAllFirestore;
