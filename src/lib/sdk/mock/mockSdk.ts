import type SDK from "../sdk";
import { AuthenticationMock } from "./authentication";
import { DatabaseMock } from "./database";

class MockSDK implements SDK {

    Authentication: AuthenticationMock = new AuthenticationMock();
    Database: DatabaseMock = new DatabaseMock();
}

export default new MockSDK();