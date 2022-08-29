import { BaseModel } from "../BaseModel";

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
}

export interface SpbListItem {
  project_id: number
  name: string
  location: SpbLocation
  no_spb: string
  created_at: string
  spb_status: string // waiting_confirmation, approved, rejected
  items: SpbItem[]
  total: number
}

export interface SPBDetailModel {
  no_spb: string
  created_at: string
  spb_status: string
  items: SpbItem[]
  total: number
  notes?: string
  image: string

}
