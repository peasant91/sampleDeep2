import { BaseModel } from "../BaseModel";
import { ProjectInnerModel } from "../project/project";
import { POItem } from "./po";

export interface SpbListResponse extends BaseModel {
  data: SpbListItem[];
}

export interface SpbLocation {
  address: string
  lat: number
  lng: number
}

export interface SpbItem {
  id: number
  name: string
  quantity: number
  unit: string
  notes?: string
  discount?: number
  normal_price?: number
  final_price?: number
  total_unnapproved?: number
}

export interface SpbListItem {
  project_id: number
  name: string
  location: SpbLocation
  no_spb: string
  created_at: string
  spb_status: string // waiting_confirmation, approved, rejected
  items: POItem[]
  total: number
  total_unapproved?: number
}

export interface SPBDetailResponse extends BaseModel {
  data: SPBDetailModel
}


export interface SPBDetailModel {
  project: ProjectInnerModel
  no_spb: string
  created_at: string
  spb_status: string
  items: SpbItem[]
  total: number
  notes?: string
  photo?: string
  image?: string
}


export interface BaseSPBNumberModel {
  no_spb: string
}

export interface SPBNumberModel {
  no_spb: string
}