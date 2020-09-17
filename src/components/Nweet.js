import React, { useState } from 'react';
import { fireStorage, fireStore } from 'firebaseConfig';

function Nweet({ nweetObj, isOwner }) {
	const [editing, setEditing] = useState(false);
	const [newNweet, setNewNweet] = useState(nweetObj.text);

	const onDeleteClick = async () => {
		const ok = window.confirm('are you sure to delete this nweet?');
		if (ok) {
			await fireStore.doc(`nweets/${nweetObj.id}`).delete();
			if (nweetObj.attachmentUrl)
				await fireStorage.refFromURL(nweetObj.attachmentUrl).delete();
		}
	};
	const toggleEditing = () => setEditing((prev) => !prev);
	const onChange = (e) => {
		const value = e.target.value;
		setNewNweet(value);
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		await fireStore.doc(`nweets/${nweetObj.id}`).update({
			text: newNweet,
		});
		setEditing(false);
	};

	return (
		<div>
			{editing ? (
				<>
					{isOwner && (
						<>
							<form onSubmit={onSubmit}>
								<input
									type='text'
									value={newNweet}
									required
									placeholder='Edit your nweet'
									onChange={onChange}
								/>
								<input type='submit' value='Update Nweet' />
							</form>
							<button onClick={toggleEditing}>cancel</button>
						</>
					)}
				</>
			) : (
				<>
					<h4>{nweetObj.text}</h4>
					{nweetObj.attachmentUrl && (
						<img
							src={nweetObj.attachmentUrl}
							width='50px'
							height='50px'
							alt='thumbnail'
						/>
					)}
					{isOwner && (
						<>
							<button onClick={onDeleteClick}>
								Delete Nweet
							</button>
							<button onClick={toggleEditing}>Edit Nweet</button>
						</>
					)}
				</>
			)}
		</div>
	);
}

export default Nweet;
