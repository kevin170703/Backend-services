const { User, Post } = require("../db.js");

async function getPosts(req, res) {
  let allPosts = await Post.findAll();
  if (!allPosts.length)
    return res.json({ msj: "Lista de publicaciones vacia" });

  allPosts = JSON.stringify(allPosts, null);
  allPosts = JSON.parse(allPosts);

  const postLocationNotJson = allPosts.map((post) => ({
    ...post,
    location: JSON.parse(post.location),
  }));

  res.json(postLocationNotJson);
}

async function newPost(req, res) {
  const {
    title,
    rangePriceOne,
    rangePriceTwo,
    location,
    idUser,
    nameUser,
    phoneNumber,
    detail,
  } = req.body;

  let rangePrice = `${rangePriceOne}-${rangePriceTwo}`;
  const locationJson = JSON.stringify(location);
  const resOfCreateService = await Post.create({
    title,
    rangePrice,
    location: locationJson,
    idUser,
    nameUser,
    phoneNumber,
    detail,
  });
  console.log(resOfCreateService, "datos");
  res.send({ msj: "Publicacion creada" });
}

async function deletePost(req, res) {
  const { idPost } = req.body;
  const newPost = await Post.destroy({
    where: {
      id: idPost,
    },
  });
  res.send("Publicacion Eliminada correactamente");
}

module.exports = { getPosts, newPost, deletePost };
