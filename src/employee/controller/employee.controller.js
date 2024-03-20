const prisma = require("../../database/prisma.js");
const employeeController = {

    // * create all and one employee service
    async addEmployee(req, res, next) {
        try {
            // ~ add employee by csv
            if (req.body.length > 0) {
                req.body.map(async (employee) => {
                    let { FirstName, LastName, Email, PhoneNumber, HireDate, JobTitle, Department, Salary } = employee
                    console.log("🚀 ~ req.body.payload.map ~ employee:", employee)
                    await prisma.employee.create({
                        data: {
                            FirstName: FirstName,
                            LastName: LastName,
                            Email: Email,
                            PhoneNumber: PhoneNumber,
                            HireDate: HireDate,
                            JobTitle: JobTitle,
                            Department: Department,
                            Salary: Salary,
                        },
                    })
                })
                return res.status(200).json({
                    status: true,
                    message: "employee Added succesfully",
                });
            }

            // add single employee
            else {
                const { FirstName, LastName, Email, PhoneNumber, HireDate, JobTitle, Department, Salary } = req.body
                const addRecord = await prisma.employee.create({
                    data: {
                        FirstName: FirstName,
                        LastName: LastName,
                        Email: Email,
                        PhoneNumber: PhoneNumber,
                        HireDate: HireDate,
                        JobTitle: JobTitle,
                        Department: Department,
                        Salary: Salary,
                    },
                })

                return res.json({
                    result: addRecord,
                    message: "employee Added succesfully",
                });
            }
        }
        catch (err) {
            next(err)
        }
    },

    // * get all employee service
    async getEmployee(req, res, next) {
        try {
            let empRecords = await prisma.employee.findMany()
            return res.json({ data: empRecords, message: "employees are fetch successfully" })
        }
        catch (err) {
            next(err)
        }
    },

    // * edit by specific id employee service
    async editEmployee(req, res, next) {
        try {
            const { id } = req.params
            let findEmpRecord = await prisma.employee.findFirst({ where: { EmployeeID: Number(id) } });
            if (!findEmpRecord) {
                return next(createError(404, "employee not found"));
            }
            findEmpRecord = await prisma.employee.update({
                where: { EmployeeID: Number(id) },
                data: { ...req.body },
            })
            return res.json({
                data: findEmpRecord,
                success: true,
                message: "employee updated",
            })
        }
        catch (err) {
            next(err)
        }
    },

    // * delete by specific id employee service
    async deleteEmployee(req, res, next) {
        try {
            const { id } = req.params
            let findEmpRecord = await prisma.employee.findFirst({ where: { EmployeeID: Number(id) } });
            if (!findEmpRecord) {
                return next(createError(404, "employee not found"));
            }
            await prisma.employee.delete({
                where: { EmployeeID: Number(id) },
            })
            return res.json({
                success: true,
                message: "employee deleted",
            })
        }
        catch (err) {
            next(err)
        }
    },

}
module.exports = employeeController;