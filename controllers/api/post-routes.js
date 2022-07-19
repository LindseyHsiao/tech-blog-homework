const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// get all users title, contents, post creator’s username, and date created
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
        attributes: ['id', 'title', 'content', 'created_at'],
        order: [['created_at', 'DESC']], //order property is assigned a nested array that orders by the created_at column in descending order
        include: [
            // include the Comment model
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
              include: {
                model: User,
                attributes: ['username']
              }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });


});
//GET a single post
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'content', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
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

//Create a new post
router.post('/', (req, res) => {
    // expects {title: 'Taskmaster goes public!', 'content', user_id: 1}
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT /api/posts/comment
router.put('/comment', (req, res) => {
    Vote.create({
        user_id: req.body.user_id,
        post_id: req.body.post_id
    }).then(() => {
        // then find the post we just voted on
        return Post.findOne({
            where: {
                id: req.body.post_id
            },
            attributes: [
                'title',
                'content',
                'id',
                'created_at',
               
            ]
        })
            .then(dbPostData => res.json(dbPostData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    });
})

    //Update the post title
    router.put('/:id', (req, res) => {
        Post.update(
            {
                title: req.body.title
            },
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
