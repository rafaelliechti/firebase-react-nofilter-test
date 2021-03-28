import React, {useRef, useState} from 'react';
import {Alert, Button, Card, Form} from 'react-bootstrap';
import {useAuth} from '../firebase/auth';
import {Link, useHistory} from 'react-router-dom';

export default function UpdateDashboard() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const fileRef = useRef();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const {
        currentUser,
        updateEmail,
        updatePassword,
        uploadFile
    } = useAuth();

    // const onFileChange = async (e) => {
    //     const file = e.target.files[0];
    //     const storageRef = storage.ref();
    //     const fileRef = storageRef.child(file.name);
    //     await fileRef.put(file);
    // }

    function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        const promises = [];
        setLoading(true);
        setError('');
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value));
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value));
        }
        if (fileRef.current.files[0]) {
            promises.push(uploadFile(fileRef.current.files[0]));
        }

        Promise.all(promises).then(() => {
            history.push('/');
        }).catch(() => {
            setError('Failed to update account')
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Update Dashboard</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                ref={emailRef}
                                required
                                defaultValue={currentUser.email}
                            />
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                ref={passwordRef}
                                required
                                placeholder='Leave blank to keep the same'
                            />
                        </Form.Group>
                        <Form.Group id='password-confirm'>
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control
                                type='password'
                                ref={passwordConfirmRef}
                                required
                                placeholder='Leave blank to keep the same'
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.File ref={fileRef}/>
                        </Form.Group>
                        <Button disabled={loading} className='w-100' type='submit'>
                            Update
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                <Link to='/'>Cancel</Link>
            </div>
        </>
    );
}
