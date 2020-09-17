import React from 'react';
import firebase from 'firebaseConfig';
import AuthForm from 'components/AuthForm';

const Auth = () => {
	const authService = firebase.auth();
	const onSocialClick = async (e) => {
		const name = e.target.name;
		let provider;
		if (name === 'google') {
			provider = new firebase.auth.GoogleAuthProvider();
		} else if (name === 'github') {
			provider = new firebase.auth.GithubAuthProvider();
		}
		await authService.signInWithPopup(provider);
	};

	return (
		<div>
			<AuthForm />
			<div>
				<button onClick={onSocialClick} name='google'>
					Continue with Google
				</button>
				<button onClick={onSocialClick} name='github'>
					Continue with Github
				</button>
			</div>
		</div>
	);
};

export default Auth;
