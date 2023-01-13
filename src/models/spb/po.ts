import { BaseModel } from "../BaseModel";
import { ProjectInnerModel } from "../project/project";
import { SpbItem } from "./spb";

export enum StatusPO {
  waiting = "waiting_confirmation",
  rejected = "reject",
  approved = "approved",
  complaint = "complaint",
  received = "received",
  cancel = "cancel",
  done = "done"
}

export interface PoListResponse extends BaseModel {
  data: POList[];
}

export interface POList {
  id: number
  no_po: string
  no_spb?: string
  created_at: string
  po_status: string
  items: POItem[]
  total: number
}

export interface SupplierPO {
  name: string
  address: string
}

export interface POItem {
  id: number
  name: string
  quantity: number
  unit: string
  discount?: number
  normal_price?: number
  final_price?: number
}

export interface PODetailResponse {
  data: PODetailModel
}

export interface PODetailModel {
  project: ProjectInnerModel
  no_spb: string
  spb_created_at: string
  no_po: string
  po_created_at: string
  po_status: string
  supplier: SupplierPO
  delivery_estimation: string
  items: POItem[]
  total_item: number
  total_price: number
  total_discount: number
  grand_total: number
  total_ppn: number
  is_tax_active: boolean
  updated_by?: string
  created_by?: string
  // total: number
  complaint?: string
  notes?: string
  payment_term: string[]
  last_updated?: string
}

