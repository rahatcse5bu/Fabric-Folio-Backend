import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getAllCustomersFromOrder,
  getSingleCustomer,
  updateCustomer,
} from "../controllers/Customer.js";

const customerRoute = express.Router();

customerRoute.route("/").post(createCustomer).get(getAllCustomers);
customerRoute.route("/all/:id").get(getAllCustomersFromOrder);
customerRoute
  .route("/:id")
  .patch(updateCustomer)
  .delete(deleteCustomer)
  .get(getSingleCustomer);

export { customerRoute };
