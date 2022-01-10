const express = require('express');
const router = express.Router();


// User models
const User = require('../../models/User');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
    if (req.user) {
        User.findById(req.user.id)
            .then(user => res.json(user.list))
    } else {
        res.send('no');
    }
});

// add todo list
router.post('/add', (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            user.list.push(req.body)
            user.save()
            res.send(user.list)
        })
});

// delete todo list
router.delete('/:id', (req, res) => {
    const itemId = req.params.id;
    User.findById(req.user.id)
        .then(user => {
            user.list.forEach(item => {
                if (item._id == itemId) {
                    user.list.pull(item)
                }
            })
            user.save()
            res.send(user.list)
        })
});


module.exports = router;