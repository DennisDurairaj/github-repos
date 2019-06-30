import { schema } from 'normalizr';

export const userSchema = new schema.Entity(
  'users',
  {},
  {
    idAttribute: user => user.login.toLowerCase(),
    processStrategy: entity => selectUserProperties(entity)
  }
);

const repo = new schema.Entity(
  'repos',
  { owner: userSchema },
  {
    idAttribute: repo => repo.name.toLowerCase(),
    processStrategy: entity => selectRepoProperties(entity)
  }
);

const selectRepoProperties = entity => {
  const { id, name, full_name, description, html_url, owner } = entity;
  return { id, name, full_name, description, html_url, owner };
};

const selectUserProperties = entity => {
  const { id, login, html_url } = entity;
  return { id, login, html_url };
};

export const repoSchema = [repo];
