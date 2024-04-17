import React, { useState } from 'react';
import { Col, Container, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendPostRequest } from '../../helpers/api';

const Login = () => {
    const initialCredentials = {
        email: '',
        password: '',
    };

    const [credentials, setCredentials] = useState(initialCredentials);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const successNotify = () => {
        toast('Giriş başarılı.', {
            position: 'top-right',
            hideProgressBar: true,
            closeOnClick: false,
            className: 'bg-success text-white',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const request = await sendPostRequest('Auth/LoginUser', credentials);

            if (request.isSuccess === true) {
                successNotify();
                // Giriş başarılı olduğunda yapılacak işlemler buraya eklenebilir
            }
        } catch (error) {
            console.error('POST isteği gönderirken hata oluştu:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col xs={12}>
                            <h1>Giriş Yap</h1>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="email">E-Posta</Label>
                                            <Input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={credentials.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="password">Şifre</Label>
                                            <Input
                                                type="password"
                                                name="password"
                                                id="password"
                                                value={credentials.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button color="primary" type="submit" disabled={isSubmitting}>
                                    Giriş Yap
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
            <ToastContainer />
        </React.Fragment>
    );
};

export default Login;
