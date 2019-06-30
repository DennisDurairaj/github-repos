import { schema } from 'normalizr';

const repo = new schema.Entity('repos');

const reposSchema = [repo];

export default reposSchema;
