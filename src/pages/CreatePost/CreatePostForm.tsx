import {FunctionComponent} from "react";
import {useForm} from "react-hook-form";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import IFormPost from "../../types/interfaces/IFormPost";
import {addDoc, collection} from 'firebase/firestore'
import {auth, db} from '../../config/firebase'
import {useAuthState} from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom";

interface Props {}
export const CreatePostForm: FunctionComponent<Props> = () => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()

    const schema = yup.object().shape({
        title: yup.string().required('You must provide a title.'),
        description: yup.string(),
        image: yup.string().url().required('You must provide a image URL.'),
    })
    const {register, handleSubmit, formState: {errors}, reset} = useForm<IFormPost>({
        resolver: yupResolver(schema)
    })

    const postsRef = collection(db, 'posts')

    const onCreatePost =  async (data: IFormPost) => {
        await addDoc(postsRef,  {
            ...data,
            username: user?.displayName,
            userId: user?.uid
        }).catch(err => console.log(err.message))
        reset()
        navigate('/')
    }


    return (
        <form className={'post-form'} onSubmit={handleSubmit(onCreatePost)}>
            <div>
                <label htmlFor="title">Title: </label>
                <input className={'post-input'} type="text" id={'title'} placeholder={'Title...'} {...register('title')}/>
                <p style={{color: 'red'}}>{errors.title?.message}</p>
            </div>
            <div>
                <label htmlFor="description">Description: </label>
                <textarea className={'post-input'} id={'description'} rows={10} cols={30} placeholder={'Description...'}  {...register('description')}/>
                <p style={{color: 'red'}}>{errors.description?.message}</p>
            </div>
            <div>
                <label htmlFor="image">Image Upload: </label>
                <input className={'post-input'} type="url" id={'image'} placeholder={'Image URL...'} {...register('image')}/>
                <p style={{color: 'red'}}>{errors.image?.message}</p>
            </div>
            <input className={'post-input submit-input'} type={'submit'} value={'Submit Post'}/>
        </form>
    )
}
