const prisma = require("../../database/prisma.js");
const employeeController = {
    async addEmployee(req, res, next) {
        try {
            if (req.body.payload.length > 0) {
                req.body.payload.map(async (employee) => {
                    let { FirstName, LastName, Email, PhoneNumber, HireDate, JobTitle, Department, Salary } = req.body.payload
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
            }
            else {
                const { FirstName, LastName, Email, PhoneNumber, HireDate, JobTitle, Department, Salary } = req.body.payload
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

                return res.status(200).json({
                    result: addRecord,
                    message: "employee Added succesfully",
                });
            }
        }
        catch (err) {
            next(err)
        }
    },

    // async deleteComment(req, res, next) {
    //     try {
    //         let findCommentRecord = await Comment.findById({ videoId: req.params.id });
    //         if (!findCommentRecord) {
    //             return next(createError(404, "comment not found"));
    //         }
    //         let videoRecord = await Video.findById(req.params.id);
    //         if (!videoRecord) {
    //             return next(createError(404, "video not found"));
    //         }
    //         if (req.user.id === findCommentRecord.userId || req.user.id === videoRecord.userId) {
    //             await Comment.findByIdAndDelete(req.params.id);
    //             res.status(200).json("The comment has been deleted.");
    //         } else {
    //             return next(createError(403, "hello....,You can delete only your comment!"));
    //         }
    //     }
    //     catch (err) {
    //         next(err)
    //     }
    // },

    async getEmployee(req, res, next) {
        try {
            let findRecords = await Comment.find({ videoId: req.params.videoId })
            res.status(200).json(findRecords)
        }
        catch (err) {
            next(err)
        }
    }
}
module.exports = employeeController;