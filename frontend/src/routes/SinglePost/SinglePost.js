import React, { useState, useEffect } from 'react';
import { useParams, useRevalidator } from 'react-router-dom';
import axios from 'axios';

import styles from './SinglePost.module.css';
import Layout from '../../components/layout/Layout';
import Comment from '../../components/comment/Comment';
import Input from '../../components/UI/input/Input';
import { commentInputFormat } from '../../utils/utils';
import { randomUrl } from '../../utils/utils';
import { MyContext } from '../../utils/myContext';
import { useContext } from 'react';
import Button from '../../components/UI/button/Button';


const SinglePost = ({ user }) => {
    const [post, setPost] = useState({})
    const [commentData, setCommentData] = useState(commentInputFormat)
    const [avatar, setAvatar] = useState('');

    const {theme, setTheme} = useContext(MyContext);

    const { id } = useParams();

    const url = `https://kelechio.tech/api/v1/post/${id}`;
    const userId = user.id;

    const changeAvatar = (url) => {
        setAvatar(url);
    }

    const inputChangedHandler = (event, elementName) => {
        const updatedCommentInfo = { ...commentData };
        const updatedElement = updatedCommentInfo[elementName];

        updatedElement.value = event.target.value;
        updatedCommentInfo[elementName] = updatedElement;

        setCommentData(updatedCommentInfo);
    }

    // 
    //                                  Comment handlers
    // 
    const createCommentHandler = () => {
        const commentDetails = {};
        commentDetails['author_id'] = userId
        commentDetails['post_id'] = id
        commentDetails['text'] = commentData.comment.value

        const newCommentData = { ...commentData };
        newCommentData.comment.value = '';
        setCommentData(newCommentData);

        return axios.post('https://kelechio.tech/api/v1/comments', commentDetails)
            .then(response => {
                console.log('comment response', response.data);
                const newPost = { ...post }
                const newComments = [...post.comments]
                newComments.unshift(response.data)
                newPost['comments'] = newComments
                newPost['comment_count'] += 1
                setPost(newPost);
            })
            .catch(err => console.log(err))
    }


    const userUpvotedComment = (commentId) => {
        // verifies that a comment is upvoted by current user
        const comments = [...post.comments];
        for (let x in comments) {
            if (comments[x].id == commentId) {
                if (comments[x].upvotes.includes(userId)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }


    const commentUpvoted = (id) => {
        console.log('commentUpvoted was clicked');
        const commentData = {
            user_id: userId
        }

        return axios.post(`https://kelechio.tech/api/v1/comment/${id}/addUpvote`, commentData)
            .then(response => {
                const newPost = { ...post };
                const newComments = [...post['comments']]
                for (let x in newComments) {
                    if (newComments[x].id == response.data.id) {
                        newComments[x].upvotes = response.data.upvotes
                    }
                }
                newPost['comments'] = newComments;
                setPost(newPost);
            })
            .catch(err => console.log(err));
    }

    const removeCommentUpvote = (id) => {
        console.log('removeUpvote was clicked');
        const commentData = {
            user_id: userId
        }

        return axios.post(`https://kelechio.tech/api/v1/comment/${id}/removeUpvote`, commentData)
            .then(response => {
                const newPost = { ...post };
                const newComments = [...post['comments']]
                for (let x in newComments) {
                    if (newComments[x].id == response.data.id) {
                        newComments[x].upvotes = response.data.upvotes
                    }
                }
                newPost['comments'] = newComments;
                setPost(newPost);
            })
            .catch(err => console.log(err));
    }



    // 
    //                              Post request
    // 
    const fetchPost = () => {
        // Populates the post state
        return axios.get(url)
            .then((response) => { console.log(response.data); setPost(response.data) })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchPost();
        changeAvatar(randomUrl());
    }, [])

    return (
        <Layout>
            {(Object.keys(post).length > 0) ?
                <>
                    <div className={styles.MainPost}>
                        <div className={styles.TitleBlock}>
                            <a className={styles.Ppic}>
                                <img
                                    src={avatar}
                                    alt="avatar"
                                />
                            </a>
                            <p><span>{post.title}</span> - {post.tagline}</p>
                        </div>
                        <div className={styles.Desc}>
                            <p>{post.description}</p>
                        </div>
                        <div className={styles.Detail}>
                            <span>{post.upvotes ? post.upvotes.length : 0} upvotes</span>
                            <span>{post.comment_count ? post.comment_count : 0} comments</span>
                        </div>
                    </div>
                    <div className={styles.CommentArea}>
                        <h1>Comments</h1>
                        <div className={styles.AddComment}>
                            <div className={styles.InputAlign}>
                                <Input
                                    elementType={commentData.comment.elementType}
                                    elementConfig={commentData.comment.elementConfig}
                                    value={commentData.comment.value}
                                    changed={(event) => inputChangedHandler(event, 'comment')} />
                            </div>
                            <Button onPress={createCommentHandler}>Post</Button>
                        </div>
                        {post.comments ? post.comments.map((comment, index) => {
                            return <Comment
                                key={comment.id}
                                author={comment.author ? comment.author : comment.author_id}
                                text={comment.text}
                                upvotes={comment.upvotes ? comment.upvotes.length : 0}
                                comment_count={0}
                                id={comment.id}
                                upvotedHandler={(id) => commentUpvoted(id)}
                                upvotedRemoveHandler={(id) => removeCommentUpvote(id)}
                                userUp={userUpvotedComment(comment.id)}
                            />
                        }) : null}
                    </div>
                </>
                : <div className="square-circle-6"></div>}
        </Layout>
    )
}

export default SinglePost