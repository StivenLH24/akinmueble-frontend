import {UserModel} from './user.model';

export class userValidatedModel {
    ok?: number;
    message?: string;
    data?: UserModel;
    token?: string;
}