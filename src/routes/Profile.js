import React, { useEffect, useState } from 'react';
import { authService, fireStore } from 'firebaseConfig';
import { useHistory } from 'react-router-dom';

const Profile = ({ userObj, refreshUser }) => {
	const history = useHistory();
	const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
	const onLogOutClick = () => {
		authService.signOut();
		history.push('/');
	};
	const onChange = (e) => setNewDisplayName(e.target.value);
	const onSubmit = async (e) => {
		e.preventDefault();
		if (newDisplayName !== userObj.displayName) {
			await userObj.updateProfile({
				displayName: newDisplayName,
			});
			refreshUser();
		}
	};
	const getMyNweet = async () => {
		await fireStore
			.collection('nweets')
			.where('creatorId', '==', userObj.uid)
			.orderBy('createdAt')
			.get();
	};
	useEffect(() => {
		getMyNweet();
	});
	return (
		<>
			<form onSubmit={onSubmit}>
				<input
					type='text'
					onChange={onChange}
					placeholder='Display name'
					value={newDisplayName}
				/>
				<input type='submit' value='Update Profile' />
			</form>
			<button onClick={onLogOutClick}>Log Out</button>
		</>
	);
};

export default Profile;
