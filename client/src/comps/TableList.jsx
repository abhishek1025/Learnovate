import * as React from "react"
import Paper from "@mui/material/Paper"
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material"

import { v4 as uuidv4 } from 'uuid';
import { FiEye } from "react-icons/fi";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";

const TableList = ({ rows, columns, editPageRoute, deleteFunction }) => {

    const [rowsData, setRowsData] = React.useState([...rows])

    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(10)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const handleDeleteOperation = (id) => () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {

            if (willDelete) {

                const res = await deleteFunction(id)

                if (res.ok) {
                    swal("Poof! Item Deleted Successfully", {
                        icon: "success",
                    });

                    setRowsData((prevData) => prevData.filter((row) => row._id !== id))

                    return;
                }

                swal("Opps, Unable to delete", {
                    icon: "error",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });

    }


    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell
                                    style={{ fontWeight: "800" }}
                                    key={uuidv4()}
                                    align={column.align}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell style={{ fontWeight: "800" }} align="right">
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(row => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>

                                        {
                                            columns.map(column => (
                                                <TableCell key={uuidv4()} align={column.align}>
                                                    {row[column.id]}
                                                </TableCell>
                                            ))
                                        }

                                        <TableCell>
                                            <div className="flex justify-end gap-3">
                                                {/* <FiEye
                                                    className="pointer text-xl"
                                                /> */}
                                                <Link to={`../${editPageRoute}/${row._id}`}>
                                                    <BiEdit
                                                        className="cursor-pointer text-xl text-green-600"
                                                    />
                                                </Link>
                                                <AiFillDelete
                                                    className="cursor-pointer text-xl text-red-600"
                                                    onClick={handleDeleteOperation(row._id)}
                                                />
                                            </div>
                                        </TableCell>

                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}


export default TableList;