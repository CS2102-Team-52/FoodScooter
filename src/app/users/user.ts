import { UserType } from '../store/user-type.enum';

export interface User {
    id: number;
    userType: UserType;
}
