import React, {FunctionComponent} from 'react';
import {IPost} from "../types/interfaces/IPost";

interface Props {
    postObj: IPost
}


const Card: FunctionComponent<Props> = ({postObj}) => {
    return (
        <div>
           <h3>{postObj.title}</h3>
           <img src={postObj.image} alt={'Users image'} width={250} height={250}/>
            <p>{postObj.username}: {postObj.description}</p>
        </div>
    );
};

export default Card;
