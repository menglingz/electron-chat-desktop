<template>
	<div class="container">
		<!-- 头部 -->
		<div class="messgae-detail-header drag">
			<div class="nick text-ellipsis">{{ $route.query.name }}</div>
			<HeaderMenu @open="open" />
		</div>
		<!-- pop背景层 -->
		<div class="bg" v-if="isShow" @click="isShow = false"></div>
		<!-- pop弹出层 -->
		<div class="popup" :class="isShow ? 'show' : 'hidden'">
			<ChatPopup v-if="isShow" />
		</div>
		<!-- 聊天内容容器 -->
		<main ref="mainContent">
			<div class="messgae-content">
				<!-- 加载更多 -->
				<div class="loading-more" v-if="messageStore.canLoadingMore">
					<div v-if="!isLoading" class="more" @click="more">
						<span>加载更多</span>
						<el-icon size="13">
							<ArrowUpBold />
						</el-icon>
					</div>
					<div v-else class="loading">加载中...</div>
				</div>
				<!-- 每条消息 -->
				<div class="message-item" v-for="(item, index) in messageStore.messageChatList" :key="index">
					<!-- 消息时间 -->
					<div class="message-time"
						v-if="index === 0 ? true : messageStore.messageChatList[index - 1].time !== item.time">{{
							item.time }}</div>
					<!-- 用户昵称 -->
					<div class="user-nick"
						v-if="$route.query.type === 'group' && item.userId._id !== userInfoStore.userInfo._id">{{
							item.userId.nick }}</div>
					<!-- 每条消息 -->
					<div :class="item.userId._id === userInfoStore.userInfo._id ? 'message-my' : 'message-friend'">
						<!-- 对方消息头像在左侧 -->
						<div class="user-pic" v-if="item.userId._id !== userInfoStore.userInfo._id">
							<img :src="proxy.$baseUrl + item.userId.imgUrl" alt="" />
						</div>
						<div class="message-text-warp">
							<!-- 消息类型 0: 文本消息(包含emoji, 单个emoji会呈现大图) -->
							<div class="message-text"
								:class="item.userId._id === userInfoStore.userInfo._id ? 'my' : 'friend'"
								v-if="item.msgType === 0">
								<div v-html="item.message"></div>
							</div>
							<!-- 消息类型 1: 图片消息 -->
							<div v-if="item.msgType === 1" class="message-img">
								<div style="border-radius: 8px; overflow: hidden;"
									:style="item.message.indexOf('data:image') > -1 ? '' : `height: ${JSON.parse(item.message).height}px;`">
									<el-image
										:src="item.message.indexOf('data:image') > -1 ? item.message : proxy.$baseUrl + JSON.parse(item.message).url"
										fit="contain"
										:preview-src-list="[item.message.indexOf('data:image') > -1 ? item.message : proxy.$baseUrl + JSON.parse(item.message).url]">
										<template #placeholder>
											<div class="image-slot" style="width: 200px; height: 150px;font-size: 15px;">
												加载中...</div>
										</template>
										<template #error>
											<div class="image-slot" style="width: 200px; height: 150px;">
												<el-icon><icon-picture /></el-icon>
											</div>
										</template>
									</el-image>
								</div>
								<!-- loading -->
								<div class="loading" v-if="item.loading">
									<img src="@/assets/svg/loading.svg" alt="">
								</div>
							</div>
							<!-- 消息类型 2: 视频消息 -->
							<div class="message-video-cover" v-if="item.msgType === 2"
								@click="goVideoDetail(JSON.parse(item.message).url)">
								<div class="video-content">
									<img :src="JSON.parse(item.message).base64" alt="">
									<div class="video-icon">
										<svg t="1698152236130" class="icon" viewBox="0 0 1024 1024" version="1.1"
											xmlns="http://www.w3.org/2000/svg" p-id="4915" width="40" height="40">
											<path
												d="M512 1024C229.2224 1024 0 794.7776 0 512S229.2224 0 512 0s512 229.2224 512 512-229.2224 512-512 512z m0-85.3248c235.5968 0 426.5984-191.0272 426.5984-426.6752 0-235.648-191.0016-426.6752-426.5984-426.6752-235.5968 0-426.5984 191.0272-426.5984 426.6752 0 235.648 191.0016 426.6752 426.5984 426.6752z m-127.6928-571.3408c0-9.856 3.072-19.4816 8.8576-27.52a47.7696 47.7696 0 0 1 66.4064-11.008l203.6992 144.6912a47.1552 47.1552 0 0 1 0 77.0304l-203.6992 144.64a47.7952 47.7952 0 0 1-27.6736 8.832 47.4624 47.4624 0 0 1-47.616-47.3344V367.36z"
												fill="#ffffff" p-id="4916"></path>
										</svg>
									</div>
								</div>
								<el-progress class="progress" v-if="item.loading" :stroke-width="2"
									:percentage="item.progressNum" :show-text="false" />
								<!-- loading -->
								<div class="loading" v-if="item.loading">
									<img src="@/assets/svg/loading.svg" alt="">
								</div>
							</div>
							<!-- 消息类型 3: 文件消息 -->
							<div class="message-file" v-if="item.msgType === 3" @click="openFile(item.message)">
								<img width="40" height="40"
									:src="`./file/${supportFileType.find(i => i === JSON.parse(item.message).fileSuffixName) ? JSON.parse(item.message).fileSuffixName : 'other'}.svg`"
									alt="">
								<div class="message-file-info">
									<div class="message-file-name">{{ JSON.parse(item.message)?.fileName }}</div>
									<div class="message-file-size">{{ formatFileSize(JSON.parse(item.message).size) }}
									</div>
								</div>
								<el-progress class="progress" v-if="item.loading" :stroke-width="2"
									:percentage="item.progressNum" :show-text="false" />
								<!-- loading -->
								<div class="loading" v-if="item.loading">
									<img src="@/assets/svg/loading.svg" alt="">
								</div>
							</div>
							<!-- 消息类型 4: 单个emoji(变成大的emoji) -->
							<div class="message-emoji" v-if="item.msgType === 4">
								<div v-html="item.message"></div>
							</div>
							<!-- 消息类型 5: markdown预览 -->
							<div class="message-md"
								:class="item.userId._id === userInfoStore.userInfo._id ? 'my' : 'friend'"
								v-if="item.msgType === 5">
								<MdPreview :modelValue="item.message" />
							</div>
							<!-- 消息类型 6: 语音通话 -->
							<!-- 消息类型 7: 视频通话 -->
							<!-- 消息类型 8: 屏幕共享 -->
						</div>
						<!-- 自己头像在右边 -->
						<div class="user-pic" v-if="item.userId._id === userInfoStore.userInfo._id">
							<img :src="proxy.$baseUrl + item.userId.imgUrl" alt="" />
						</div>
					</div>
				</div>
			</div>
		</main>
		<!-- 底部消息编辑框 -->
		<div class="message-edit-bottom">
			<BottomInput @handleSendMessage="handleSendMessage" />
		</div>
	</div>
</template>

<script setup lang="ts">
import HeaderMenu from '@/components/HeaderMenu/index.vue'
import BottomInput from '@/components/BottomInput/index.vue'
import ChatPopup from '@/components/ChatPopup/index.vue'
import { Picture as IconPicture, ArrowUpBold } from '@element-plus/icons-vue'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { nextTick, ref, watch, getCurrentInstance, onMounted } from "vue"
import { formatTime } from '@/utils/formatTime'
// 文件大小转换
import { formatFileSize } from '@/utils/formatFileSize'
// pinia
import { useUserInfoStore } from "@/store/modules/user"
import { useMessageStore } from '@/store/modules/message'
import type { MessageType } from '@/store/modules/interface/messageType'
// route
import { useRoute } from 'vue-router'
const { ipcRenderer, shell } = require('electron')
// pinia
const userInfoStore = useUserInfoStore()
const messageStore = useMessageStore()
// route
const $route = useRoute()
// baseUrl socket
const { proxy } = getCurrentInstance() as any

const isShow = ref<boolean>(false)
const open = () => {
	isShow.value = !isShow.value
}

onMounted(() => {
	// 获取聊天记录
	getChatRecordsList()
	// 将消息设置为已读
	messageStore.setMessageRead()
})

// 当前聊天记录页数
let pageNum = ref<number>(1)

// 获取聊天记录列表
const getChatRecordsList = (pageNum: number = 1) => {
	const userId = userInfoStore.userInfo._id // 用户id
	let id = $route.query.id // 好友/群id
	if ($route.query.type === 'friend') {
		// 获取好友消息记录列表
		messageStore.getFriendChatRecordsList(userId, id as string, pageNum)
	} else if ($route.query.type === 'group') {
		// 获取群消息记录列表
		messageStore.getGroupChatRecordsList(userId, id as string, pageNum)
	}
}

// 加载更多
const more = async () => {
	pageNum.value++
	isLoading.value = true
	isLoadingMore.value = true
	getChatRecordsList(pageNum.value)
}

watch(() => messageStore.messageChatList, () => {
	nextTick(() => {
		// 获取页面上的a标签添加点击事件
		mainContent.value.querySelectorAll('a').forEach((a: HTMLAnchorElement) => {
			a.addEventListener('click', (e) => {
				let url = a.href
				e.preventDefault()
				ipcRenderer.send('open-webview', url)
			})
		})
		if (!messageStore.messageChatList.length) return
		handleScroll()
	})
}, { deep: true })

// 获取dom
const mainContent = ref()
// 记录内容高度
const mainContentHeightArr = ref<number[]>([])
// 是否是初始化
let isInit = ref<boolean>(true)
// 是否加载更多数据
let isLoadingMore = ref<boolean>(false)
// 是在加载中
let isLoading = ref<boolean>(false)

// 控制滚动方法
const handleScroll = () => {
	// 将聊天记录容器高度记录下来
	mainContentHeightArr.value.unshift(mainContent.value.scrollHeight)

	if (messageStore.messageChatList.length !== 0 && isInit.value) {
		// 首次加载数据
		isShow.value = false
		isInit.value = false
		mainContent.value.scrollTop = mainContent.value.scrollHeight
	} else if (isLoadingMore.value) {
		// 加载更多数据
		mainContent.value.scrollTop = mainContentHeightArr.value[0] - mainContentHeightArr.value[1]
		isLoadingMore.value = false
		isLoading.value = false
	} else {
		// 发送消息
		mainContent.value.scrollTo({
			top: mainContent.value.scrollHeight,
			behavior: 'smooth'
		})
	}
}

watch(() => $route.query.id, () => {
	// 数据初始化
	isInit.value = true
	mainContentHeightArr.value = []
	pageNum.value = 1
	isLoadingMore.value = false
	isLoading.value = false
	// 加载数据
	let userId = userInfoStore.userInfo._id
	let type = $route.query.type
	let id = ($route.query.id) as string
	if (type === 'friend') {
		messageStore.getFriendChatRecordsList(userId, id, 1)
	} else if (type === 'group') {
		messageStore.getGroupChatRecordsList(userId, id, 1)
	}
	// 将消息设置为已读
	messageStore.setMessageRead()
})

// 发送按钮事件回调
const handleSendMessage = (msg: string, msgType: number) => {
	const { _id, nick, imgUrl } = userInfoStore.userInfo
	let data: MessageType = {
		userId: {
			_id, nick, imgUrl,
		},
		time: formatTime(new Date),
		msgType,
		message: msg
	}
	// 发送者id
	let uId = _id
	// 接收者id
	let toId = $route.query.id
	messageStore.messageChatList.push(data)
	const chatType = $route.query.type
	// 将消息置顶
	messageStore.messageList.map((item, index) => {
		if (item._id === $route.query.id) messageStore.messageList.unshift(messageStore.messageList.splice(index, 1)[0])
	})
	// 改变消息列表中, 最近一次消息的时间
	messageStore.messageList[0].lastMsg!.time = new Date()
	if (chatType === 'friend') {
		// 私聊消息通知
		proxy.socket.emit('private_chat', data, uId, toId)
	} else if (chatType === 'group') {
		// 群聊消息通知
		proxy.socket.emit('group_chat', data, uId, toId)
	}
}

// 支持的文件类型
const supportFileType = ['apk', 'cad', 'css', 'dmg', 'docx', 'doc', 'exe', 'gif', 'gitignore', 'html', 'ipa', 'iso', 'java', 'js', 'json', 'jsx', 'less', 'md', 'mp3', 'mp4', 'mov', 'pdf', 'ppt', 'psd', 'py', 'scss', 'sql', 'styles', 'svg', 'ts', 'txt', 'vue', 'xlxs', 'zip']

// 去视频详情页
const goVideoDetail = (url: string) => {
	ipcRenderer.send('open-video', url)
}

// 打开文件
const openFile = (message: string) => {
	let url = JSON.parse(message).url
	shell.openExternal(proxy.$baseUrl + url)
}
</script>

<style scoped lang="scss">
.container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
	overflow: hidden;

	.messgae-detail-header {
		width: 100%;
		height: 50px;
		padding: 0 0 0 20px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		font-size: 16px;
		border-bottom: 1px solid #e9e9e9;

		.nick {
			max-width: 200px;
		}
	}

	.bg {
		width: 100%;
		position: fixed;
		top: 50px;
		bottom: 0;
		z-index: 98;
	}

	.popup {
		width: 260px;
		background-color: #f2f2f2;
		position: absolute;
		top: 50px;
		bottom: 0;
		right: 0;
		z-index: 99;
		transition: all 0.3s;
	}

	.show {
		transform: translateX(0);
		box-shadow: -18px 10px 20px 3px rgba(0, 0, 0, 0.03);
	}

	.hidden {
		transform: translateX(100%);
	}

	.message-edit-bottom {
		width: 100%;
		height: 200px;
		border-top: 1px solid #e9e9e9;
		padding: 10px 15px;
		box-sizing: border-box;
	}
}

main {
	width: 100%;
	flex: 1;
	overflow: auto;

	.messgae-content {
		width: 100%;
		padding: 15px 20px 0;
		box-sizing: border-box;

		.loading-more {
			width: 100%;
			font-size: 13px;
			text-align: center;
			margin-bottom: 15px;
			color: #9195a1;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;

			.more,
			.loading {
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
			}
		}

		.message-item {
			width: 100%;

			.message-time {
				width: 100%;
				display: flex;
				justify-content: center;
				margin-bottom: 20px;
				font-size: 13px;
				color: #b0b0b0;
			}

			.user-nick {
				font-size: 12px;
				margin-bottom: 10px;
				color: #9a9898;
			}

			.message-my,
			.message-friend {
				width: 100%;
				display: flex;
				margin-bottom: 25px;
				-webkit-user-select: text;
				-moz-user-select: text;
				-ms-user-select: text;
				user-select: text;

				.user-pic {
					width: 40px;
					height: 40px;
					border-radius: 50%;
					overflow: hidden;

					img {
						width: 100%;
						height: 100%;
					}
				}

				.message-text-warp {
					margin: 0 10px;

					.loading {
						position: absolute;
						left: -25px;
						bottom: 0;
						animation: spin 1s infinite linear;
						width: 20px;
						height: 20px;
						overflow: hidden;

						img {
							width: 100%;
							height: 100%;
						}
					}

					@keyframes spin {
						from {
							transform: rotate(0deg);
						}

						to {
							transform: rotate(360deg);
						}
					}

					.message-text {
						max-width: 55vw;
						padding: 10px;
						box-sizing: border-box;
						border-radius: 10px;
						line-height: 22px;
						font-size: 15px;
					}

					.message-img {
						max-width: 200px;
						position: relative;

						.image-slot {
							display: flex;
							justify-content: center;
							align-items: center;
							background: var(--el-fill-color-darker);
							color: var(--el-text-color-secondary);
							font-size: 25px;
						}
					}

					.message-video-cover {
						width: 260px;
						height: 160px;
						position: relative;

						.video-content {
							width: 100%;
							height: 100%;
							border-radius: 10px;
							overflow: hidden;
							background-color: #434242;
							cursor: pointer;

							img {
								width: 100%;
								height: 100%;
							}

							.video-icon {
								position: absolute;
								top: 50%;
								left: 50%;
								transform: translate(-50%, -50%);
							}
						}

						.progress {
							width: 240px;
							position: absolute;
							left: 10px;
							right: 10px;
							bottom: 7.5px;
						}
					}

					.message-file {
						width: 180px;
						height: 70px;
						background-color: #ffffff;
						border-radius: 10px;
						padding: 10px;
						box-sizing: border-box;
						display: flex;
						align-items: center;
						cursor: pointer;
						position: relative;

						img {
							margin-right: 10px;
						}

						.message-file-info {
							width: 100%;
							height: 100%;
							display: flex;
							flex-direction: column;
							justify-content: space-evenly;

							.message-file-name {
								font-size: 15.5px;
								width: 110px;
								height: 16px;
								line-height: 16px;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							}

							.message-file-size {
								font-size: 12px;
								color: #8c8c8c;
							}
						}

						.progress {
							width: 160px;
							position: absolute;
							left: 10px;
							right: 10px;
							bottom: 7.5px;
						}
					}

					.message-md {
						max-width: 55vw;
						border-radius: 10px;
						overflow: hidden;
					}

					.message-emoji {
						padding: 0 5px;
					}

					.friend {
						background-color: #fff;
					}

					.my {
						background-color: #0091ff;
						color: #fff;
					}
				}
			}

			.message-my {
				justify-content: flex-end;
			}
		}
	}
}
</style>
<style>
.md-editor-preview-wrapper {
	padding: 0px 15px;
}
</style>