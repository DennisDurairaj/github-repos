import { schema } from 'normalizr';

const repo = new schema.Entity(
  'repos',
  {},
  {
    processStrategy: entity => selectProperties(entity)
  }
);

const selectProperties = entity => {
  const { id, name, full_name, description, html_url } = entity;
  return { id, name, full_name, description, html_url };
};

const reposSchema = [repo];

export default reposSchema;
