import { string } from "yup"

export interface ProjectLocationModel {
    address: string
    lat: number
    lng: number
}

export interface ProjectModel {
    name: string
    created_at: String
    construction_type: string
    duration: string
    description: string
    status: string // in_progress, finish
    photo?: string
    location: ProjectLocationModel
    pm: string[]
}