import React, {FunctionComponent} from 'react';
import {IPost} from "../types/interfaces/IPost";

interface Props {
    postObj: IPost
}


const Card: FunctionComponent<Props> = ({postObj}) => {
    return (
        <div className={'post'}>
           <h3>{postObj.title}</h3>
           <img className={'post-img'} src={postObj.image} alt={'Users image'}/>
            <p><span className={'post-username'}>{postObj.username}:</span> {postObj.description}</p>
        </div>
    );
};

export default Card;
