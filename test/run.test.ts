import { db } from './test-utils';

db.sequelize.sync({force: false})
    .then(() => run());