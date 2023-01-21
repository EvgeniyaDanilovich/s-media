export type TUser = {
    name: string,
    id: number,
    photos: TPhotos,
    status: string | null,
    followed: boolean
}

export type TPhotos = {
    small: string | null,
    large: string | null
}
export type TProfileContacts = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type TProfile = {
    userId: number,
    lookingForAJob: boolean
    lookingForAJobDescription: string,
    aboutMe: string,
    fullName: string
    contacts: TProfileContacts,
    photos: TPhotos
}

export type TPost = {
    id: number,
    message: string
}

export type TPosts ={
    posts: TPost[]
}

export type TMessage = {
    id: number,
    message: string
}