import { db } from '@/firebase/config';
import { Condition } from '@/types/chat';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
type SortType = 'asc' | 'desc'
const useQueryFirestore = (collectionName: string, condition: Condition, sort: SortType = 'desc') => {
    const [document, setDocument] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, collectionName);
        let q;
        if (!condition) return;
        if (!condition.operator || !condition.value) return;
        q = query(
            collectionRef,
            where(condition.fieldName, condition.operator, condition.value),
            orderBy('createdAt', sort),
        );
        const unsubcribe = onSnapshot(
            q,
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
    }, [collectionName, condition, sort]);

    return document;
};
export default useQueryFirestore;
