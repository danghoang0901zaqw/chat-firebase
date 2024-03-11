import { Timestamp, WhereFilterOp } from 'firebase/firestore';

export interface ChatState {
    roomId: string | undefined;
}

export interface Condition {
    fieldName: string;
    operator: WhereFilterOp;
    value: string;
}

export interface Room {
    createdAt: Timestamp;
    description: string;
    id: string;
    members: string[];
    roomName: string;
    photoURL: string;
}
