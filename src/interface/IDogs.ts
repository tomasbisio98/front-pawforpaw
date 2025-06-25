export interface IDogs {
    dogId?:string,
    name: string,
    sex: string,
    city: string,
    description: string,
    imgUrl: string,
    status: boolean,
}

export type DogFormData = Omit<IDogs, "id">;
