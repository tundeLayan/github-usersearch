import { USER_ACTIONS } from "../types";

const init: IDetails = {
  avatar_url: "",
  bio: "",
  blog: "",
  company: "",
  created_at: "",
  email: null,
  events_url: "",
  followers: 0,
  followers_url: "",
  following: 0,
  following_url: "",
  gists_url: "",
  gravatar_id: "",
  hireable: true,
  html_url: "",
  id: 0,
  location: "",
  login: "",
  name: "",
  node_id: "",
  organizations_url: "",
  public_gists: 0,
  public_repos: 0,
  received_events_url: "",
  repos_url: "",
  site_admin: false,
  starred_url: "",
  subscriptions_url: "",
  twitter_username: null,
  type: "",
  updated_at: "",
  url: "",
};

export default function reducer(state: any = init, action: IAction): any {
  switch (action?.type) {
    case USER_ACTIONS.GET_PROFILE_DETAILS:
      let profile = action.payload;
      return { loadingProfile: false, ...{ profile } };
    case USER_ACTIONS.GET_PROFILE_START:
      return { ...state, loadingProfile: true };
    case USER_ACTIONS.GET_PROFILE_FAIL:
    case USER_ACTIONS.GET_PROFILE_END:
      return { ...state, loadingProfile: false };
    default:
      return state;
  }
}
