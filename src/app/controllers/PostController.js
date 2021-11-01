import * as Yup from 'yup';

import Post from '../models/Posts';
import User from '../models/User';
import File from '../models/File';

class PostController {
  async index(req, res) {
    const posts = await Post.findAll({
      attributes: ['id', 'user_id', 'posts', 'User.name', 'User.avatar_id'],
      include: [
        {
          model: User,
          attributes: ['name', 'avatar_id'],
          include: [
            {
              model: File,
              attributes: ['path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json({ posts });
  }

  async store(req, res) {
    const id = req.userId;
    req.body.user_id = id;
    const schema = Yup.object().shape({
      user_id: Yup.number().required(),
      posts: Yup.string().max(255).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Post contain more than 255 character.' });
    }
    const { user_id, posts } = await Post.create(req.body);
    return res.json({ user_id, posts });
  }

  async update(req, res) {
    const postExists = await Post.findByPk(req.body.postId);

    if (!postExists) {
      return res.status(400).json({ error: 'Post does not exist' });
    }

    const { user_id } = postExists;

    if (user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: 'User id does not match the post user id.' });
    }
    const { posts } = await postExists.update(req.body);

    return res.status(200).json({ posts });
  }
}

export default new PostController();
