const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const primeMedians = require('./calculations');
const bodyParser = express.json();
const { check, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

const app = express();

app.use(cors());
app.use(helmet());

// Rate Limiting
const limit = rateLimit({
  max: 100, // max requests
  windowMs: 60 * 60 * 1000, // 1 Hour of 'ban' / lockout
  message: 'Too many requests' // message to send
});

app
  .route('/api', limit)
  .post(
    bodyParser,
    [check('upperLimit').isInt({ min: 0, max: 1000000 })],
    (req, res) => {
      if (!req.body.upperLimit) return res.sendStatus(400);
      // Finds the validation errors in this request and wraps them in an object
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      let n = req.body.upperLimit;
      n < 1000000 && res.send(primeMedians(n));
    }
  );

module.exports = app;
