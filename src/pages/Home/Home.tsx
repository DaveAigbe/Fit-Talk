import React, {FC, useEffect, useState} from 'react';
import {collection, getDocs} from 'firebase/firestore'
import {auth, db} from "../../config/firebase";
import {IPost} from "../../types/interfaces/IPost";
import Post from "./Post";
import {useAuthState} from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";

interface Props {
}


const Home: FC<Props> = () => {
    const postsRef = collection(db, 'posts')
    const [posts, setPosts] = useState<IPost[] | []>([]);
    const [loading, setLoading] = useState(true);
    const [user] = useAuthState(auth)
    const navigate = useNavigate()

    const getPosts = async () => {
        const querySnapshot = await getDocs(postsRef)

        setPosts(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id})) as IPost[])
    }

    const routeToLogin = () => {
        navigate('/login')
    }

    useEffect(() => {
        getPosts()
            .then(() => {
                setLoading(false)
            })
            .catch((err) => {
                console.log(`error: ${err}`)
            })

    }, []);

    if (!user) {
        return (
            <div className={'home-page'}>
                <div className={'introduction'}>
                    <h1>Welcome to Fit Talk🏋</h1>
                    <h2>The premier social media platform dedicated to sharing your fitness goals with people around the
                        world!</h2>
                    <h3 onClick={routeToLogin}>Sign in to view posts.</h3>
                </div>
            </div>
        )
    } else if (loading) {
        return (
            <div className={'page'}>
                <h2>Loading Posts...</h2>
            </div>
        )
    }


    return (
        <div className={'posts-container'}>
            {posts.map((post) => {
                return (
                    <Post postObj={post} key={post.id}/>
                )
            })}
        </div>
    );
};

export default Home;

