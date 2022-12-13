import React, { FunctionComponent } from 'react';
import {CreatePostForm} from "./CreatePostForm";

interface Props {}

const CreatePost: FunctionComponent<Props> = () => {
  return (
      <div className={'page'}>
        <CreatePostForm/>
      </div>
  );
};

export default CreatePost;
