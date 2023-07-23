import type { User } from "../../../models/userModel";
import { AuthenticationBase } from "../../authenticationBase";

export class AuthenticationMock extends AuthenticationBase {
    public getCurrentUser(): User {
        const session = document.cookie.split(";").find((item) => item.startsWith("session="));
        if (session) {
            const id = session.split("=")[1];
            return {
                id: id,
                name: "John Doe",
                email: "johndoe@example.com",
            };
        }
        return null;
    }
    public async login(email: string, password: string): Promise<User> {
        document.cookie = "session=abc";
        return Promise.resolve({
            id: "123",
            name: "John Doe",
            email: email,
        });

    }
    public async signUp(name: string, email: string, password: string) {
        return Promise.resolve({
            id: "123",
            name: name,
            email: email,
        });
    }
    public logout() {
        document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    public loginWithDiscord() {
        throw new Error("Method not implemented.");
    }
    public loginWithGithub() {
        throw new Error("Method not implemented.");
    }
    public signInAnonymously() {
        document.cookie = "session=anon";
        return Promise.resolve({
            id: "123",
            name: "John Doe",
            email: "john@example.com",
        })
    }
    public recoverPassword(email: string) {
        throw new Error("Method not implemented.");
    }

}