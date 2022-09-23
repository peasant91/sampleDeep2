import { string } from "yup"

export interface ProjectLocationModel {
    address: string
    lat: number
    lng: number
}

export interface BaseProjectModel {
    data: ProjectModel
}

export interface ProjectModel {
    name: string
    created_at: string
    construction_type: string
    duration: string
    description: string
    status: string // in_progress, finish
    photo?: string
    location: ProjectLocationModel
    pm: string[]
}

export interface ProjectInnerModel {
    id: number
    name: string,
    created_at: string
    image: string
    location: ProjectLocationModel
}