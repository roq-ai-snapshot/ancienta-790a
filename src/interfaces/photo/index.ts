import { CommentInterface } from 'interfaces/comment';
import { FavoriteInterface } from 'interfaces/favorite';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface PhotoInterface {
  id?: string;
  image: string;
  description?: string;
  user_id?: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  comment?: CommentInterface[];
  favorite?: FavoriteInterface[];
  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {
    comment?: number;
    favorite?: number;
  };
}

export interface PhotoGetQueryInterface extends GetQueryInterface {
  id?: string;
  image?: string;
  description?: string;
  user_id?: string;
  organization_id?: string;
}
