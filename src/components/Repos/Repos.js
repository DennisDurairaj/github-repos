import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUser } from '../../state/users';

function Repos({ fetchUser, match }) {
  // const repos = useSelector(getReposSelector);
  useEffect(() => {
    fetchUser(match.params.user);
  }, [fetchUser, match.params.user]);
  return (
    <React.Fragment>
      <p>Repos</p>
    </React.Fragment>
  );
}

const mapDispatchToProps = {
  fetchUser
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Repos)
);
