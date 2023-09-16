export interface ChatContent {
	id: string;
	name: string;
	picture: string;
	content: string;
	time: string;
	sendMessageType: string;
	subscribedUsers: {
		subscribedUsers: {
			usersId: number;
			name: string;
			picture: string;
		}[];
	};
}

export interface ChatUser {
	usersId: string;
	name: string;
	picture: string;
}
