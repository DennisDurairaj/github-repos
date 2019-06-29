import React, { useState } from 'react';

function ReposForm({ onSubmit }) {
  const [searchUser, setSearchUser] = useState('');

  const handleChange = event => {
    setSearchUser(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(searchUser);
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <label>Search</label>
        <input value={searchUser} onChange={handleChange} type="text" />
      </form>
    </React.Fragment>
  );
}

export default ReposForm;
