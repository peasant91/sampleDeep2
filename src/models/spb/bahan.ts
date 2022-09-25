export interface ListBahan {
    data: BahanModel[]
}

export interface BahanModel {
    id?: number
    name: string
    unit: string
    quantity: number
    notes? : string
}