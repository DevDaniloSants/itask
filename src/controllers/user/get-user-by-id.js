import {
    checkIfIdIsValid,
    invalidResponse,
    ok,
    serverError,
    userNotFoundResponse,
} from '../helpers/index.js';

export class GetUserByIdController {
    constructor(getUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase;
    }

    async execute(httpRequest) {
        try {
            const isUuidValid = checkIfIdIsValid(httpRequest.params.id);

            if (!isUuidValid) {
                return invalidResponse();
            }

            const user = await this.getUserByIdUseCase.execute(
                httpRequest.params.id,
            );

            if (!user) {
                return userNotFoundResponse();
            }

            return ok(user);
        } catch (error) {
            console.error(error);

            return serverError();
        }
    }
}
