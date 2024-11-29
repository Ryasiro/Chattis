export const conversations = [
	{
		_id: "1",
		admin: "user1",
		groupImage: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1634025439/01h5rz5b325xgav0w39tdc4kmg.jpg",
		groupName: "Group A",
		participants: ["user1", "user2", "user3"],
		_creationTime: 1638232272, // Unix timestamp for 2021-11-30 12:04:32 UTC
		lastMessage: {
			_id: "1",
			messageType: "text",
			content: "Hello everyone!",
			sender: "user1",
		},
		sender: "user1",
		isOnline: true,
	},
	{
		_id: "2",
		admin: null,
		groupImage: "https://static.miraheze.org/tampvanwiki/0/0a/Rusdi_Omaygot.png",
		groupName: "obed",
		participants: ["user4", "user5"],
		_creationTime: 2048072591, // Unix timestamp for 2021-11-30 13:04:32 UTC
		lastMessage: {
			_id: "2",
			messageType: "text",
			content: "ak sk obed",
			sender: "user2",
		},
		sender: "user4",
		isOnline: true,
	},
	{
		_id: "3",
		admin: null,
		groupImage: "https://i.pinimg.com/736x/be/3b/1e/be3b1e0db11cd0eaf765dae647d939fd.jpg",
		groupName: "syafik",
		participants: ["user6", "user7"],
		_creationTime: 1638239472, // Unix timestamp for 2021-11-30 14:04:32 UTC
		lastMessage: {
			_id: "3",
			messageType: "image",
			content: "image_url.jpg",
			sender: "user6",
		},
		sender: "user6",
		isOnline: false,
	},
	{
		_id: "4",
		admin: null,
		groupImage:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTybDrCd8of9PxlwDHA6ui_xPzgX0eBY-v-Hg&s",
		groupName: "arep",
		participants: ["user8", "user9", "user10"],
		_creationTime: 1638243072, // Unix timestamp for 2021-11-30 15:04:32 UTC
		lastMessage: {
			_id: "4",
			messageType: "video",
			content: "video_url.mp4",
			sender: "user9",
		},
		sender: "user9",
		isOnline: true,
	},
];

export const messages = [
	{
		_id: "1",
		content: "Hello everyone!",
		sender: "user1",
		messageType: "text",
	},
	{
		_id: "2",
		content: "Hey there!",
		sender: "user2",
		messageType: "text",
	},
	{
		_id: "3",
		content: "How's it going!?",
		sender: "user1",
		messageType: "text",
	},
	{
		_id: "4",
		content: "Fine, thanks!",
		sender: "user2",
		messageType: "text",
	},
];

export const users = [
	{
		_id: "user1",
		name: "Syafik",
		email: "johndoe@email.com",
		image: "https://static.miraheze.org/tampvanwiki/0/0a/Rusdi_Omaygot.png",
		admin: true,
		isOnline: true,
	},
	{
		_id: "user2",
		name: "Arep",
		email: "janedoe@email.com",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0gvNfxYfxjK6VUxAkepwgVCxKsd7Edj-NhJt6y-D7HQf-VOygXAE4iXikSXMI4_rQWd4&usqp=CAU",
		isOnline: true,
	},
	{
		_id: "user3",
		name: "Arya",
		email: "alice@email.com",
		image: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1634025439/01h5rz5b325xgav0w39tdc4kmg.jpg",
		isOnline: false,
	},
];
