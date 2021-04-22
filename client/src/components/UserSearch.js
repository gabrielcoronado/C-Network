import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import UserImg from "./assets/placeholderImg.png";
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
  };

  const toggleOnClick = () => {
    if (userSearchInput.length > 1) {
      onSubmit();
    }
  };

  useEffect(() => {
    if (userSearchInput && submitted) {
      fetch(`/usersearch?name=${userSearchInput}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }).then(res =>
        res.json().then(data => {
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
    <Wrapper>
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
      <UserWrapper>
        {searchResult &&
          searchResult.map(user => {
            return (
              <User
                key={user._id}
                onClick={() => history.push(`/users/${user._id}`)}
              >
                {user.photoURL ? (
                  <ProfilePic src={user.photoURL} alt="photoURL" />
                ) : (
                  <ProfilePic src={UserImg} alt="photoURL" />
                )}
                <UserInfo>
                  <div>{user.name}</div>
                  <div>Reviews:{user.reviewsCount}</div>
                </UserInfo>
              </User>
            );
          })}
      </UserWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 auto;
`;

const UserInfo = styled.div`
  padding-left: 20px;
`;

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

const User = styled.div`
  display: flex;
`;

const UserWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
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

const ProfilePic = styled.img`
  border-radius: 50%;
  height: 50px;
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
