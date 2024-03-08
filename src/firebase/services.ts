import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from './config';

export const addDocument = async (collectionName: string, data: any, msgError?: string) => {
    try {
        await addDoc(collection(db, collectionName), {
            ...data,
            createdAt: serverTimestamp(),
        });
    } catch (error) {
        error && msgError && toast.error(msgError);
    }
};
