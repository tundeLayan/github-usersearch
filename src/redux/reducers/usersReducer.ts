import { USER_ACTIONS } from "../types";

const init: IUsers = {
  list: {
    incomplete_results: false,
    items: [],
    total_count: 0,
  },
  query: "",
  loadingUsers: false,
};

export default function reducer(state: IUsers = init, action: IAction): any {
  switch (action?.type) {
    case USER_ACTIONS.GET_STUDENTS:
      let list = action.payload;
      let query = action.query;
      return { loadingUsers: false, ...{ list, query } };
    case USER_ACTIONS.GET_STUDENTS_START:
      return { ...state, loadingUsers: true };
    case USER_ACTIONS.GET_STUDENTS_FAIL:
    case USER_ACTIONS.GET_STUDENTS_END:
      return { ...state, loadingUsers: false };
    default:
      return state;
  }
}
