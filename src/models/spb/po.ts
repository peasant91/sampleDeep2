import { BaseModel } from "../BaseModel";
import { SpbItem } from "./spb";

export enum StatusPO {
    waiting = "waiting_confirmation",
    rejected = "reject",
    approved = "approved",
    complaint = "complaint",
    received = "received"
}

export interface PoListResponse extends BaseModel {
  data: PoList[];
}

export interface PoList {
    id: number
    no_po: string
    created_at: string
    po_status: string
    items: SpbItem[]
    total: number
}
