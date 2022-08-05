const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth')

//Create a new post
router.post('/', withAuth, (req, res) => {
 

    // expects {title: 'Taskmaster goes public!', 'post_url', user_id: 1}
    Post.create({title: req.body.title, body: req.body.body, user_id: req.session.user_id})
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            res.status(500).json(err);
        });
});

//Update the post title
router.put('/:id', (req, res) => {
    Post.update(
req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Delete a post
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
