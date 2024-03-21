import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import EmployeeHandler from '../../APIHandler/employeeHandler';
import MainLayout from '../../components/employee/uploadExcel';
import { createUser } from '../../redux/action/emp_action';

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const { create_Data } = useSelector((state) => state.emp)
    console.log("🚀 ~ Dashboard ~ create_Data:---------------------------", create_Data)
    console.log("🚀 ~ Dashboard ~ user:===================================", user)
    const [file, setFile] = useState("")
    const [error, setError] = useState("")
    const [csvData, setCsvData] = useState([]);
    const result = csvData.slice(1).map(record => {
        const obj = {};
        csvData[0].forEach((key, index) => {
            obj[key] = record[index];
        });
        return obj;
    });
    const dispatch = useDispatch();
    const handleDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            if (file.type === 'text/csv') { // Check if the dropped file is a CSV file
                const reader = new FileReader();
                reader.onload = (event) => {
                    const csvContent = event.target.result;
                    // Parse CSV content here (Example: using a library like Papaparse)
                    // For simplicity, let's just log the CSV content for now
                    parseCSV(csvContent);
                    console.log(csvContent);
                };
                reader.readAsText(file);
                setFile({
                    file,
                    preview: URL.createObjectURL(file),
                });
                setError(null);
            } else {
                setError('Please select a CSV file');
            }
        } else {
            setError('Please select a file');
        }
    };

    const parseCSV = (csvContent) => {
        const rows = csvContent.trim().split('\n');
        const data = rows.map(row => row.split(','));
        setCsvData(data);
    };


    // const doHandleFormSubmit = (result) => {
    //     debugger
    //     // Prevent default form submission behavior

    //     if (csvData.length > 0) {

    //         const payload = {
    //             payload: result
    //             // fcm_token: localStorage.getItem('fcmToken'),
    //             // is_web: true,
    //         };
    //         dispatch(createUser(payload));
    //     }

    // };


    const doHandleFormSubmit = async (result) => {
        debugger
        try {
            const payload = {
                payload: result

            };
            const data = await EmployeeHandler.creatEmployee(payload.payload)
            console.log("🚀 ~ doHandleFormSubmit ~ data:", data)
        } catch (error) {
            console.log("🚀 ~ doHandleFormSubmit ~ error:", error)
        }

    };
    // useEffect(() => {
    //     if (csvData.length > 0) {
    //         doHandleFormSubmit(result)
    //     }
    // }, [csvData])
    return (
        <div>
            <MainLayout file={file} onDrop={handleDrop} error={error} doHandleFormSubmit={() => doHandleFormSubmit(result)} />

        </div>
    )
}

export default Dashboard

