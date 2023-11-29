export interface ResponseData {
    status: number
}

// 上传头像返回的ts类型
export interface UploadPicResponseData {
    res_code: number,
    name?: string,
    url?: string,
    msg?: string
}

// 更新用户信息 data 的ts类型
export interface UpdateUserData {
    _id: string,
    nick: string,
    sex: string,
    birthday: string,
    sign: string,
    imgUrl: string
}

// 更新用户信息返回的ts类型
export interface UpdateUserResponseData extends ResponseData {
    msg: string,
    start?: string
}