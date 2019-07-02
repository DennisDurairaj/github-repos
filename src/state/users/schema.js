import { schema } from "normalizr";

export const userSchema = new schema.Entity(
  "user",
  {},
  {
    idAttribute: user => user.login.toLowerCase(),
    processStrategy: entity => selectUserProperties(entity)
  }
);

const selectUserProperties = entity => {
  const { id, login, html_url } = entity;
  return { id, login, html_url };
};

export default userSchema;
