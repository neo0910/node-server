import {Request, Response, Router} from 'express';
import {Repository} from 'typeorm';

import {AppDataSource} from '../data-source';
import {StatusCodes} from 'http-status-codes';
import {User} from '../entity/user.entity';
import {UserCreateDto} from '../dto/user-create.dto';
import {UsersGetDto} from '../dto/users-get.dto';
import {validateRequestBody, validateRequestParams} from '../middlewares/validation';

class UserController {
  private readonly router: Router;
  private readonly userRepository: Repository<User>;

  constructor() {
    this.router = Router();
    this.userRepository = AppDataSource.getRepository(User);

    this.router.route('/users').get(this.getUsers).post(validateRequestBody(UserCreateDto), this.createUser);
    this.router.route('/users/:id').all(validateRequestParams(UsersGetDto)).get(this.getUser).delete(this.deleteUser);
  }

  private getUsers = async (req: Request, res: Response) => {
    const users = await this.userRepository.find();
    return res.json(users);
  };

  private createUser = async (req: Request<unknown, unknown, UserCreateDto>, res: Response) => {
    await this.userRepository.save(req.body);
    return res.sendStatus(StatusCodes.CREATED);
  };

  private getUser = async (req: Request<UsersGetDto>, res: Response) => {
    const user = await this.userRepository.findOneBy({id: req.params.id});
    return res.json(user);
  };

  private deleteUser = async (req: Request<UsersGetDto>, res: Response) => {
    const user = await this.userRepository.findOneBy({id: req.params.id});
    await this.userRepository.remove(user);
    return res.sendStatus(StatusCodes.NO_CONTENT);
  };

  get routes() {
    return this.router;
  }
}

const userController = new UserController();

export {userController};
