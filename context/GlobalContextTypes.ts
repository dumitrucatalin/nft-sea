export type GlobalStateType = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
};
