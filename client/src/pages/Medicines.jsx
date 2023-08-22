import { Box, CircularProgress } from '@mui/material';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Medicines = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setPage(searchParams.get('page') || 1);
        setLimit(searchParams.get('limit') || 10);
        setOffset(searchParams.get('offset') || 0);
    }, []);

    useEffect(() => {
        axios
            .get(
                `http://localhost:8080/api/medicines?limit=${limit}&offset=${offset}&page=${page}`
            )
            .then((res) => res.data)
            .then((data) => {
                setData(data);
                setPage(data.current_page);
                setIsLoading(false);
            })
            .catch((e) => console.log(e.message));
    }, [page, limit, offset]);

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 2 }}>
            {isLoading ? (
                <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table
                            sx={{ minWidth: 650 }}
                            aria-label="medicine table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Brand Name</TableCell>
                                    <TableCell>Generic Name</TableCell>
                                    <TableCell>Company Name</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Strength</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.result &&
                                    data.result.map((row) => (
                                        <TableRow
                                            key={row._id}
                                            sx={{
                                                '&:last-child td, &:last-child th':
                                                    {
                                                        border: 0,
                                                    },
                                            }}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {row.category}
                                            </TableCell>
                                            <TableCell component="th">
                                                {row.name}
                                            </TableCell>
                                            <TableCell>{row.generic}</TableCell>
                                            <TableCell>{row.company}</TableCell>
                                            <TableCell>{row.price}</TableCell>
                                            <TableCell>
                                                {row.strength}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {data.total_page && (
                        <Pagination
                            sx={{ mt: 2 }}
                            count={data.total_page}
                            page={page}
                            onChange={handleChange}
                            color="primary"
                        />
                    )}
                </>
            )}
        </Container>
    );
};

export default Medicines;
