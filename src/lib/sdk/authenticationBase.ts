import type { Session } from '../models/session';
import type { User } from '../models/userModel';

export abstract class AuthenticationBase {
	public abstract login(email: string, password: string): Promise<Session>;
	public abstract signUp(name: string, email: string, password: string): void;
	public abstract logout(): void;
	public abstract loginWithDiscord(): void;
	public abstract loginWithGithub(): void;
	public abstract signInAnonymously(): Promise<Session>;
	public abstract recoverPassword(email: string);
	public abstract getCurrentUser(): Promise<User | null>;
}
