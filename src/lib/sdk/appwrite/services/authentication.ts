import { Account, Client, Avatars } from "appwrite";
import type { User } from "../../../models/userModel";
import { AuthenticationBase } from "../../authenticationBase";
import type { Session } from "../../../models/session";


export default class AppwriteAuthentication extends AuthenticationBase {

    private account: Account;
    private avatar: Avatars;

    constructor(client: Client) {
        super();
        this.account = new Account(client);
        this.avatar = new Avatars(client);
    }

    public async login(email: string, password: string): Promise<Session> {
        const response = await this.account.createEmailSession(email, password);

        return {
            id: response.userId,
            createdAt: response.$createdAt,
            clientName: response.clientName,
            clientVersion: response.clientVersion,
            expire: response.expire,
        }
    }
    public async signUp(name: string, email: string, password: string) {
        await this.account.create(name, email, password);
    }
    public async logout(): Promise<void> {
        this.account.deleteSession("current");
    }
    public loginWithDiscord(): void {
        this.account.createOAuth2Session("discord", 'http://localhost:3000/#/home', window.location.href);
    }
    public loginWithGithub(): void {
        this.account.createOAuth2Session("github", 'http://localhost:3000/#/home', window.location.href);
    }
    public async signInAnonymously(): Promise<Session> {
        const response = await this.account.createAnonymousSession();
        return {
            id: response.userId,
            createdAt: response.$createdAt,
            clientName: response.clientName,
            clientVersion: response.clientVersion,
            expire: response.expire,
        }

    }
    public recoverPassword(email: string) {
        this.account.createRecovery(email, window.location.hostname + "/#/recover");
    }
    public async getCurrentUser(): Promise<User> {
        const response = await this.account.get();
        const avatar = this.avatar.getInitials(response.name ?? 'Anonymous User')
        return {
            id: response.$id,
            name: response.name ?? 'Anonymous User',
            email: response.email,
            avatar: avatar,
        }


    }

}