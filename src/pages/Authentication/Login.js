import React, { useState } from 'react';
import { Col, Container, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendPostRequest } from '../../helpers/api';

const Login = (props) => {
    const initialLoginData = {
        username: '',
        password: ''
    };

    const [loginData, setLoginData] = useState(initialLoginData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await sendPostRequest('/Auth/LoginUser', loginData);
            
            if (response.success === true) {
                // Başarılı giriş durumunda kullanıcı bilgilerini ve token'i saklayabiliriz.
                localStorage.setItem('userProfile', JSON.stringify(response.data));
                localStorage.setItem('token', response.data.key);

                // Başarılı giriş durumunda yönlendirme yapabiliriz.
                props.history.push('/dashboard');
            } else {
                // Giriş başarısız olduğunda hata mesajını gösterebiliriz.
                toast.error(response.message);
            }
        } catch (error) {
            console.error('Login isteği gönderilirken bir hata oluştu:', error);
            toast.error('Bir hata oluştu, lütfen tekrar deneyin.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title mb-4">Giriş Yap</h4>
                                    <Form onSubmit={handleSubmit}>
                                        <FormGroup>
                                            <Label for="username">Kullanıcı Adı</Label>
                                            <Input
                                                type="text"
                                                name="username"
                                                id="username"
                                                value={loginData.username}
                                                onChange={handleChange}
                                                required
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="password">Şifre</Label>
                                            <Input
                                                type="password"
                                                name="password"
                                                id="password"
                                                value={loginData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </FormGroup>
                                        <div className="mt-3">
                                            <Button color="primary" type="submit" disabled={isSubmitting}>
                                                Giriş Yap
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <ToastContainer />
        </React.Fragment>
    );
};

export default Login;
