import { UserInterface } from 'interfaces/user';
import { PhotoInterface } from 'interfaces/photo';
import { GetQueryInterface } from 'interfaces';

export interface CommentInterface {
  id?: string;
  content: string;
  user_id?: string;
  photo_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  photo?: PhotoInterface;
  _count?: {};
}

export interface CommentGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  user_id?: string;
  photo_id?: string;
}
