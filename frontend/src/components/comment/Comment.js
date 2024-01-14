import React, { useEffect, useState } from 'react';

import styles from './Comment.module.css';
import { randomUrl } from '../../utils/utils';
import { MyContext } from '../../utils/myContext';
import { useContext } from 'react';

const Comment = ({ author, text, upvotes, comment_count, id,
    userUp, upvotedHandler, upvotedRemoveHandler }) => {

    const [isUpvoted, setIsUpvoted] = useState(false);
    const [upvotes_t, setUpvotes_t] = useState(upvotes);
    const [avatar, setAvatar] = useState('');

    const {theme, setTheme} = useContext(MyContext);


    const changeAvatar = (url) => {
        setAvatar(url);
    }

    // up and down vote handler
    const upvoteComment = (id) => {
        if (isUpvoted) {
            setIsUpvoted(false);
            setUpvotes_t(prev => prev - 1);
            upvotedRemoveHandler(id);
        } else {
            setIsUpvoted(true);
            setUpvotes_t(prev => prev + 1);
            upvotedHandler(id);
        }
    }

    useEffect(() => {
        changeAvatar(randomUrl())
    }, [])

    useEffect(() => {
        if (userUp) {
            setIsUpvoted(true);
        } else {
            setIsUpvoted(false);
        }
    }, [userUp])

    return (
        <div className={`${styles.Comment} ${theme === 'dark' ? styles.DarkTheme : ''}`}>
            <div className={styles.Main}>
                <a className={styles.Ppic}>
                    <img
                        src={avatar}
                        alt="avatar"
                    />
                </a>
                <div className={styles.Body}>
                    <span className={styles.Author}>{author}</span>
                    <p>
                        {text}
                    </p>
                </div>
            </div>
            <div className={styles.Actions}>
                <div className={styles.Action}>
                    <a className={isUpvoted ? styles.ActionIconTrue : styles.ActionIcon} onClick={() => upvoteComment(id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M246.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 109.3 361.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160zm160 352l-160-160c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 301.3 361.4 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z" /></svg>
                    </a>
                    <span className={styles.ActionValue}>{upvotes_t}</span>
                </div>
                <div className={styles.Action}>
                    <a className={styles.ActionIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z" /></svg>
                    </a>
                    <span className={styles.ActionValue}>{comment_count}</span>
                </div>
            </div>
        </div>
    )
}

export default Comment