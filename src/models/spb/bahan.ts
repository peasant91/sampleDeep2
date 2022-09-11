export interface ListBahan {
    data: BahanModel[]
}

export interface BahanModel {
    nama: string
    unit: string
    quantity: number
    note? : string
}