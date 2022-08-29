/**
 * Created by Widiana Putra on 23/06/2022
 * Copyright (c) 2022 - Made with love
 */
export interface BaseModel {
  meta: Meta;
  links: Links;
}

interface Links {
  first: string;
  last: string;
  prev?: any;
  next: string;
}

interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}
