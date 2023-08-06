



import styled from '@emotion/styled';
import { Box, Button, FormControl, InputBase, TextareaAutosize } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataContext } from '../../context/dataprovider';
import { API } from '../../service/api';

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
}))

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;
const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;



const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    category: '',
    createdDate: new Date()

}
const Update = () => {

    const [post, setPost] = useState(initialPost)
    const [file, setFile] = useState('')
    const { account } = useContext(DataContext)

    const location = useLocation()
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';




    useEffect(() => {
        const getImg = async () => {
            if (file) {
                console.log("the file is ", file);
                const data = new FormData();
                data.append("name", file.name)
                data.append("file", file)
                console.log('the dta is', data);
                const response = await API.uploadfile(file)
                post.picture = response.data //todo

            }
        }
        getImg();
        post.category = location.search?.split('=')[1] || 'All';
        post.username = account.username;

    }, [file]) //jo state update ho rhi hai us state ko yaha dalte hai


    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getpostbyid(id)
            if (response.isSuccess) {
                setPost(response.data)
            }
        }
        fetchData()
    },[])



    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate()

    const updatePost = async () => {
        let response = await API.updatePost(post )
        if (response.isSuccess) {
            navigate(`/details/${id}`)
        }

    }

    return (
        <Container>
            <Image src={url} alt="banner" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <AddCircleIcon style={{ display: 'none' }} fontSize='large' color='action' />
                </label>
                <input style={{ display: 'none' }} id='fileInput' type="file" onChange={(e) => setFile(e.target.files[0])} />

                <InputTextField placeholder='Title' value={post.title} name='title' onChange={(e) => handleChange(e)} />
                <Button variant='contained' onClick={() => updatePost()}>Update</Button>
            </StyledFormControl>

            <Textarea
                name='description'
                onChange={(e) => handleChange(e)}
                minRows={5}
                placeholder='Tell Your Story'
                value={post.description}
            >

            </Textarea>

        </Container>
    )
}

export default Update
