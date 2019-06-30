import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function ReposForm({ history, location }) {
  const [searchUser, setSearchUser] = useState('');

  useEffect(() => {
    setSearchUser(location.pathname.substring(1));
  }, [location.pathname]);

  const handleChange = event => {
    setSearchUser(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    history.push(`/${searchUser}`);
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <label>Search</label>
        <input value={searchUser} onChange={handleChange} type="text" />
        <input type="submit" value="Submit" />
      </form>
    </React.Fragment>
  );
}

export default withRouter(ReposForm);
