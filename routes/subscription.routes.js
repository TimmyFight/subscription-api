import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getUserSubscriptions,
  getSubscriptionDetails,
  updateSubscription,
  deleteSubscription,
  cancelSubscription,
  getUpcomingRenewals,
  getAllSubscriptions,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", authorize, getAllSubscriptions);

subscriptionRouter.get("/upcoming-renewals", authorize, getUpcomingRenewals);

subscriptionRouter.get("/:id", authorize, getSubscriptionDetails);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", authorize, updateSubscription);

subscriptionRouter.delete("/:id", authorize, deleteSubscription);

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", authorize, cancelSubscription);

export default subscriptionRouter;
