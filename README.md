Quick Start
------------



MERN fullstack technology
-----

1. MongoDB + Mongoose
1. Express.js
1. React.js
1. Node.js


Frontend
---------

- redux
- react-router-dom
- react-bootstrap


Backend
---------

- jwt token
- bcrypt



API
----

1. /api/signup
1. /api/login
1. /api/users
1. /api/users/:user_email
1. /api/logout


DB Schema
-----------

```javascript
{
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  role: String,
  team: [String],
  comment: String,
  location: String,
  timestamp: {
    type: Date,
    default: Date.now()
  }
}
```