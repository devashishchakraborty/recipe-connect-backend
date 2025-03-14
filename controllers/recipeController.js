import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();

const getAllPublishedRecipes = asyncHandler(async (req, res) => {
  const recipes = await prisma.recipe.findMany({
    where: { published: true },
    include: { author: true },
  });
  res.send(recipes);
});

const getUserRecipes = asyncHandler(async (req, res) => {
  const recipes = await prisma.recipe.findMany({
    where: { author_id: req.user.id },
    include: { author: true },
  });
  res.send(recipes);
});

const getRecipeById = asyncHandler(async (req, res) => {
  const { recipeId } = req.params;

  const recipe = await prisma.recipe.findUnique({
    where: { id: parseInt(recipeId) },
    include: { comments: true, author: true },
  });

  if (!recipe) return res.sendStatus(404);

  if (
    req.user.role == "ADMIN" ||
    recipe.published ||
    req.user.id == recipe.author_id
  )
    return res.send(recipe);
  else return res.sendStatus(403);
});

const createRecipe = asyncHandler(async (req, res) => {
  const { title, content, published } = req.body;
  const data = { title, content, author_id: req.user.id };
  if (published) data.published = true;
  const recipe = await prisma.recipe.create({ data });
  res.send(recipe);
});

const updateRecipe = asyncHandler(async (req, res) => {
  const { title, content, published } = req.body;
  const data = {};
  if (title && content) {
    data.title = title;
    data.content = content;
  }

  if (published !== null) data.published = published;

  const recipe = await prisma.recipe.update({
    where: {
      id: parseInt(req.params.recipeId),
      author_id: req.user.id,
    },
    data,
  });

  res.send(recipe);
});

const deleteRecipe = asyncHandler(async (req, res) => {
  let condition = {};
  if (req.user.role != "ADMIN") condition.author_id = req.user.id;

  const deletedRecipe = await prisma.recipe.delete({
    where: {
      id: parseInt(req.params.recipeId),
      ...condition,
    },
  });
  if (!deletedRecipe) return res.sendStatus(404);
  res.send(deletedRecipe);
});

const addComment = asyncHandler(async (req, res) => {
  const comment = await prisma.comment.create({
    data: {
      text: req.body.comment,
      author_id: req.user.id,
      recipe_id: parseInt(req.params.recipeId),
    },
  });
  res.send(comment);
});

const deleteComment = asyncHandler(async (req, res) => {
  const comment = await prisma.comment.findUnique({
    where: {
      id: parseInt(req.params.commentId),
    },
    include: {
      recipe: true,
    },
  });

  if (
    req.user.role == "ADMIN" ||
    comment.author_id == req.user.id ||
    comment.recipe.author_id == req.user.id
  ) {
    const comment = await prisma.comment.delete({
      where: {
        id: parseInt(req.params.commentId),
      },
    });
    return res.send(comment);
  }
  res.sendStatus(403);
});

export default {
  getAllPublishedRecipes,
  getUserRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  addComment,
  deleteComment,
};
