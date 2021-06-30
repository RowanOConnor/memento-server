import jwt from 'jsonwebtoken';

const SECRET = 'test';

const auth = async (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1];

    // Tokens longer than 500 characters will be Google Auth
    const isCustomAuth = token.length < 500;

    let decodedData;
    if (token && isCustomAuth) {
      // Custom Auth
      decodedData = jwt.verify(token, SECRET);

      req.userId = decodedData?.id;
    } else {
      // Google Auth
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }

    // Proceed to next action
    next();
  } catch (error) {
    res.redirect('/auth');
    console.log(error);
  }
};

export default auth;