import { IItem } from 'app/shared/model/item.model';

export interface IMatching {
  id?: number;
  offerorReceived?: boolean;
  askerReceived?: boolean;
  chat?: string;
  itemOffered?: IItem;
  itemAsked?: IItem;
}

export const defaultValue: Readonly<IMatching> = {
  offerorReceived: false,
  askerReceived: false
};
