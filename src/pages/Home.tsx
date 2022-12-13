import React, {FC, useEffect, useState} from 'react';
import {collection, getDocs} from 'firebase/firestore'
import {auth, db} from "../config/firebase";
import {IPost} from "../types/interfaces/IPost";
import Card from "../components/Card";
import {useAuthState} from "react-firebase-hooks/auth";

interface Props {
}


const Home: FC<Props> = () => {
    const postsRef = collection(db, 'posts')
    const [posts, setPosts] = useState<IPost[] | []>([]);
    const [loading, setLoading] = useState(true);
    const [user] = useAuthState(auth)
    const getPosts = async () => {
        const querySnapshot = await getDocs(postsRef)

        let allPosts: any[] = []
        querySnapshot.forEach((doc) => {
            allPosts.push(doc.data())
        })

        setPosts(allPosts)
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
                <h1>Welcome to Fit Talk🏋</h1>
                <h4>The premier social media platform dedicated to sharing your fitness goals with people around the world!</h4>
                <p>Please sign in to view posts.</p>
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
                    <Card postObj={post} key={post.description + post.userId}/>
                )
            })}
        </div>
    );
};

export default Home;

