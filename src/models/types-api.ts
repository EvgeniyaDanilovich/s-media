import { ResultCodes } from '../enums/enums';
import { TPhotos, TUser } from './common-types';

export type TGetItems = {
    items: TUser[],
    totalCount: number,
    error: string | null
}

export type TSavePhotos = {
    photos: TPhotos
}

export type TResponse<D = {}, RC = ResultCodes> = {
    resultCode: RC,
    messages: string[],
    data: D
}

export type TMeResponseData = {
    id: number,
    email: string,
    login: string
}

export type TLoginResponseData = {
    userId: number
}


