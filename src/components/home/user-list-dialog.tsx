
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ImageIcon, MessageSquareDiff } from "lucide-react";
import { Id } from "../../../convex/_generated/dataModel";
import { IdField } from "convex/server";
import { createConversation, generateUploadUrl } from "../../../convex/conversations";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import toast from "react-hot-toast";
import { useConversationStore } from "@/store/chat-store";
// import { useConversationStore } from "@/store/chat-store";


const UserListDialog = () => {
	const [selectedUsers, setSelectedUsers] = useState<Id<"users">[]>([]);
	const [groupName, setGroupName] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [renderedImage, setRenderedImage] = useState("");

	const imgRef = useRef<HTMLInputElement>(null);
	const dialogCloseRef = useRef<HTMLInputElement>(null);

	const createConversation = useMutation(api.conversations.createConversation);
	const generateUploadUrl = useMutation(api.conversations.generateUploadUrl)
	const me = useQuery(api.users.getMe);
	const users = useQuery(api.users.getUsers);

	// tambahan buat grup imej
	const { setSelectedConversation } = useConversationStore();

	const handleCreateConversation = async () => {
		if(selectedUsers.length ===0 ) return;
		setIsLoading(true);
		try {
			const isGroup = selectedUsers.length > 1;
			
			let conversationId;
			if(!isGroup){
				conversationId= await createConversation({
					participants: [...selectedUsers, me?._id!],
					isGroup: false
				})

			}else{
				const postUrl = await generateUploadUrl();

				const result = await fetch(postUrl, {
					method: "POST",
					headers: {"Content-Type":selectedImage?.type!},
					body: selectedImage,
				})

				const {storageId} = await result.json();

				conversationId = await createConversation({
					participants:[...selectedUsers, me?._id!],
					isGroup: true,
					admin: me?._id!,
					groupName,
					groupImage: storageId,
				});

			}
			setSelectedUsers([]);
			dialogCloseRef.current?.click();
			setSelectedUsers([]);
			setGroupName("");
			setSelectedImage(null);

			// TODO => Update a global state called "selectedConversatio" // tambahan buat grup imej
			const conversationName = isGroup ? groupName : users?.find((user) => user._id === selectedUsers[0])?.name;

			setSelectedConversation({
				_id : conversationId,
				participants: selectedUsers,
				isGroup,
				image: isGroup ? renderedImage : users?.find((user) => user._id === selectedUsers[0])?.image,
				name: conversationName,
				admin: me?._id!,
			});

		} catch (err) {
			toast.error("failed to create conversation");
			console.error(err);
		}finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if(!selectedImage) return setRenderedImage('')
			const reader = new FileReader();
		reader.onload = (e) => setRenderedImage(e.target?.result as string);
		reader.readAsDataURL(selectedImage)
	},[selectedImage] )
	return (
		<Dialog>
			<DialogTrigger>
				<MessageSquareDiff size={20} />
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					{/* TODO: <DialogClose /> will be here */}
					{/* <DialogClose ref={dialogCloseRef} /> */}
					<div ref={dialogCloseRef}>
						<DialogClose />
					</div>
					<DialogTitle>USERS</DialogTitle>
				</DialogHeader>

				<DialogDescription>Start a new chat</DialogDescription>
				{renderedImage && (
					<div className='w-16 h-16 relative mx-auto'>
						<Image src={renderedImage} fill alt='user image' className='rounded-full object-cover' />
					</div>
				)}
				{/* TODO: input file */}
				<input
					type='file'
					accept='image/*'
					ref={imgRef}
					hidden
					onChange={(e) => setSelectedImage(e.target.files![0])}
				/>
				{selectedUsers.length > 1 && (
					<>
						<Input
							placeholder='Group Name'
							value={groupName}
							onChange={(e) => setGroupName(e.target.value)}
						/>
						<Button className='flex gap-2' onClick={() => imgRef.current?.click()}>
							<ImageIcon size={20} />
							Group Image
						</Button>
					</>
				)}
				<div className='flex flex-col gap-3 overflow-auto max-h-60'>
					{users?.map((user) => (
						<>
						<div
							key={user._id}
							className={`flex gap-3 items-center p-2 rounded cursor-pointer active:scale-95 
								transition-all ease-in-out duration-300
							${selectedUsers.includes(user._id) ? "bg-green-primary" : ""}`}
							onClick={() => {
								if (selectedUsers.includes(user._id)) {
									setSelectedUsers(selectedUsers.filter((id) => id !== user._id));
								} else {
									setSelectedUsers([...selectedUsers, user._id]);
								}
							}}
						>
							<Avatar className='overflow-visible'>
								{user.isOnline && (
									<div className='absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-foreground' />
								)}

								<AvatarImage src={user.image} className='rounded-full object-cover' />
								<AvatarFallback>
									<div className='animate-pulse bg-gray-tertiary w-full h-full rounded-full'></div>
								</AvatarFallback>
							</Avatar>

							<div className='w-full '>
								<div className='flex items-center justify-between'>
									<p className='text-md font-medium'>{user.name || user.email.split("@")[0]}</p>
								</div>
							</div>
						</div>
						</>
					))}
				</div>
				<div className='flex justify-between'>
					<Button variant={"outline"}>Cancel</Button>
					<Button
					onClick={handleCreateConversation}
						disabled={selectedUsers.length === 0 || (selectedUsers.length > 1 && !groupName) || isLoading}
					>
						{/* spinner */}
						{isLoading ? (
							<div className='w-5 h-5 border-t-2 border-b-2  rounded-full animate-spin' />
						) : (
							"Create"
						)}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
export default UserListDialog;

// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import { Id } from "../../../convex/_generated/dataModel";

// function randomID(len: number) {
// 	let result = "";
// 	if (result) return result;
// 	var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
// 		maxPos = chars.length,
// 		i;
// 	len = len || 5;
// 	for (i = 0; i < len; i++) {
// 		result += chars.charAt(Math.floor(Math.random() * maxPos));
// 	}
// 	return result;
// }

// export function getUrlParams(url = window.location.href) {
// 	let urlStr = url.split("?")[1];
// 	return new URLSearchParams(urlStr);
// }

// const appID = +process.env.NEXT_PUBLIC_ZEGO_APP_ID!;
// const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET!;

// export default function VideoUIKit() {
// 	const roomID = getUrlParams().get("roomID") || randomID(5);

// 	let myMeeting = (element: HTMLDivElement) => {
// 		// generate Kit Token
// 		const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
// 			appID,
// 			serverSecret,
// 			roomID,
// 			randomID(5),
// 			randomID(5)
// 		);

// 		const zp = ZegoUIKitPrebuilt.create(kitToken);
// 		zp.joinRoom({
// 			container: element,
// 			sharedLinks: [
// 				{
// 					name: "Personal link",
// 					url:
// 						window.location.protocol +
// 						"//" +
// 						window.location.host +
// 						window.location.pathname +
// 						"?roomID=" +
// 						roomID,
// 				},
// 			],
// 			scenario: {
// 				mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
// 			},
// 		});
// 	};

// 	return <div className='myCallContainer' ref={myMeeting} style={{ width: "100vw", height: "100vh" }}></div>;
// }

