import queryString from 'query-string';
import request from '../requestWaiFChat';
import type {
  MessageListResponseData,
  FriendChatRecordsResponseData,
  GroupChatRecordsListResponseData,
  MessageReadResponseData,
  UploadFileResponseData,
  FileData,
  VerifyResponseData,
  GetGroupUserResponseData,
  DelResponseData,
  GetGroupUpdateInfoResponseData,
  SaveUpdateGroupInfoResponseData,
} from './type';

enum API {
  GETMESSAGELIST_URL = '/message/list', // 获取所有聊天列表
  GETFRIENDCHATRECORDS_URL = '/message/friend', // 获取当前好友聊天消息记录
  GETGROUPCHATRECORDS_URL = '/message/group', // 获取当前群聊天记录消息
  MESSAGEREAD_URL = '/message/read', // 将消息变为已读
  PRIVATEUPLOADPHOTO_URL = '/chat/private/photo', // 私聊图片上传接口
  UPLOADFILE_URL = '/chat/file/', // 文件上传接口
  MERGEFILE_URL = '/merge/', // 文件合并接口
  VERIFYFILE_URL = '/verify/', // 校验文件hash接口
  GETGROUPUSERURL = '/get/groupUser', // 获取群成员列表接口
  DELURL = '/del', // 删除接口(删除好友, 群成员退群, 解散该群)
  GETUPDATEGROUP_URL = '/get/update/group', // 获取当前需要修改的群信息接口
  UPDATEGROUPINFO_URL = '/update/groupInfo', // 修改群聊信息接口
  UPLOADGROUP_URL = '/upload/group', // 群头像更改接口
}

// 获取所有聊天列表接口
export const reqGetMessageList = (userId: string) =>
  request<any, MessageListResponseData>({ url: API.GETMESSAGELIST_URL, method: 'get', params: { userId } });
// 获取当前好友聊天消息记录接口  pageNum 当前页数
export const reqGetFriendChatRecordsList = (userId: string, friendId: string, pageNum: number) =>
  request<any, FriendChatRecordsResponseData>({
    url: API.GETFRIENDCHATRECORDS_URL,
    method: 'get',
    params: { userId, friendId, pageNum },
  });
// 获取当前群聊天记录消息
export const reqGetGroupChatRecordsList = (userId: string, groupId: string, pageNum: number) =>
  request<any, GroupChatRecordsListResponseData>({
    url: API.GETGROUPCHATRECORDS_URL,
    method: 'get',
    params: { userId, groupId, pageNum },
  });
// 私聊图片上传接口
export const reqPrivateUploadPhotoUrl = API.PRIVATEUPLOADPHOTO_URL;
// 文件上传接口
export const reqUploadFile = (data: FormData, type: string) =>
  request<any, UploadFileResponseData>({ url: API.UPLOADFILE_URL + type, method: 'post', data });
// 文件合并接口
export const reqMergeFile = (data: FileData, type: string) =>
  request<any, UploadFileResponseData>({
    url: API.MERGEFILE_URL + type,
    method: 'post',
    data: queryString.stringify(data),
  });
// 校验文件hash接口
export const reqVerifyHash = (data: FileData, type: string) =>
  request<any, VerifyResponseData>({
    url: API.VERIFYFILE_URL + type,
    method: 'post',
    data: queryString.stringify(data),
  });
// 获取群好友列表
export const reqGetGroupUser = (groupId: string) =>
  request<any, GetGroupUserResponseData>({ url: API.GETGROUPUSERURL, method: 'get', params: { groupId } });
// 删除接口 删除好友: /del/friend  群成员退群: /del/groupUser  解散该群: /del/group
// type为类型 friend groupUser group
// ids: 对象, 删除好友是 { userId, friendId }, 群是 { userId, groupId }
type Ids = {
  userId: string;
  friendId?: string;
  groupId?: string;
};
export const reqDel = (type: string, ids: Ids) =>
  request<any, DelResponseData>({ url: API.DELURL + `/${type}`, method: 'get', params: ids });
// 获取当前需要修改的群信息
export const reqGetGroupUpdateInfo = (groupId: string, groupLeaderId: string) =>
  request<any, GetGroupUpdateInfoResponseData>({
    url: API.GETUPDATEGROUP_URL,
    method: 'get',
    params: { groupId, groupLeaderId },
  });
// 修改群聊信息
type UpdateInfo = {
  _id: string;
  groupName: string;
  sign: string;
  imgUrl: string;
};
export const reqSaveUpdateGroupInfo = (data: UpdateInfo) =>
  request<any, SaveUpdateGroupInfoResponseData>({
    url: API.UPDATEGROUPINFO_URL,
    method: 'post',
    data: queryString.stringify(data),
  });
// 更改群头像接口
export const reqUploadGroupUrl = API.UPLOADGROUP_URL;
// 消息已读接口
/**
 *
 * @param type 类型 值: friend/group
 * @param userId 自己的id
 * @param id 好友id/群id
 */
export const reqMessageRead = (type: string, userId: string, id: string) =>
  request<any, MessageReadResponseData>({
    url: API.MESSAGEREAD_URL + '/' + type,
    method: 'get',
    params: { userId, id },
  });
