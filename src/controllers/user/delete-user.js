import {
    checkIfIdIsValid,
    invalidResponse,
    ok,
    serverError,
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

            serverError();
        }
    }
}
