import type SDK from '../sdk';
import { AuthenticationMock } from './services/authentication';
import { DatabaseMock } from './services/database';

class MockSDK implements SDK {
	Authentication: AuthenticationMock = new AuthenticationMock();
	Database: DatabaseMock = new DatabaseMock();
}

export default new MockSDK();
