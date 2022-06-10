const { Router } = require('express');

const usersRoute = require('../routes/user/user');
const contentsRoute = require('../routes/content/content');


const router = Router();


router.get('/', (req, res, next) => {
    res.json('estoy en home')
})

router.use('/users', usersRoute);
router.use('/contents', contentsRoute);


module.exports = router;