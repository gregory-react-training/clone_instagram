const Post = require("../models/Post");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

module.exports = {
  // Chamado de promisses no javascript, quando se faz busca de um registro na base de dados não é
  // basicamente em tempo real, demora um tempo para ser executado, o que deve ser feito de
  // maneira assíncrona
  async index(req, res) {
    const posts = await Post.find().sort("-createdAt");

    return res.json(posts);
  },

  async store(req, res) {
    const { author, place, description, hashtags } = req.body;
    const { filename: image } = req.file;

    const [name] = image.split(".");
    const fileName = `${name}.jpg`;

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, "resized", fileName));

    fs.unlinkSync(req.file.path);

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName
    });

    req.io.emit("post", post);

    return res.json(post);
  }
};
