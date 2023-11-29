import type { MessageList } from '@/api/message/type'

export type MessageType = {
	fromId?: string;
	toId?: string;
	userId: {
		_id: string;
		nick: string;
		imgUrl: string;
	},
	groupInfo?: {
		_id: string;
		groupName: string;
		imgUrl: string;
	};
	/*
		msgType: 0 => 文字消息,
				 1 => 图片消息,
				 2 => 视频消息,
				 3 => 文件消息,
				 4 => 单个emoji(变成大的emoji),
				 5 => markdown,
				 6 => 语音通话,
				 7 => 视频通话,
				 8 => 屏幕共享
	*/
	time: string | Date;
	msgType: number;
	message: string;
	loading?: boolean; // 临时图片loading
	progressNum?: number; // 进度条数字
	uid?: number; // 临时图片uid
}

export interface MessageStoreType {
    messageChatList: MessageType[];
	messageTotal: number;
	canLoadingMore: boolean;
	messageList: MessageList[];
	stagingInfo: MessageList
}

// 左侧消息大列表
export type ListType = {
	imgUrl: string;
    lastMsg?: {
        _id: string;
        message: string;
        msgType: string;
        time: string | Date;
    };
    nick: string;
    type: string;
    unreadMsgCount: number;
    _id: string;
}