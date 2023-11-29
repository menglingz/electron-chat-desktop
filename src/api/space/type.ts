export interface ResponseData {
    status: number
}

type likeListData = {
    _id: string,
    userId: {
        _id: string
        nick: string
    }
}
type commentListData = {
    _id: string,
    userId: {
        _id: string,
        nick: string,
        imgUrl: string
    },
    spaceId: string,
    type: number,
    fromId: string,
    toId: string,
    time: string,
    textarea: string // 评论的文字
}
type replyItem = any[]
// 空间单条动态数据类型
export interface Space {
    _id: string,
    userId: {
        _id: string,
        nick: string,
        imgUrl: string
    },
    photos: string[], // 可为空
    textDesc?: string, // 可为空 
    time: string,
    isLike: boolean,
    likeList: likeListData[],
    commentList: commentListData[]
    textarea: string, // v-model 绑定输入框的 textarea
    placeholder?: string,
    iptType: number, // 输入框评论回复类型
    iptFromId: string, // 输入框评论的发送者id
    iptToId: string, // 输入框评论的接收者id
    spaceCommentId?: string, // 如果评论是回复类型, 需要传回复评论的那条id
    replyList: replyItem[]
}
// 空间动态列表的数据类型
export type Spaces = Space[]
export interface SpaceListResponseData extends ResponseData {
    data: Spaces
}

// 发布动态的参数的ts类型
export interface SpaceData {
    userId: string,
    textDesc: string,
    photos: string[]
}
// 发布动态成功返回的数据类型
export interface AddSpaceResponseData extends ResponseData {
    msg: string
}

// 动态点赞参数的ts类型
export interface LikeData {
    userId: string,
    spaceId: string
}
// 动态点赞返回的数据类型
export interface SpaceLikeResponseData extends ResponseData {
    msg: string
}

// 动态评论数据类型
export interface SpaceCommentResponseData extends ResponseData {
    msg: string
}

// 评论删除数据类型
export interface DelSpaceCommentResponseData extends ResponseData {
    msg: string
}

// 动态删除数据的ts类型
export interface DelSpaceResponseData extends ResponseData {
    msg: string
}