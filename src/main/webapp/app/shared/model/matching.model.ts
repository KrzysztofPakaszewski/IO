import { IItem } from 'app/shared/model/item.model';

export interface IMatching {
  id?: number;
  // offerorReceived?: boolean;
  // askerReceived?: boolean;
  description?: string;
  offered?: IItem;
  received?: IItem;
  // itemAsked?: IItem;
}

export const defaultValue: Readonly<IMatching> = {
  // offerorReceived: false,
  // askerReceived: false
};
