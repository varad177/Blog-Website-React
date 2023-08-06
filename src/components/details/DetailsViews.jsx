import React, { useContext, useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../service/api";
import { Box, Typography, styled } from "@mui/material";
import { DataContext } from "../../context/dataprovider";


const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 10px 0;
  word-break: break-all;
`;

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});


const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',

    "@media(max-width : 850px)":{
        margin: '20px 20px',
    }

}));

const EditICONS = styled(EditIcon)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcons = styled(DeleteIcon)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    margin: '20px 0',

}));


const DetailsViews = () => {
    const url = "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";


 
    const { id } = useParams();
    // console.log(id);

    const { account } = useContext(DataContext);

    const navigate = useNavigate()
    const [post, setPost] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getpostbyid(id);
            console.log(response);
            if (response.isSuccess) {
                setPost(response.data);
                console.log(post);
            }
        };
        fetchData();
    }, []);

    const deleteBlog = async () =>{
        let response = await API.deletepost(post._id)
        if(response.isSuccess){
            navigate('/')
        }
    }

    return (
        <Container>
            <Image src={url} alt="" />
            <Box style={{ float: 'right' }}>
                {
                    account.username === post.username &&
                    <>
                        <Link to={`/update/${post._id}`}>
                            <EditICONS color="primary" />
                        </Link>
                        <DeleteIcons onClick={()=>deleteBlog()} color="error" />
                    </>
                }

            </Box>
            <Heading>{post.title}</Heading>

            <Author >
                <Typography>Author: <span style={{ fontWeight: 600 }}>{post.username}</span></Typography>
                <Typography style={{ marginLeft: 'auto' }}>{new Date(post.createdDate).toDateString()} </Typography>
            </Author>

            <Typography>{post.description}</Typography>

        </Container>
    );
};

export default DetailsViews;
