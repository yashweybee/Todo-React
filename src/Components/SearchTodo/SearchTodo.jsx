import React, { useState } from "react";

const SearchTodo = () => {
  const [searchText, setSearchText] = useState("");
  const handeSubmit = (e) => {
    e.preventDefault();
    console.log(searchText);
  };

  return (
    <div>
      <form onSubmit={handeSubmit}>
        <input type="text" onChange={(e) => setSearchText(e.target.value)} />
      </form>
    </div>
  );
};

export default SearchTodo;
