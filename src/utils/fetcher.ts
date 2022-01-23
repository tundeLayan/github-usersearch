import { useCallback } from "react";
// import { useNavigate } from "react-router-dom";
import axios, {
  AxiosResponse,
  Method,
  AxiosRequestConfig,
  Canceler,
} from "axios";

const CancelToken = axios.CancelToken;

/**
 * @description Web application server call.
 */

export const GithubSearchSC = axios.create({
  baseURL: `https://api.github.com/`,
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

export const useGithubSearchFetcher = (): IUseSearchFetcher => {
  // const history = useNavigate();

  const fetcher = useCallback(function<T extends {} = any, P extends {} = any>(
    type: Method,
    url: string,
    config?: AxiosRequestConfigExt<P>,
  ): IFetcher<T> {
    let cancel: Canceler | undefined;
    const res = GithubSearchSC(url, {
      timeout: 30000,
      timeoutErrorMessage: "Request timed out!",
      ...config,
      method: type,
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    });

    return { cancel, response: res.then((res) => res).catch((err) => err) };
  },
  []);

  return { fetcher };
};

export default useGithubSearchFetcher;

interface IFetcher<T> {
  cancel?: Canceler;
  response: Promise<AxiosResponse<T>>;
}

interface AxiosRequestConfigExt<P> extends AxiosRequestConfig {
  data: P;
}

interface IUseSearchFetcher {
  fetcher: <T extends {} = any, P extends {} = any>(
    type: Method,
    url: string,
    config?: AxiosRequestConfigExt<P>,
  ) => IFetcher<T>;
}
