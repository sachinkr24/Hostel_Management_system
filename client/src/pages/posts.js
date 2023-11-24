import { useEffect, useState } from 'react';

import { Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Post from './comp';
import axios from 'axios';

const Posts = () => {
    const [posts, getPosts] = useState([]);
    useEffect(() => {
        const fetchData = async () => { 
            let res = await axios.get("/api/v1/user/getcomp");
            if (res.data.isSuccess) {
                getPosts(res.data.data);
            }
        }
        fetchData();
    }, []);
 
    console.log(posts);

    return (
        <>
            {
                posts?.length ? posts.map(post => (
                    <Grid item lg={3} sm={4} xs={12}>
                        <Link style={{textDecoration: 'none', color: 'inherit'}} to={`details/${post._id}`}>
                            <Post post={post} />
                        </Link>
                    </Grid>
                )) : <Box style={{color: '878787', margin: '30px 80px', fontSize: 18}}>
                        No complaints right now
                    </Box>
            }
        </>
    )
}

export default Posts;