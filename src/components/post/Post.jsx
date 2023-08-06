import React, { useEffect, useState } from "react";
import { API } from "../../service/api";
import InnerPost from "./InnerPost";
import { Box, Grid } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";

const Post = () => {
    const [posts, setPost] = useState([]);

    const [searchParams] = useSearchParams()
    const category = searchParams.get("category")
    console.log(category);


    useEffect(() => {
        const fetchdata = async () => {
            const response = await API.getallpost({ category: category || '' });
            if (response.isSuccess) {
                setPost(response.data);
            }
        };
        fetchdata();
    }, [category]);
    return (
        <>
            {posts && posts.length > 0 ? (
                posts.map((post) => (

                    <Grid item lg={3} sm={4} xs={12}>
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`details/${post._id}`}>
                            <InnerPost post={post} />
                        </Link>
                    </Grid>
                )

                )
            ) : (
                <Box style={{ color: "878787", margin: "30px 80px", fontSize: 18 }}>
                    No data is available for selected category
                </Box>
            )}
        </>
    );
};

export default Post;
