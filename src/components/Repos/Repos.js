import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import ReposForm from './ReposForm';
import ReposList from './ReposList';
import { fetchUser } from '../../state/users';

function Repos({ fetchUser }) {
  // const repos = useSelector(getReposSelector);
  const onSubmit = user => {
    fetchUser(user);
  };
  return (
    <React.Fragment>
      <ReposForm onSubmit={onSubmit} />
      <ReposList />
    </React.Fragment>
  );
}

const mapDispatchToProps = {
  fetchUser
};

export default connect(
  null,
  mapDispatchToProps
)(Repos);
