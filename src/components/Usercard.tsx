import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { USER_ACTIONS } from "../redux/types";
import useGithubSearchFetcher from "../utils/fetcher";

interface IUserCard {
  avatar_url: string;
  url: string;
  followers_url: string;
  following_url: string;
  starred_url: string;
  login: string;
  apiUrl: string;
}

const Usercard = ({ avatar_url, url, login, apiUrl }: IUserCard) => {
  const { fetcher } = useGithubSearchFetcher();
  const dispatch = useDispatch();
  const loadProfile = () => {
    dispatch({ type: USER_ACTIONS.GET_PROFILE_START });
    fetcher("GET", apiUrl)
      .response.then((res) => {
        dispatch({
          type: USER_ACTIONS.GET_PROFILE_DETAILS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log("details err is", err);
      });
  };
  return (
    <div className="card-container">
      <div className="top">
        <img alt="user profile" src={avatar_url} />
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          referrerPolicy="no-referrer">
          {login}
        </a>
      </div>
      <div className="bottom">
        <p>
          <a
            href={apiUrl}
            target="_blank"
            rel="noreferrer noopener"
            referrerPolicy="no-referrer">
            Click to go to applicable page on github.com API{" "}
          </a>
        </p>
        {/* button trigger modal */}
        <button
          type="button"
          data-toggle="modal"
          data-target="#modalview"
          className="view__details"
          onClick={loadProfile}>
          View Profile Modal
        </button>
      </div>
    </div>
  );
};

export default memo(Usercard);
