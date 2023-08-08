import instance from './instance';

export const signin = (user:any) => {
    const url = "/signin";
    return instance.post(url, user);
}
export const signup = (user:any) => {
    const url = "/signup";
    return instance.post(url, user);
}
export const getUserInfo = (token: string) => {
  const url = "/getUserInfo";
  return instance.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const AddComment = (commentData:any) => {
  const url = '/comment';
  return instance.post(url, commentData);
};
export const GetComments = () => {
  const url = "/comments";
  return instance.get(url);
};

