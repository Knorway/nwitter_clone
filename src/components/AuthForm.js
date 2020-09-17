import React, { useState } from 'react';
import firebase from 'firebaseConfig';

function AuthForm() {
	const authService = firebase.auth();
	const [text, setText] = useState('');
	const [password, setPassword] = useState('');
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState('');

	const onChange = (e) => {
		const { name, value } = e.target;
		if (name === 'text') {
			setText(value);
		} else if (name === 'password') {
			setPassword(value);
		}
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			if (newAccount) {
				await authService.createUserWithEmailAndPassword(
					text,
					password
				);
			} else {
				await authService.signInWithEmailAndPassword(text, password);
			}
		} catch (error) {
			setError(error.message);
		}
	};
	const toggleAccount = () => setNewAccount((prev) => !prev);

	return (
		<>
			<form onSubmit={onSubmit}>
				<input
					type='email'
					required
					placeholder='Email'
					name='text'
					value={text}
					onChange={onChange}
				/>
				<input
					type='password'
					required
					placeholder='password'
					name='password'
					value={password}
					onChange={onChange}
				/>
				<input
					type='submit'
					value={newAccount ? 'Create Account' : 'Sign In'}
				/>
				{error}
			</form>
			<span onClick={toggleAccount}>
				{newAccount ? 'Sign In' : 'Create Account'}
			</span>
		</>
	);
}

export default AuthForm;
