export interface UserInfo {
    _id: string,
    token: string,
    nick: string,
    phone: string,
    imgUrl: string,
    sex: string,
    birthday: string,
    start: string,
    sign: string
}

export interface UserStoreType {
    userInfo: UserInfo
}

export interface UpdateUserData {
    _id: string,
    nick: string,
    sex: string,
    birthday: string,
    sign: string,
    imgUrl: string,
    start?: string
}