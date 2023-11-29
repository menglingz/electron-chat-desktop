import request from "../requestWaiFChat"
import queryString from "query-string"
import type {
    CreateGroupData,
    CreateGroupResponseData,
    KeywordResult,
    GetFriendListResponseData,
    GetGroupListResponseData,
    UserContactHomeResponseData,
    UserIds,
    GroupIds,
    GroupContactHomeResponseData,
    AddGroupResponseData,
    AddFriendResponseData,
    FriendNoagreeListResponseData,
    GroupNoagreeListResponseData,
    AgreeFriendResponseData,
    RefuseFriendResponseData,
    AgreeGroupResponseData,
    RefuseGroupResponseData
} from './type'

enum API {
    UPLOADGROUPPHOTO_URL = '/upload/group', // 群头像上传接口
    CREATEGROUP_URL = '/create/group', // 创建群聊接口
    SEARCH_URL = '/search', // 关键字搜索接口
    GETFRIENDLIST_URL = '/contacts/friend', // 获取好友列表接口
    GETGROUPLIST_URL = '/contacts/group', // 获取群列表接口
    GETUSERCONTACTHOMEINFO_URL = '/home/user', // 获取用户主页信息接口
    GETGROUPCONTACTHOMEINFO_URL = '/home/group', // 获取群主页信息接口
    ADDFRIEND_URL = '/friend/add', // 发送好友申请接口
    ADDGROUP_URL = '/group/add', // 发送入群申请接口
    GETFRIENDNOAGREE_URL = '/get/friend/noagree', // 获取好友申请列表接口
    GETGROUPNOAGREE_URL = '/get/group/noagree', // 获取群申请列表接口
    AGREEFRIEND_URL = '/friend/agree', // 同意好友申请接口
    REFUSEFRIEND_URL = '/friend/refuse', // 拒绝好友申请接口
    AGREEGROUP_URL = '/group/agree', // 同意入群申请接口
    REFUSEGROUP_URL = '/group/refuse' // 拒绝入群申请接口
}

// 群头像上传接口
export const reqUploadGroupPhoto = API.UPLOADGROUPPHOTO_URL
// 创建群接口
export const reqCreateGroup = (data: CreateGroupData) => request<any, CreateGroupResponseData>({ url: API.CREATEGROUP_URL, method: 'post', data: queryString.stringify(data) })
// 关键字搜索接口
export const reqSearch = (keyword: string) => request<any, KeywordResult>({ url: API.SEARCH_URL, method: 'get', params: { keyword } })
// 获取好友列表接口
export const reqGetFriendList = (userId: string) => request<any, GetFriendListResponseData>({ url: API.GETFRIENDLIST_URL, method: 'get', params: { userId } })
// 获取群列表接口
export const reqGetGroupList = (userId: string) => request<any, GetGroupListResponseData>({ url: API.GETGROUPLIST_URL, method: 'get', params: { userId } })
// 获取用户主页信息接口
export const reqGetUserContactHomeInfo = (ids: UserIds) => request<any, UserContactHomeResponseData>({ url: API.GETUSERCONTACTHOMEINFO_URL, method: 'get', params: ids })
// 获取群主页信息接口
export const reqGetGroupContactHomeInfo = (ids: GroupIds) => request<any, GroupContactHomeResponseData>({url: API.GETGROUPCONTACTHOMEINFO_URL, method: 'get', params: ids})
// 发送好友申请接口
export const reqAddFriend = (userId: string, friendId: string) => request<any, AddFriendResponseData>({url: API.ADDFRIEND_URL, method: 'post', data: queryString.stringify({ userId, friendId })})
// 发送入群申请接口
export const reqAddGroup = (groupId: string, userId: string) => request<any, AddGroupResponseData>({url: API.ADDGROUP_URL, method: 'post', data: queryString.stringify({ groupId, userId })})
// 好友申请列表接口
export const reqGetFriendNoagreeList = (userId: string) => request<any, FriendNoagreeListResponseData>({url: API.GETFRIENDNOAGREE_URL, method: 'get', params: { userId }})
// 获取群申请列表接口
export const reqGetGroupNoagreeList = (userId: string) => request<any, GroupNoagreeListResponseData>({url: API.GETGROUPNOAGREE_URL, method: 'get', params: { userId }})
// 同意好友申请接口
export const reqAgreeFriend = (userId: string, friendId: string) => request<any, AgreeFriendResponseData>({url: API.AGREEFRIEND_URL, method: 'post', data: queryString.stringify({ userId, friendId })})
// 拒绝好友申请接口
export const reqRefuseFriend = (userId: string, friendId: string) => request<any, RefuseFriendResponseData>({url: API.REFUSEFRIEND_URL, method: 'post', data: queryString.stringify({ userId, friendId })}) 
// 同意入群申请接口
export const reqAgreeGroup = (userId: string, groupId: string) => request<any, AgreeGroupResponseData>({url: API.AGREEGROUP_URL, method: 'post', data: queryString.stringify({ userId, groupId })})
// 拒绝人群申请接口
export const reqRefuseGroup = (userId: string, groupId: string) => request<any, RefuseGroupResponseData>({url: API.REFUSEGROUP_URL, method: 'post', data: queryString.stringify({ userId, groupId })})