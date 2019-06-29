import React, { useState } from 'react';
import { connect } from 'react-redux';
import ReposForm from './ReposForm';
import ReposList from './ReposList';
import { fetchRepos } from '../../state/repos';

function Repos({ fetchRepos }) {
  const onSubmit = user => {
    fetchRepos(user);
  };
  return (
    <React.Fragment>
      <ReposForm onSubmit={onSubmit} />
      <ReposList />
    </React.Fragment>
  );
}

const mapDispatchToProps = {
  fetchRepos
};

export default connect(
  null,
  mapDispatchToProps
)(Repos);
