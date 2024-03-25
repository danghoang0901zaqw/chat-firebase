import { User } from '../auth';
import { Room } from '../chat';

export interface App {
    listRoom: Room[];
    roomActive: Room | undefined
    users: User[]
}
