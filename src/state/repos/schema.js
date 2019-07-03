import { schema } from "normalizr";
import userSchema from "../users/schema";

const repo = new schema.Entity(
  "repos",
  { owner: userSchema },
  {
    idAttribute: repo => repo.name.toLowerCase(),
    processStrategy: entity => selectRepoProperties(entity)
  }
);

const selectRepoProperties = entity => {
  const {
    id,
    name,
    full_name,
    description,
    html_url,
    stargazers_count,
    watchers_count,
    language,
    forks_count,
    owner
  } = entity;
  return {
    id,
    name,
    full_name,
    description,
    html_url,
    stargazers_count,
    watchers_count,
    language,
    forks_count,
    owner
  };
};

export const reposSchema = [repo];
