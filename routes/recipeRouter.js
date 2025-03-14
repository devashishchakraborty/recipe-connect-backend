import { Router } from "express";
import recipeController from "../controllers/recipeController.js";

const recipeRouter = Router();

recipeRouter.get("/", recipeController.getAllPublishedRecipes);
recipeRouter.get("/:recipeId", recipeController.getRecipeById);

recipeRouter.get("/user/:userId", recipeController.getUserRecipes);

recipeRouter.post("/", recipeController.createRecipe);
recipeRouter.put("/:recipeId", recipeController.updateRecipe);
recipeRouter.delete("/:recipeId", recipeController.deleteRecipe);

recipeRouter.post("/:recipeId/comments", recipeController.addComment);
recipeRouter.delete("/comments/:commentId", recipeController.deleteComment);
export default recipeRouter;
