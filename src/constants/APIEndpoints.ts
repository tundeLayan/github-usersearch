export const GET = {
  /**
   * @description
   */
  SearchUsers: (query: string, perPage: number = 50) =>
    `search/users?q=${query}&per_page=${perPage}`,
};
