import store from "../reduxStore/store";
export const userRolesCheck = (key) => {
  // const { userDetails } = store.getState().app;
  return "admin";
 /*  let admin = userDetails?.permissionRes?.allModules;
  if (admin) {
    return "admin";
  } else
    return userDetails?.permissionRes?.modules?.find(
      (ele) => ele?.module == key
    )?.permissions; */
};
