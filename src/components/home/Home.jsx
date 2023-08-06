
import React, { useState } from 'react'
import Banner from '../banner/Banner'
import { Box, Grid, Typography } from '@mui/material'
import styled from '@emotion/styled';
import Category from './Category';
import Post from '../post/Post';







const Home = () => {

    const [post, setPost] = useState([])

    useState(() => {
        const fetchdata = () => {

        }
        fetchdata()
    }, [])
    return (
        <>
            <Banner />
            <Grid container>
                <Grid lg={2} sm={2} xs={12}>
                    <Category />
                </Grid>
                <Grid container item lg={10} sm={10} xs={12}>
                    <Post />
                </Grid>

            </Grid>
        </>

    )
}

export default Home
