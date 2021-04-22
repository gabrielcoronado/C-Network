import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import UserImg from "./assets/placeholderImg.png";
import {
  Wrapper,
  UserInfo,
  SearchWrapper,
  User,
  UserWrapper,
  Search,
  ProfilePic,
  Input
} from "./styling/UserSearchStyles";

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

export default UserSearch;
