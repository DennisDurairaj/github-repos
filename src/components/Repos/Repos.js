import React from 'react';
import ReposForm from './ReposForm';
import ReposList from './ReposList';

function Repos() {
  return (
    <React.Fragment>
      <ReposForm />
      <ReposList />
    </React.Fragment>
  );
}

export default Repos;
