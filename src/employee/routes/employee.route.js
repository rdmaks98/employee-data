const express = require("express");
const router = express.Router()
const employeeController = require('../controller/employee.controller');

router.post("/create", employeeController.addEmployee)
router.put("/update/:id", employeeController.editEmployee)
router.delete("/delete/:id", employeeController.deleteEmployee)
router.get("/list", employeeController.getEmployee)
module.exports = router;