import { IUser } from 'app/shared/model/user.model';

export interface IReview {
  id?: number;
  score?: number;
  review?: string;
  reviewer?: IUser;
  user?: IUser;
}

export const defaultValue: Readonly<IReview> = {};
