import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { styled, Box, TextareaAutosize, Button, InputBase, FormControl  } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%', 
    height: '50vh',
    objectFit: 'cover'
});

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
    border: 5px black;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;


const Addcomplaint = () => {
    
    
    
    const navigate = useNavigate();
   
    const { user } = useSelector((state) => state.user);
   
    const [file, setFile] = useState('');

    //post.user_id set
    const initialPost = { 
    user_id:user._id,
    description: '',
    picture: '',
    createdDate: new Date(),
    name: '',
    hostelName: '',
    status: false
}

const [post, setPost] = useState(initialPost);

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                const response = await axios.post("/api/v1/user/file/upload",data);
                post.picture = response.data;
            }
        }
        getImage();
    }, [file])
    const submitcomp = async () => {
        await axios.post("/api/v1/user/addcomp",post);
        navigate('/');
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    return (
        <Container>
            <Image src={url} alt="post" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
            </StyledFormControl>

            <Textarea
                rowsMin={5}
                placeholder="Tell your story..."
                name='description'
                onChange={(e) => handleChange(e)} 
            />
             <Textarea
                rowsMin={1}
                placeholder="Your name..."
                name='name'
                onChange={(e) => handleChange(e)} 
            />
             <Textarea
                rowsMin={5}
                placeholder="Hostel Name...."
                name='hostelName'
                onChange={(e) => handleChange(e)} 
            />
            <Button onClick={() => submitcomp()} variant="contained" color="primary">Submit</Button>
        </Container>
     
    )
}

export default Addcomplaint;