
/**
 * “permissions”
 * @return  {[type]}  [return description]
 */
export const createPermission = (initPermission: number) => {
  return {
    insert: (permission: number) => {
      return createPermission(initPermission | permission);
    },
    remove: (permission: number) => {
      return createPermission(initPermission ^ permission);
    },
    has: (permission: number) => {
      return createPermission(initPermission & permission);
    },
    getPermission: () => {
      return initPermission;
    },
  };
};
