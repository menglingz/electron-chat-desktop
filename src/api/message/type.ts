export interface ResponseData {
  status: number;
}

// 聊天列表返回的ts类型
export type MessageList = {
  imgUrl: string;
  lastMsg?: {
    _id?: string;
    message?: string;
    msgType?: string;
    time?: string | Date;
  };
  nick?: string;
  groupName?: string;
  type: string;
  unreadMsgCount: number;
  _id: string;
};
export interface MessageListResponseData extends ResponseData {
  data: MessageList[];
}

// 聊天详情(好友消息记录)返回的ts类型
export type FriendChatRecordsItem = {
  userId: {
    _id: string;
    nick: string;
    imgUrl: string;
  };
  friendId: {
    _id: string;
    nick: string;
    imgUrl: string;
  };
  _id: string;
  message: string;
  msgType: number;
  state: number;
  time: string;
};
export interface FriendChatRecordsResponseData extends ResponseData {
  data: {
    friendNick?: {
      _id: string;
      nick: string;
    };
    messageList?: FriendChatRecordsItem[];
    nick?: string;
    _id?: string;
  };
  msg?: string;
}

export type GroupChatRecordsItem = {
  groupId: string;
  userId: {
    _id: string;
    nick: string;
    imgUrl: string;
  };
  _id: string;
  message: string;
  msgType: number;
  state: number;
  time: string;
};
// 聊天详情(群聊消息记录)返回的ts类型
export interface GroupChatRecordsListResponseData extends ResponseData {
  data: {
    groupNick: {
      groupName: string;
      _id: string;
    };
    messageList: GroupChatRecordsItem[];
  };
  msg?: string;
}

export interface MessageReadResponseData extends ResponseData {
  msg: string;
}

// 上传图片返回的ts类型
export interface UploadPhotoResponseData {
  res_code: number;
  name?: string;
  url?: string;
  msg?: string;
}

// 文件上传参数ts类型
export interface FileData {
  fileHash: string;
  fileName: string;
  size?: number;
}

export interface UploadFileResponseData extends ResponseData {
  msg: string;
  url?: string;
}

export interface VerifyResponseData extends ResponseData {
  data: {
    shouldUpload: boolean;
    url?: string;
    existChunks?: string[];
  };
}

// 获取群成员列表的ts类型
export type GroupUser = {
  _id: string;
  groupId: string;
  state: number;
  userId: {
    imgUrl: string;
    nick: string;
    _id: string;
  };
};
export interface GetGroupUserResponseData extends ResponseData {
  data: {
    groupUser: GroupUser[];
    groupCreateUserId: string;
  };
}

// 删除好友/群接口的ts类型
export interface DelResponseData extends ResponseData {
  msg: string;
}

// 编辑群信息接口返回的ts类型
export interface GetGroupUpdateInfoResponseData extends ResponseData {
  data: {
    groupInfo: {
      groupName: string;
      imgUrl: string;
      sign: string;
      _id: string;
    };
    groupUserList: GroupUser[];
  };
}

// 保存修改群信息接口的ts类型
export interface SaveUpdateGroupInfoResponseData extends ResponseData {
  msg: string;
}

// 群头像更改接口的ts类型
export interface UploadGroupPic {
  res_code: number;
  url: string;
  name: number;
}
