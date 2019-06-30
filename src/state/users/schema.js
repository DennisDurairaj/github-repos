import { schema } from 'normalizr';

const userSchema = new schema.Entity(
  'users',
  {},
  {
    idAttribute: 'login',
    processStrategy: entity => selectProperties(entity)
  }
);

const selectProperties = entity => {
  const { login, id, public_repos, repoIds } = entity;
  return { login, id, public_repos, repoIds };
};

export default userSchema;
