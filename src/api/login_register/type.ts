// 定义用户信息的ts类型
export interface UserInfoData {
    phone: string,
    password: string,
    nick?: string,
    sex?: string,
    birthday?: string,
    sign?: string
}

export interface Response {
    status: number
}

export interface RegisterResponse extends Response {
    msg: string,
    data: {
        token: string,
        _id: string,
        nick: string,
        phone: string,
        imgUrl: string,
        sex: string,
        birthday: string,
        start: string,
        sign: string
    }
}

export interface LoginResponse extends Response {
    msg: string,
    data: {
        token: string,
        _id: string,
        nick: string,
        phone: string,
        imgUrl: string,
        sex: string,
        birthday: string,
        start: string,
        sign: string
    }
}