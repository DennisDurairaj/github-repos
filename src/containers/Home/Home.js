import React from 'react';
import { fetchRepos } from '../../state/entities/index';
import { connect } from 'react-redux';
import Search from '../../components/Search/Search';
import Repos from '../Repos/Repos';

function Home({ fetchRepos }) {
  console.log('home');

  const handleSubmit = search => {
    fetchRepos(search);
  };

  return (
    <React.Fragment>
      <Search onSubmit={handleSubmit} />
      <Repos />
    </React.Fragment>
  );
}

const mapDispatchToProps = {
  fetchRepos
};

export default connect(
  null,
  mapDispatchToProps
)(Home);
