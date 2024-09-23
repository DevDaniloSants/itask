import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export class CreateUserUseCase {
    constructor(createUserRepository) {
        this.createUserRepository = createUserRepository;
    }
    async execute(createUserParams) {
        // se o e-mail já está em uso

        // criptografar senha
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

        // gerar um id para o usuário
        const userId = uuidv4();

        // criar o usuário com os dados criptografados e id gerado
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        };

        // chamar o repository
        const createdUser = await this.createUserRepository.execute(user);

        return createdUser;
    }
}
