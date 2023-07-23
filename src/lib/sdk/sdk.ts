import type { AuthenticationBase } from "./authenticationBase";
import type { DatabaseBase } from "./databaseBase";

export default interface SDK {
    Authentication: AuthenticationBase;
    Database: DatabaseBase;
}