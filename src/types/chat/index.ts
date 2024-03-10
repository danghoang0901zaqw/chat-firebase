import { WhereFilterOp } from 'firebase/firestore';

export interface ChatState {
    roomId: number | undefined;
}

export interface Condition {
    fieldName: string;
    operator: WhereFilterOp;
    value: string;
}
