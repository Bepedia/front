import {Comment} from "./comment";

export interface Recette {
  id?: string;
  title?: string;
  description?: string;
  comments?: Comment[];
  creation_date?: Date;
  author?: string;
  img_url?: string;
}
