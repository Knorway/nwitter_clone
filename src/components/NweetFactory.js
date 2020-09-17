import React, { useRef, useState } from 'react';
import { fireStorage, fireStore } from 'firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

function NweetFactory({ userObj }) {
	const [attachment, setAttachment] = useState('');
	const [nweet, setNweet] = useState('');
	const imgRef = useRef(null);

	const onSubmit = async (e) => {
		e.preventDefault();
		let attachmentUrl = '';
		if (attachment !== '') {
			const attachmentRef = fireStorage
				.ref()
				.child(`${userObj.uid}/${uuidv4()}`);
			const response = await attachmentRef.putString(
				attachment,
				'data_url'
			);
			attachmentUrl = await response.ref.getDownloadURL();
		}
		const item = {
			text: nweet,
			createdAt: Date.now(),
			creatorId: userObj.uid,
			attachmentUrl,
		};
		await fireStore.collection('nweets').add(item);
		imgRef.current.value = '';
		setNweet('');
		setAttachment('');
	};
	const onChange = (e) => {
		setNweet(e.target.value);
	};
	const onFileChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onloadend = (e) => {
			const result = e.currentTarget.result;
			setAttachment(result);
		};
		reader.readAsDataURL(file);
	};
	const onClearAttachment = () => {
		setAttachment('');
		imgRef.current.value = '';
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					type='text'
					placeholder="what's on your mind?"
					value={nweet}
					onChange={onChange}
				/>
				<input
					type='file'
					accept='image/*'
					onChange={onFileChange}
					ref={imgRef}
				/>
				<input type='submit' value='Nweet' />
				{attachment && (
					<div>
						<img
							src={attachment}
							alt='thumbnail'
							width='50px'
							height='50px'
						/>
						<button onClick={onClearAttachment}>Clear</button>
					</div>
				)}
			</form>
		</div>
	);
}

export default NweetFactory;
