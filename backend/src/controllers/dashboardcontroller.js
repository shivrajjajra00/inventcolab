// const express = require('express');
// const router = express.Router();
// const User = require('../models/adminSchema'); // Import the User model
// const { validateDbId, raiseRecord404Error } = require('../middlewares');
// const { generateCrudMethods } = require('../services')
// const userCrud = generateCrudMethods(User)

// class dashboardcontroller {
//     async getById(req, res, next) {
//         try {
//             console.log(req.params.id)
//             const data = await userCrud.getById(req.params.id);
//             if (data) {
//                 res.send(data);
//             } else {
//                 raiseRecord404Error(req, res);
//             }
//         } catch (err) {
//             next(err);
//         }
//     }
// }

// const dashboardController = new dashboardcontroller();
// module.exports = dashboardController;