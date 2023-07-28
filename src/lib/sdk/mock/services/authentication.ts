import type { Session } from '../../../models/session';
import type { User } from '../../../models/userModel';
import { AuthenticationBase } from '../../authenticationBase';

export class AuthenticationMock extends AuthenticationBase {
	public getCurrentUser(): Promise<User | null> {
		const session = document.cookie.split(';').find((item) => item.startsWith('session='));
		if (session) {
			const id = session.split('=')[1];
			return Promise.resolve({
				id: id,
				name: 'John Doe',
				email: 'johndoe@example.com'
			});
		}
		return null;
	}
	public async login(email: string, password: string): Promise<Session> {
		document.cookie = 'session=abc';
		return Promise.resolve({
			id: '123',
			clientName: 'web',
			clientVersion: '1.0.0',
			createdAt: '2021-08-01T00:00:00.000Z',
			expire: '2021-08-01T00:00:00.000Z'
		});
	}
	public async signUp(name: string, email: string, password: string) {
		return Promise.resolve({
			id: '123',
			name: name,
			email: email
		});
	}
	public logout() {
		document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
	}
	public loginWithDiscord() {
		throw new Error('Method not implemented.');
	}
	public loginWithGithub() {
		throw new Error('Method not implemented.');
	}
	public signInAnonymously() {
		document.cookie = 'session=anon';
		return Promise.resolve({
			id: '123',
			clientName: 'web',
			clientVersion: '1.0.0',
			createdAt: '2021-08-01T00:00:00.000Z',
			expire: '2021-08-01T00:00:00.000Z'
		});
	}
	public recoverPassword(email: string) {
		throw new Error('Method not implemented.');
	}
}
