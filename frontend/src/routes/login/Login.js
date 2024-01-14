import React from 'react'
import { useState } from 'react';

import styles from './Login.module.css';
import { loginInputsFormat } from '../../utils/utils';
import Input from '../../components/UI/input/Input';
import Layout from '../../components/layout/Layout';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Button from '../../components/UI/button/Button';

const Login = ({ setUser, user }) => {
    const [userData, setUserData] = useState(loginInputsFormat);
    const [error, setError] = useState('')

    const inputChangedHandler = (event, elementName) => {
        const updatedPostInfo = { ...userData };
        const updatedElement = updatedPostInfo[elementName];

        updatedElement.value = event.target.value;
        updatedPostInfo[elementName] = updatedElement;

        setUserData(updatedPostInfo);
    }

    const loginHandler = () => {
        const loginData = {};
        loginData['username'] = userData.username.value
        loginData['email'] = userData.email.value
        console.log(user);

        axios.post('https://kelechio.tech/api/v1/users', loginData)
            .then(response => setUser(response.data))
            .catch(err => {
                console.log(err);
                if (!err.response) {
                    setError('Error logging in');
                    setTimeout(() => {
                        setError('');
                    }, 2000)
                    return
                }
                if (err.response.status === 404) {
                    setError('Username or Email is already assigned')
                    setTimeout(() => {
                        setError('')
                    }, 2000)
                }
            });
    }

    return (
        <Layout>
            {user ? <Navigate to='/' replace /> : null}
            <div className={styles.Login}>
                <h1>Log In</h1>
                <form>
                    {error ?
                        <div className={styles.Error}>
                            <p>{error}</p>
                        </div>
                        : null}
                    <Input
                        title={userData.username.title}
                        elementType={userData.username.elementType}
                        elementConfig={userData.username.elementConfig}
                        value={userData.username.value}
                        changed={(event) => inputChangedHandler(event, 'username')} />
                    <Input
                        title={userData.email.title}
                        elementType={userData.email.elementType}
                        elementConfig={userData.email.elementConfig}
                        value={userData.email.value}
                        changed={(event) => inputChangedHandler(event, 'email')} />
                </form>
                <Button onPress={loginHandler}>Log In</Button>
            </div>
        </Layout>
    )
}

export default Login