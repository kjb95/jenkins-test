<template>
	<v-container>
		<v-row style="background-color: gray">
			<v-col>
				<v-icon size="35"> mdi-account</v-icon>
				<span class="font-weight-bold text-h5">{{ chatRoomCount }}</span>
				<span class="font-weight-bold text-h5 ml-5">[{{ chatRoomTitle }}] 채팅방</span>
			</v-col>
			<RouterLink to="/chat">
				<v-col cols="1">
					<v-btn class="font-weight-bold text-h6">나가기</v-btn>
				</v-col>
			</RouterLink>
		</v-row>
		<v-row>
			<v-col cols="10" class="scroll-container">
				<template v-for="(chatContent, index) in chatContents" v-bind:key="index">
					<template v-if="chatContent.sendMessageType === 'JOIN'">
						<v-row>
							<v-col />
							<v-col cols="3">
								<v-card>
									<v-card-text :style="{ textAlign: 'center', backgroundColor: 'pink' }" class="font-weight-bold"> {{ chatContent.name }}님이 들어왔습니다.</v-card-text>
								</v-card>
							</v-col>
							<v-col />
						</v-row>
					</template>
					<template v-if="chatContent.sendMessageType === 'LEAVE'">
						<v-row>
							<v-col />
							<v-col cols="3">
								<v-card>
									<v-card-text :style="{ textAlign: 'center', backgroundColor: 'grey' }" class="font-weight-bold"> {{ chatContent.name }}님이 나갔습니다.</v-card-text>
								</v-card>
							</v-col>
							<v-col />
						</v-row>
					</template>
					<template v-else-if="chatContent.sendMessageType === 'TALK'">
						<v-row v-if="isShowUserProfile(chatContents, index)" style="height: 30px">
							<v-col :style="{ display: 'grid', gridTemplateColumns: '50px auto' }">
								<v-img :src="chatContent.picture" width="30px" style="border-radius: 100%" />
								<span class="font-weight-bold">{{ chatContent.name }}</span>
							</v-col>
						</v-row>
						<v-row v-if="chatContents[index].id == user.state.id">
							<v-col cols="3" />
							<v-col :style="{ fontSize: '10px', display: 'grid', justifyContent: 'end', gridTemplateColumns: 'auto auto' }" cols="9">
								<span v-if="isShowChatContentTime(chatContents, index)" :style="{ fontSize: '10px', alignSelf: 'end', width: '35px' }" class="font-weight-bold">{{ formatTimeChat(chatContent.time) }}</span>
								<span v-else :style="{ width: '35px' }" />
								<v-card color="yellow">
									<v-card-text :style="{ whiteSpace: 'pre-wrap' }">{{ chatContent.content }}</v-card-text>
								</v-card>
							</v-col>
						</v-row>
						<v-row v-if="chatContents[index].id != user.state.id">
							<v-col :style="{ display: 'grid', gridTemplateColumns: '40px auto 35px', justifyContent: 'start', justifyItems: 'end' }" cols="9">
								<span />
								<v-card>
									<v-card-text :style="{ whiteSpace: 'pre-wrap' }">{{ chatContent.content }}</v-card-text>
								</v-card>
								<span v-if="isShowChatContentTime(chatContents, index)" :style="{ fontSize: '10px', display: 'grid', alignItems: 'end' }" class="font-weight-bold">{{ formatTimeChat(chatContent.time) }} </span>
							</v-col>
						</v-row>
					</template>
				</template>
			</v-col>
			<v-col cols="2">
				<v-card v-for="(chatUser, index) in chatUsers" v-bind:key="index" :style="{ display: 'grid', gridTemplateColumns: '2fr 1fr 4fr', justifyItems: 'center', alignItems: 'center' }" class="mb-3">
					<v-img :src="chatUser.picture" height="30px" width="30px" :style="{ borderRadius: 100 + '%' }" />
					<v-card-text v-if="chatUser.usersId === user.state.id" :style="{ backgroundColor: 'pink' }" class="font-weight-bold">나</v-card-text>
					<v-card-text v-else />
					<v-card-text class="font-weight-bold">{{ chatUser.name }}</v-card-text>
				</v-card>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-textarea append-inner-icon="mdi-comment" rows="1" v-model="chatInput" @click:append-inner="handleChatInput" @keypress.enter="handleChatInput" :style="{ whiteSpace: 'pre' }"></v-textarea>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import { findMoviesByIdApi } from '@/api/movies';
import { useRoute } from 'vue-router';
import { onMounted, reactive, ref, watchEffect, nextTick, watch, onBeforeUnmount } from 'vue';
import { useUsersStore } from '@/store/users';
import { MESSAGE_WEB_SOCKET_BROKER_URL } from '@/constants/path';

import { Client } from '@stomp/stompjs';
import { BEARER } from '@/constants/api';
import { formatTimeChat } from '@/utils/dateUtils';
import router from '@/plugins';
import type { IMessage } from '@stomp/stompjs';
import type { ChatContent, ChatUser } from '@/interfaces/chat';

const route = useRoute();
const user = useUsersStore();

const moviesId = ref<string>();
const chatRoomCount = ref(0);
const chatRoomTitle = ref('');
const stompClient = ref();
const chatContents = reactive<ChatContent[]>([]);
const chatUsers = ref();
const chatInput = ref('');

if (!user.isLogin) {
	router.push('/');
}

onMounted(async () => {
	moviesId.value = route.path.split('/')[2];
	const res: any = await findMoviesByIdApi(moviesId.value);
	chatRoomTitle.value = res.data.movies[0].title;
});

const exitChatRoom = () => {
	if (stompClient.value == null) {
		return;
	}
	stompClient.value.unsubscribe('/topic/' + moviesId.value);
	stompClient.value.deactivate();
};

onBeforeUnmount(exitChatRoom);

const handleSubscribeMessage = (message: IMessage) => {
	const messageBody = JSON.parse(message.body);
	chatContents.push(messageBody);
	chatUsers.value = messageBody.subscribedUsers.subscribedUsers;
	chatRoomCount.value = chatUsers.value.length;
};

// 유저가 로그인 된 이후에 STOMP JS 초기화룰 한번만 진행
watchEffect(() => {
	if (!user.isLogin || stompClient.value != null) {
		return;
	}
	stompClient.value = new Client({
		brokerURL: MESSAGE_WEB_SOCKET_BROKER_URL,
		connectHeaders: { Authorization: BEARER + user.state.accessToken },
		onConnect: () => stompClient.value.subscribe('/topic/' + moviesId.value, handleSubscribeMessage),
		onStompError: () => window.location.reload(),
	});
	stompClient.value.activate();
});

// 유저 목록에서 현재 유저를 맨 앞으로 이동
watch(chatUsers, () => {
	const currentUserIndex = chatUsers.value.findIndex((chatUser: ChatUser) => chatUser.usersId == user.state.id);
	const currentUser = chatUsers.value.splice(currentUserIndex, 1)[0];
	chatUsers.value.unshift(currentUser);
});

// 채팅 입력시, 스크롤 위치 맨아래로 조정
watch(chatContents, () => nextTick(() => (document.querySelector('.scroll-container')!.scrollTop = document.querySelector('.scroll-container')!.scrollHeight)));

const handleChatInput = (event: KeyboardEvent | MouseEvent) => {
	if (event.shiftKey) {
		return;
	}
	event.preventDefault();
	stompClient.value.publish({
		destination: '/app/send-message/' + moviesId.value,
		body: JSON.stringify({ content: chatInput.value }),
	});
	chatInput.value = '';
};

const isShowUserProfile = (chatContents: ChatContent[], index: number) => chatContents[index].id != user.state.id && (index == 0 || chatContents[index].id != chatContents[index - 1].id);
const isShowChatContentTime = (chatContents: ChatContent[], index: number) => index == chatContents.length - 1 || chatContents[index].id != chatContents[index + 1].id || formatTimeChat(chatContents[index].time) != formatTimeChat(chatContents[index + 1].time);
</script>
<style scoped>
.scroll-container {
	height: 550px;
	overflow-y: auto;
}
</style>
