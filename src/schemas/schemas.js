import { schema } from 'normalizr';

const user = new schema.Entity('users');
const repo = new schema.Entity('repos', { owner: user });

const entitiesSchema = [repo];

export default entitiesSchema;
