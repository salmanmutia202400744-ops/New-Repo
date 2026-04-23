const crypto = require("crypto");
const { users, sessions } = require("../data");

function sanitizeUser(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

function generateToken() {
  return crypto.randomBytes(24).toString("hex");
}

function getBearerToken(req) {
  const authHeader = req.headers.authorization || "";
  if (!authHeader.toLowerCase().startsWith("bearer ")) {
    return null;
  }

  return authHeader.slice(7).trim();
}

function issueTokenForUser(user) {
  const token = generateToken();
  sessions.push({
    token,
    userId: user.id,
    createdAt: new Date().toISOString()
  });
  return token;
}

function revokeToken(token) {
  const sessionIndex = sessions.findIndex(session => session.token === token);
  if (sessionIndex !== -1) {
    sessions.splice(sessionIndex, 1);
  }
}

function authenticateToken(req, res, next) {
  const token = getBearerToken(req);

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const session = sessions.find(entry => entry.token === token);
  if (!session) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  const user = users.find(entry => entry.id === session.userId);
  if (!user) {
    revokeToken(token);
    return res.status(401).json({ message: "Session user not found" });
  }

  req.user = user;
  req.token = token;
  next();
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }

  next();
}

function requireSelfOrAdmin(paramName = "id") {
  return function selfOrAdminMiddleware(req, res, next) {
    const requestedUserId = Number(req.params[paramName]);

    if (req.user.role === "admin" || req.user.id === requestedUserId) {
      return next();
    }

    return res.status(403).json({ message: "Access denied" });
  };
}

module.exports = {
  sanitizeUser,
  issueTokenForUser,
  revokeToken,
  authenticateToken,
  requireAdmin,
  requireSelfOrAdmin
};
