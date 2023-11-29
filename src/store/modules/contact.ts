import { defineStore } from "pinia"

export const useContactStore = defineStore('contactStore', {
    state: () => {
        return {
            friendContactNum: 0,
            groupContactNum: 0
        }
    },
    actions: {
        SOCKET_ContactNum(friendNum: number, groupNum: number) {
            this.friendContactNum = friendNum
            this.groupContactNum = groupNum
        },
        updateContactNum(type: number) {
            // type: 0 好友申请消息数  1 群申请消息数
            if (!type) {
                this.friendContactNum -= 1
            } else {
                this.groupContactNum -= 1
            }
        }
    }
})