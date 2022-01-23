import React, { useState, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import useGithubSearchFetcher from "../utils/fetcher";
import { API } from "../constants/";
import { USER_ACTIONS } from "../redux/types";
import { RootStateType } from "../redux";
import Usercard from "../components/Usercard";
import Pagination from "../components/Pagination";

const Search = () => {
  const [filterInput, setFilterInput] = useReducer(
    (state: { username: string; search__per__page: number }, action: any) => ({
      ...state,
      ...action,
    }),
    {
      username: "",
      search__per__page: 0,
    },
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [profileDetails, setProfileDetails] = useState({});
  const { fetcher } = useGithubSearchFetcher();
  const dispatch = useDispatch();
  // users data list
  const {
    list: { items, total_count },
    loadingUsers,
  } = useSelector((state: RootStateType) => state.users);

  // users personal details
  const {
    profile,
    loadingProfile,
    //   avatar_url,
    //   bio,
    //   followers,
    //   following,
    //   name,
    //   login,
    //   url,
    //   company,
    //   location,
    //   twitter_username,
    // },
  } = useSelector((state: RootStateType) => state.profileDetails);

  // pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // implement adding dynamic amount of data to load
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterInput({ [name]: value });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let { username, search__per__page } = filterInput;
    if (search__per__page === 0) search__per__page = 50;
    if (username) {
      dispatch({ type: USER_ACTIONS.GET_STUDENTS_START });
      fetcher("GET", API.GET.SearchUsers(username, search__per__page))
        .response.then((res) => {
          dispatch({
            type: USER_ACTIONS.GET_STUDENTS,
            payload: res.data,
            query: username,
          });
        })
        .catch((err) => {
          console.log("Err is", err);
        })
        .finally(() => {
          dispatch({ type: USER_ACTIONS.GET_STUDENTS_END });
        });
    }
  };

  if (loadingUsers) return <h1 className="page-container">Loading...</h1>;

  return (
    <>
      {items.length > 0 ? (
        <div className="page-container">
          <h3 className="title">
            Showing {items.length} available repository results from{" "}
            {total_count} possible reults
          </h3>
          {currentPosts.map((user: IUser) => {
            return (
              <Usercard
                key={user.id}
                url={user.html_url}
                apiUrl={user.url}
                avatar_url={user.avatar_url}
                followers_url={user.followers_url}
                following_url={user.following_url}
                starred_url={user.starred_url}
                login={user.login}
              />
            );
          })}
          <Pagination
            totalPosts={items.length}
            paginate={paginate}
            {...{ postsPerPage }}
          />
        </div>
      ) : (
        <div className="page-container">
          <h1>Search more than 552M issues</h1>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div
              className="form-group"
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}>
              <label htmlFor="search__per__page__id">
                Number of items to return
              </label>
              <input
                id="search__per__page__id"
                className="form-control"
                name="search__per__page"
                aria-label="user search"
                type="text"
                value={filterInput.search__per__page}
                placeholder="Posts to load"
                onChange={handleChange}
                style={{ display: "inline-block" }}
                autoFocus
              />
            </div>
            <div
              className="form-group"
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}>
              <label htmlFor="user-search">Search Github</label>
              <input
                id="user-search"
                className="form-control"
                name="username"
                aria-label="user search"
                type="text"
                value={filterInput.username}
                placeholder="Search Github"
                onChange={handleChange}
                style={{ display: "inline-block" }}
                autoFocus
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
          <p className="subtitle">
            ProTip! For an advanced search, use some of our
          </p>
        </div>
      )}
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="modalview"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modalviewcenter"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            {loadingProfile ? (
              <h1>Loading details</h1>
            ) : (
              <>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    {profile?.name}'s Profile
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="modal-body-container">
                    <img src={profile?.avatar_url} alt="" className="image" />
                    <div className="details">
                      <h4 className="name">{profile?.name}</h4>
                      <p className="username">{profile?.login}</p>
                      <h5 className="bio">{profile?.bio}</h5>
                      <p className="followers_following">
                        {profile?.followers} followers<b>.</b>
                        {"  "}
                        {profile?.following} following
                      </p>
                      <p className="company">{profile?.company}</p>
                      <p className="location">{profile?.location}</p>
                      <p className="twitter">{profile?.twitter_username}</p>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal">
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
