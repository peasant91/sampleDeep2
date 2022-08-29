/**
 * Created by Widiana Putra on 23/06/2022
 * Copyright (c) 2022 - Made with love
 */
import { BaseModel } from "../BaseModel";
import { Image } from "../image/Image";

export interface CatalogListResponse extends BaseModel {
  data: CatalogItem[];
}

export interface Discount {
  amount?: number;
  discount_type?: string;
}

export interface CatalogItem {
  id: number;
  catalog_parent_id?: number;
  name?: string;
  price?: number;
  final_price?: number;
  is_available?: boolean;
  is_price_show?: boolean;
  is_discount_show?: boolean;
  discount?: Discount;
  category_id?: number;
  unit?: string;
  stock?: number;
  weight?: number;
  position?: number;
  sku_number?: string;
  product_code?: string;
  is_favourited?: boolean;
  image?: Image;
}
