import { UserNotFoundError } from '../../errors/index.js';
import {
    checkIfIdIsValid,
    invalidResponse,
    ok,
    serverError,
    userNotFoundResponse,
} from '../helpers/index.js';

export class DeleteUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase;
    }

    async execute(httpRequest) {
        try {
            const { userId } = httpRequest.params;

            const isUuidValid = checkIfIdIsValid(userId);

            if (!isUuidValid) {
                return invalidResponse();
            }

            const user = await this.deleteUserUseCase.execute(userId);

            return ok(user);
        } catch (error) {
            console.error(error);

            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse();
            }

            serverError();
        }
    }
}
