


import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { categories } from '../../constants/data'
import styled from '@emotion/styled';
import { Link, useSearchParams } from 'react-router-dom';


const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;

const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
`;

 const StyledLink = styled(Link)`
     text-decoration: none;
     color: inherit;
 `;
const Category = () => {

    const [searchParams] = useSearchParams()
    const category = searchParams.get('category')
    return (

        <>
            <Link style={{ textDecoration: 'none' }} to={`/create?category=${category || ''}`}>
                <StyledButton variant='contained'>CREATE BLOG</StyledButton>
            </Link>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <StyledLink to={'/'}>
                                All categories
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map((cat) => {
                            return (
                                <TableRow key={cat.id}>
                                    <TableCell >
                                        <StyledLink to={`/?category=${cat.type}`}>
                                            {cat.type}
                                        </StyledLink>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </StyledTable>
        </>
    )
}

export default Category
