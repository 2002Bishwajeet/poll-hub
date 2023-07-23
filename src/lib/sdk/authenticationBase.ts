import type { User } from "../models/userModel";

export abstract class AuthenticationBase {
    public abstract login(email: string, password: string) :Promise<User>;
    public abstract signUp(name: string, email: string, password: string);
    public abstract logout(): void;
    public abstract loginWithDiscord() : void;
    public abstract loginWithGithub() : void;
    public abstract signInAnonymously() : Promise<User>;
    public abstract recoverPassword(email: string);
    public abstract getCurrentUser() : User;
}