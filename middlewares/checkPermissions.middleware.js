const checkPermissions = (requiredPermissions) => {
  return (req, res, next) => {
    const adminPermissions = req.admin.permissions;

    const hasPermission = requiredPermissions.every((perm) => adminPermissions.includes(perm));

    if (!hasPermission) {
      return res.status(403).json({ message: 'Forbidden: You do not have the required permissions.' });
    }

    next();
  };
};

module.exports = { checkPermissions };
