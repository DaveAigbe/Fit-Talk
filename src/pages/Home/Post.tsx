import React, {FunctionComponent, useEffect, useState} from 'react';
import {IPost} from "../../types/interfaces/IPost";
import {auth, db} from '../../config/firebase'
import {addDoc, collection, deleteDoc, getDocs, query, where} from 'firebase/firestore'
import {useAuthState} from "react-firebase-hooks/auth";
import {ILike} from "../../types/interfaces/ILike";

interface Props {
    postObj: IPost
}


const Post: FunctionComponent<Props> = ({postObj}) => {
    const [likes, setLikes] = useState<ILike[] | []>();
    const [user] = useAuthState(auth)

    const likesCollection = collection(db, 'likes')
    const allPostLikesQuery = query(likesCollection, where('postId', '==', postObj.id))

    const userHasLiked = !!likes?.find((like) => like.userId === user?.uid)

    const getLikes = async () => {
        const queryData = await getDocs(allPostLikesQuery)
        setLikes(queryData.docs.map((doc) => ({...doc.data(), id: doc.id})) as ILike[])
    }

    const onAddLike = async () => {
        try {
            if (postObj.userId !== user?.uid) {
                const userLike: ILike = {userId: user?.uid!, postId: postObj.id}

                await addDoc(likesCollection, userLike).catch(err => console.log(err.message))
                if (user) {
                    setLikes((prevState) => prevState ? [...prevState, {
                        userId: user?.uid,
                        postId: postObj.id
                    }] : [{userId: user?.uid, postId: postObj.id}])
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    const onDeleteLike = async () => {
        try {
            // Where current userId is the person logged in, and the post is the current post being interacted with
            const likeToDeleteQuery = query(likesCollection, where('postId', '==', postObj.id), where('userId', '==', user?.uid))
            const queryData = await getDocs(likeToDeleteQuery)

            await queryData.forEach((doc) => deleteDoc(doc.ref))
            if (user) {
                setLikes((prevState) => prevState ? prevState.filter((like) => like.userId !== user.uid) : [])
            }

        } catch (e) {
            console.log(e)
        }


    }

    useEffect(() => {
        getLikes()
            .then(_ => {
            })
            .catch((err) => {
                console.log(`error: ${err}`)
            })
    }, []);


    return (

        <div className={'post'}>
            <h3>{postObj.title}</h3>
            <img className={'post-img'} src={postObj.image} alt={'Users image'}/>
            <p><span className={'post-username'}>{postObj.username}:</span> {postObj.description}</p>
            <button onClick={userHasLiked ? onDeleteLike : onAddLike}>{userHasLiked ? <>👎</> : <>👍</>}{likes?.length}</button>
        </div>
    );
};

export default Post;
