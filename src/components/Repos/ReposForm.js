import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

function ReposForm({ onSubmit, history }) {
  const [searchUser, setSearchUser] = useState('');

  const handleChange = event => {
    setSearchUser(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    history.push(`/${searchUser}`);
    onSubmit(searchUser);
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
