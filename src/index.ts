import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as cors from 'cors';

dotenv.config();

import {AppDataSource} from './data-source';
// import {User} from './entity/user.entity';
import {userController} from './controller/user.controller';

const PORT = 5000;

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    app.use('/api', userController.routes);

    app.listen(PORT, () => console.log(`Express server has started on port ${PORT}`));

    // await AppDataSource.manager.save(
    //   AppDataSource.manager.create(User, {
    //     firstName: 'Timber',
    //     lastName: 'Saw',
    //     age: 27,
    //   })
    // );

    // await AppDataSource.manager.save(
    //   AppDataSource.manager.create(User, {
    //     firstName: 'Phantom',
    //     lastName: 'Assassin',
    //     age: 24,
    //   })
    // );
  })
  .catch(console.log);
