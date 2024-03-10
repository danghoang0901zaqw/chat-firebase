import { db } from '@/firebase/config';
import { Condition } from '@/types/chat';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

const useQueryFirestore = (collectionName: string, condition: Condition) => {
  const [document, setDocument] = useState([]);
  const user = useAuth();

  useEffect(() => {
    const collectionRef = collection(db, collectionName);
    if (condition) {
      if (!condition.operator || !condition.value) return;
      query(collectionRef, where(condition.fieldName, condition.operator, condition.value)), orderBy('createAt');
    }
    const unsubcribe = onSnapshot(
      collectionRef,
      (snapshot) => {
        const documents: any = snapshot.docs.map((doc) => {
          let data = doc.data();
          let docId = doc.id;
          return {
            ...data,
            id: docId,
          };
        });
        setDocument(documents);
      },
      (error) => {
        console.log(error);
      },
    );

    return () => unsubcribe();
  }, [collectionName, condition]);

  return document;
};
export default useQueryFirestore;
