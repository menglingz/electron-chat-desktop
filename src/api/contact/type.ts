export interface ResponseData {
    status: number
}

// 创建群聊提交的data数据类型
export interface CreateGroupData {
    userId: string,
    groupName: string,
    sign: string,
    imgUrl: string
}

// 创建群聊接口返回的ts类型
export interface CreateGroupResponseData extends ResponseData {
    msg: string
}


export type FriendType = {
    imgUrl: string,
    nick: string,
    sign: string,
    _id: string,
}
export type GroupType = {
    groupName: string,
    imgUrl: string,
    _id: string
}
// 关键字搜索接口返回的ts类型
export interface KeywordResult extends ResponseData {
    data: {
        friendList: FriendType[],
        groupList: GroupType[]
    }
}

// 好友列表返回的ts类型
export type ResFriendListType = {
    friendId: {
        _id: string,
        nick: string,
        imgUrl: string,
        sign: string
    }
    state: number,
    userId: string,
    _id: string
}
export interface GetFriendListResponseData extends ResponseData {
    data: ResFriendListType[]
}
// 群列表返回的ts类型
export type ResGroupListType = {
    groupId: {
        _id: string,
        groupName: string,
        imgUrl: string
    }
    state: number,
    userId: string,
    _id: string
}
export interface GetGroupListResponseData extends ResponseData {
    data: ResGroupListType[]
}

// 用户主页请求参数
export type UserIds = {
    _id: string,
    urlId: string
}
export type UserInfoType = {
    WaiFCode: string,
    age: string,
    birthday: string,
    imgUrl: string,
    nick: string,
    phone: string,
    sex: string,
    sign: string,
    start: string,
    _id: string
}
// 用户主页返回的ts类型
export interface UserContactHomeResponseData extends ResponseData {
    data: {
        friendState: number,
        user: UserInfoType
    }
}

// 群主页请求参数
export type GroupIds = {
    groupId: string,
    userId: string
}
// 群主页返回的ts类型
export type GroupInfoType = {
    group: {
        _id: string,
        userId: string,
        groupName: string,
        groupNumber: string,
        sign: string,
        imgUrl: string,
        creatTime: string
    },
    groupUser: [
        {
            _id: string,
            groupId: string,
            userId: {
                _id: string,
                nick: string,
                imgUrl: string,
                sex: string,
                birthday: string
            },
            state: number
        }
    ],
    statis: {
        maleNum: number,
        femaleNum: number,
        is00sBornNum: number
    }
}
export interface GroupContactHomeResponseData extends ResponseData {
    data: GroupInfoType,
    state: number
}

export interface AddFriendResponseData extends ResponseData {
    msg: string
}
export interface AddGroupResponseData extends ResponseData {
    msg: string
}

export type FriendNoagree = {
    friendId: {
        _id: string,
        nick: string,
        imgUrl: string
    },
    state: number,
    time: Date
    userId: string,
    _id: string
}
// 好友申请列表返回的ts类型
export interface FriendNoagreeListResponseData extends ResponseData {
    data: FriendNoagree[]
}

export type GroupNoagree = {
    groupId: {
        _id: string,
        groupName: string,
        imgUrl: string
    },
    time: Date
    userId: {
        nick: string,
        _id: string
    },
    _id: string
}
// 群申请列表返回的ts类型
export interface GroupNoagreeListResponseData extends ResponseData {
    data: GroupNoagree[]
}

export interface AgreeFriendResponseData extends ResponseData {
    msg: string
}

export interface RefuseFriendResponseData extends ResponseData {
    msg: string
}

export interface AgreeGroupResponseData extends ResponseData {
    msg: string
}

export interface RefuseGroupResponseData extends ResponseData {
    msg: string
}