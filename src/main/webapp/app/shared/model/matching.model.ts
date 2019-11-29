import { IItem } from 'app/shared/model/item.model';

export interface IMatching {
  id?: number;
  stateOfExchange?: boolean;
  chat?: string;
  itemOffered?: IItem;
  itemAsked?: IItem;
}

export const defaultValue: Readonly<IMatching> = {
  stateOfExchange: false
};
