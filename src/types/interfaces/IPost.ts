import IFormPost from "./IFormPost";

export interface IPost extends IFormPost {
    username: string,
    userId: string
}
