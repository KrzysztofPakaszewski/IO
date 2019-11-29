import { IUser } from 'app/shared/model/user.model';
import { Category } from 'app/shared/model/enumerations/category.model';
import { Delivery } from 'app/shared/model/enumerations/delivery.model';

export interface IItem {
  id?: number;
  title?: string;
  state?: string;
  category?: Category;
  imageContentType?: string;
  image?: any;
  hash?: string;
  preferences?: string;
  preferedDelivery?: Delivery;
  owner?: IUser;
}

export const defaultValue: Readonly<IItem> = {};
