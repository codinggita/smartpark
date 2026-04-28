// Firebase Auth Middleware
// Verifies the Firebase ID token from the Authorization header.
// For now, this is a simplified version. In production, use firebase-admin SDK.

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: No token provided',
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid token format',
    });
  }

  // TODO: In production, verify the token using firebase-admin SDK:
  // const decodedToken = await admin.auth().verifyIdToken(token);
  // req.user = decodedToken;

  // For now, attach the token to the request so controllers can use it
  req.token = token;
  next();
};

export default authMiddleware;
