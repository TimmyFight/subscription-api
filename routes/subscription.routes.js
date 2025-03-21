import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) =>
  res.send({ title: "GET all subscriptions" })
);

subscriptionRouter.get("/:id", (req, res) =>
  res.send({ title: "GET subscription details" })
);

subscriptionRouter.post("/", (req, res) =>
  res.send({ title: "Create new subscription" })
);

subscriptionRouter.put("/:id", (req, res) =>
  res.send({ title: "Update subscription" })
);

subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ title: "Delete subscription" })
);

subscriptionRouter.get("/user/:id", (req, res) =>
  res.send({ title: "GET all user subscriptions" })
);

subscriptionRouter.put("/:id/cnacel", (req, res) =>
  res.send({ title: "Cancel subscription" })
);

subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ title: "GET all upcoming renewals" })
);

export default subscriptionRouter;
