/* Author: Team */

const express = require('express');
const router = express.Router();

const classifyRecipeRoutes = require('./routes/ClassifyRecipeRoutes');
const pubsub = require('./routes/PubSub');
//Main API Endpoint
router.get('/', (req,res) => {
    return res.status(200).json({
        success: true,
        message: "This is an API Endpoint"
    });
});

// Add all other routes here.
router.use('/classification', classifyRecipeRoutes)
router.use('/pubsub', pubsub)

//404 Error Handling
router.use(function(req, res, next) {
    res.status(404).json({
        success: false,
        message: "Page not found"
    });
});

module.exports = router;