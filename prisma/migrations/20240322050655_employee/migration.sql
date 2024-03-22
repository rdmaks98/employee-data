-- CreateTable
CREATE TABLE "Employee" (
    "EmployeeID" SERIAL NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "HireDate" TEXT NOT NULL,
    "JobTitle" TEXT NOT NULL,
    "Department" TEXT NOT NULL,
    "Salary" TEXT NOT NULL,
    "Status" BOOLEAN NOT NULL DEFAULT false,
    "Location" TEXT NOT NULL DEFAULT 'Ahmedabad',

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("EmployeeID")
);
