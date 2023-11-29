import { defineStore } from "pinia"
import type { MessageStoreType, MessageType } from './interface/messageType'
import { formatTime } from '@/utils/formatTime'
import socket from '@/socket/index'
// api
import { reqGetMessageList, reqGetFriendChatRecordsList, reqGetGroupChatRecordsList, reqMessageRead } from '@/api/message/index'
import { reqGetGroupList } from '@/api/contact/index'
// api ts类型
import type { MessageListResponseData, FriendChatRecordsResponseData, GroupChatRecordsListResponseData, FriendChatRecordsItem, MessageList } from '@/api/message/type'
import type { GetGroupListResponseData } from '@/api/contact/type'
import Toast from "@/plugins/Toast"
import router from '@/router'
// pinia
import { useUserInfoStore } from "@/store/modules/user"
const userInfoStore = useUserInfoStore()
const $route = router.currentRoute

export const useMessageStore = defineStore('messageStore', {
    state: (): MessageStoreType => {
        return {
            messageChatList: [], // 消息详情列表
            messageTotal: 0,
            canLoadingMore: false, // 是否能刷新更多
            messageList: [], // 左侧消息大列表
            stagingInfo: {} as MessageList, // 联系人主页点击聊天暂存跳转的数据
        }
    },
    actions: {
        // 获取聊天列表数据
        async getMessageList() {
            let res: MessageListResponseData = await reqGetMessageList(userInfoStore.userInfo._id)
            if (res.status === 200) {
                this.messageList = res.data
                // 统计消息总数
                let count = 0
                res.data.forEach(item => {
                    item.unreadMsgCount ? count += item.unreadMsgCount : count
                })
                this.messageTotal = count
            }
        },
        // 获取加入的所有群聊信息
        async getAllGroup() {
            let res: GetGroupListResponseData = await reqGetGroupList(userInfoStore.userInfo._id)
            if (res.status === 200) {
                res.data.forEach(item => {
                    // 将用户加入的所有群连接socket
                    socket.emit('join_group', item.groupId._id) // groupId
                })
            }
        },
        // 聊天信息设置为已读
        async setMessageRead() {
            let currentIndex = this.messageList.findIndex(item => item._id === $route.value.query.id)
            if (currentIndex === -1 || !this.messageList[currentIndex].unreadMsgCount) return
            // 修改store中消息数
            let thisUnread = this.messageList[currentIndex].unreadMsgCount
            this.messageTotal -= thisUnread
            this.messageList[currentIndex].unreadMsgCount = 0
            await this.triggerMessageRead()
        },
        // 触发请求
        async triggerMessageRead() {
            let type = ($route.value.query.type) as string
            let userId = userInfoStore.userInfo._id
            let id = ($route.value.query.id) as string
            await reqMessageRead(type, userId, id)
        },
        // 获取当前好友聊天消息记录
        async getFriendChatRecordsList(userId: string, friendId: string, pageNum: number) {
            try {
                if (pageNum === 1) {
                    this.messageChatList = []
                    this.canLoadingMore = true
                }
                // await reqMessageRead('friend', userId, friendId)
                let res: FriendChatRecordsResponseData = await reqGetFriendChatRecordsList(userId, friendId, pageNum)
                if (res.status === 200) {
                    if (res.data.messageList!.length < 20) {
                        // 可以加载更多
                        this.canLoadingMore = false
                    }
                    res.data.messageList?.forEach(i => {
                        i.time = formatTime(new Date(i.time))
                    })
                    this.messageChatList.unshift(...(res.data.messageList) as FriendChatRecordsItem[])
                } else if (res.status === 202) {
                    // 不是好友
                    Toast.show(res.msg)
                } else if (res.status === 201) {
                    // 暂无更多
                    this.canLoadingMore = false
                }
            } catch (error) {

            }
        },
        // 获取当前群消息记录
        async getGroupChatRecordsList(userId: string, groupId: string, pageNum: number) {
            try {
                if (pageNum === 1) {
                    this.messageChatList = []
                    this.canLoadingMore = true
                }
                // await reqMessageRead('group', userId, groupId)
                let res: GroupChatRecordsListResponseData = await reqGetGroupChatRecordsList(userId, groupId, pageNum)
                if (res.status === 200) {
                    if (res.data.messageList!.length < 20) {
                        // 可以加载更多
                        this.canLoadingMore = false
                    }
                    res.data.messageList.forEach(i => {
                        i.time = formatTime(new Date(i.time))
                    })
                    this.messageChatList.unshift(...res.data.messageList)
                } else if (res.status === 202) {
                    // 还未入群
                    Toast.show(res.msg)
                } else if (res.status === 201) {
                    // 暂无更多
                    this.canLoadingMore = false
                }
            } catch (error) {

            }
        },
        // push聊天详情列表数据
        pushMessageData(data: MessageType) {
            this.messageChatList.push(data)
        },
        // 修改聊天详情列表数据
        updateMessageData(data: MessageType, index: number) {
            this.messageChatList[index] = data
        },
        // 删除聊天详情列表数据
        delMessageData(index: number) {
            this.messageChatList.splice(index, 1)
        },
        // 保存联系人主页跳转信息
        saveStagingInfo(info: MessageList) {
            this.stagingInfo = info
        },
        // 清空暂存的信息
        clearStagingInfo() {
            this.stagingInfo = {
                imgUrl: '',
                type: '',
                unreadMsgCount: 0,
                _id: ''
            }
        }
    }
})