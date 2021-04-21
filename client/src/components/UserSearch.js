import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { useHistory } from "react-router-dom";

const UserSearch = () => {
  const [userSearchInput, setUserSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState();
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();

  const handleSearch = ev => {
    setUserSearchInput(ev.target.value.toLowerCase());
  };

  const onSubmit = () => {
    setSubmitted(true);
    history.push(`/usersearch`);
  };

  const toggleOnClick = () => {
    if (userSearchInput.length > 1) {
      onSubmit();
    }
  };

  useEffect(() => {
    if (userSearchInput && submitted) {
      fetch(`http://localhost:4000/usersearch?name=${userSearchInput}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }).then(res =>
        res.json().then(data => {
          console.log("data", data.data);
          setSearchResult(data.data);
          setSubmitted(false);
        })
      );
    }
  }, [submitted]);

  const handleEnter = ev => {
    if (ev.key === "Enter" && userSearchInput.length > 1) {
      onSubmit();
    }
  };

  return (
    <>
      <SearchWrapper>
        <Input
          placeholder="Search users"
          type="text"
          id="userSearchBar"
          onChange={handleSearch}
          value={userSearchInput}
          onKeyDown={handleEnter}
        />
        <Search onClick={toggleOnClick}>
          <BiSearch />
        </Search>
      </SearchWrapper>
      {searchResult &&
        searchResult.map(user => {
          return (
            <>
              {user.photoURL ? (
                <img src={user.photoURL} alt="photoURL" />
              ) : null}
              <div>{user.name}</div>
              <div>{user.reviewsCount}</div>
            </>
          );
        })}
    </>
  );
};

const SearchWrapper = styled.div`
  border: 1px solid gray;
  border-radius: 15px;
  padding-right: 10px;
  position: relative;
  margin: 30px auto;
  display: flex;
  height: 40px;
  width: 431px;
`;

const Search = styled.div`
  background: transparent;
  position: absolute;
  cursor: pointer;
  font-size: 16px;
  outline: none;
  color: white;
  border: none;
  height: 40px;
  width: 40px;
  color: gray;
  left: 415px;
  top: 8px;
`;

const Input = styled.input`
  background: transparent;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 15px;
  outline: none;
  width: 200px;
  border: none;
  color: gray;
`;
export default UserSearch;
