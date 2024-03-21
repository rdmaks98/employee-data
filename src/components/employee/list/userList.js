import React, { useEffect, useState, useRef } from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Container } from '@mui/material'; // Import Pagination from Material-UI
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeList } from '../../../redux/action/emp_action';
import EmployeeHandler from '../../../APIHandler/employeeHandler';

function UserList({ csvData }) {
    const { emp_list } = useSelector((state) => state.emp);
    const dispatch = useDispatch();

    // Ref for detecting clicks outside
    const wrapperRef = useRef(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Change as needed

    // State for managing clients
    const [clients, setClients] = useState(emp_list);
    const [newClient, setNewClient] = useState({ FirstName: '', LastName: '', Email: '' }); // Adjust fields as needed
    const [activeClient, setActiveClient] = useState(null);
    const [search, setSearch] = useState('');
    const [noResults, setNoResults] = useState(false); // State to track if no search results found
    const [isEditing, setIsEditing] = useState(false); // State to track if editing mode is active
    const [isUpdated, setIsUpdated] = useState(false); // State to track if client data has been updated

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setClients(emp_list); // Update clients state with the new data
    }, [emp_list]);

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setActiveClient(null); // Close edit mode when clicking outside
            setIsEditing(false);
        }
    };

    const handleDelete = async (index) => {
        try {
            // Add logic for deleting client on the server
            await EmployeeHandler.deleteEmployee(clients[index].EmployeeID);
            // Remove the deleted client from the state
            setClients(clients.filter((_, i) => i !== index));
        } catch (error) {
            console.log("Error deleting client:", error);
        }
    };

    const handleEdit = (client) => {
        setActiveClient(client);
        setNewClient({ ...client }); // Fill edit box with existing values
        setIsEditing(true); // Enable editing mode
        setIsUpdated(false); // Reset update status
    };

    const handleUpdate = async () => {
        try {
            const payload = {
                FirstName: newClient.FirstName,
                LastName: newClient.LastName,
                Email: newClient.Email
            };
            // Update client data on the server
            await EmployeeHandler.editEmployee(newClient.EmployeeID, payload);
            // Update client data in the state
            setClients(clients.map((c) => (c.EmployeeID === newClient.EmployeeID ? newClient : c)));
            // Reset states
            setActiveClient(null);
            setIsEditing(false);
            setIsUpdated(true);
        } catch (error) {
            console.log("Error updating client:", error);
        }
    };

    const doHandleFormSubmit = () => {
        dispatch(getEmployeeList());
    };

    useEffect(() => {
        doHandleFormSubmit();
    }, []);

    // Pagination functions
    const totalPages = Math.ceil(clients.length / itemsPerPage);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    // Calculate indices for slicing the clients array based on pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Array.isArray(clients) ? clients.slice(indexOfFirstItem, indexOfLastItem) : [];

    return (
        <div ref={wrapperRef}>
            <Container>
                <div style={{ marginBottom: 20 }}>
                    <TextField
                        label="Search..."
                        variant="outlined"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setNoResults(false); // Reset noResults state when search input changes
                        }}
                    />
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>FirstName</TableCell>
                                <TableCell>LastName</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(currentItems) && currentItems.length > 0 && currentItems
                                .filter((_, index) => index + indexOfFirstItem + 1 <= clients.length) // To handle edge case
                                .filter(client => {
                                    const searchString = search.toLowerCase();
                                    return Object.values(client).some(value =>
                                        value.toString().toLowerCase().includes(searchString)
                                    );
                                })
                                .map((client, index) => (
                                    <TableRow key={indexOfFirstItem + index + 1}>
                                        <TableCell>{index + indexOfFirstItem + 1}</TableCell>
                                        <TableCell>
                                            {activeClient === client ? (
                                                <TextField
                                                    value={newClient.FirstName}
                                                    onChange={(e) => setNewClient({ ...newClient, FirstName: e.target.value })}
                                                    InputProps={{ style: { borderBottom: '1px solid blue' } }}
                                                />
                                            ) : (
                                                client.FirstName
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {activeClient === client ? (
                                                <TextField
                                                    value={newClient.LastName}
                                                    onChange={(e) => setNewClient({ ...newClient, LastName: e.target.value })}
                                                    InputProps={{ style: { borderBottom: '1px solid blue' } }}
                                                />
                                            ) : (
                                                client.LastName
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {activeClient === client ? (
                                                <TextField
                                                    value={newClient.Email}
                                                    onChange={(e) => setNewClient({ ...newClient, Email: e.target.value })}
                                                    InputProps={{ style: { borderBottom: '1px solid blue' } }}
                                                />
                                            ) : (
                                                client.Email
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {activeClient === client ? (
                                                <Button
                                                    disabled={!newClient.FirstName || !newClient.LastName || !newClient.Email} // Disable if any field is empty
                                                    onClick={handleUpdate}
                                                >
                                                    Update
                                                </Button>
                                            ) : (
                                                <div>
                                                    <Button onClick={() => handleEdit(client)}>Edit</Button>
                                                    <Button onClick={() => handleDelete(index + indexOfFirstItem)}>Delete</Button>
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            {/* Render a message if no search results are found */}
                            {currentItems.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No results found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination component */}
                <div style={{ marginTop: 20, textAlign: 'center', display: "flex", justifyContent: "center" }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handleChangePage}
                        variant="outlined"
                        shape="rounded"
                    />
                </div>
            </Container>
        </div>
    );
}

export default UserList;
