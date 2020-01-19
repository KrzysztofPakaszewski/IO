import { IItem } from 'app/shared/model/item.model';

export interface IMatching {
  id?: number;
  description?: string;
  archived?: boolean;
  offered?: IItem;
  received?: IItem;
}

export const defaultValue: Readonly<IMatching> = {};
