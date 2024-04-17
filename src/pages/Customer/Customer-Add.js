import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendPostRequest, sendGetRequest } from '../../helpers/api';

const CustomerAdd = () => {
    const initialCustomer = {
        CompanyId: '',
        FirstName: '',
        LastName: '',
        Phone1: '',
        Phone2: '',
        Email: '',
        Address: '',
        City: '',
        District: '',
    };

    const [customer, setCustomer] = useState(initialCustomer);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [companies, setCompanies] = useState([]);

    const fetchCompanies = async () => {
        try {
            const response = await sendGetRequest('Company');
            if (response.isSuccess === true) {
                const companies = response.data;
                setCompanies(companies);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            console.error('Company bilgilerini alma sırasında hata oluştu:', error);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = value === '' ? null : value;
        setCustomer({
            ...customer,
            [name]: newValue,
        });
    };

    const successNotify = () => {
        toast('Müşteri başarıyla eklendi.', {
            position: 'top-right',
            hideProgressBar: true,
            closeOnClick: false,
            className: 'bg-success text-white',
        });
    };

    const errorNotify = () => {
        toast('Lütfen bir şirket seçin veya "Diğer" seçeneğini kullanın.', {
            position: 'top-right',
            hideProgressBar: true,
            closeOnClick: false,
            className: 'bg-danger text-white',
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();


        if (customer.CompanyId !== '' && customer.CompanyId !== 'Şirket Seçin') {
            setIsSubmitting(true);

            try {
                const request = await sendPostRequest('Customer', customer);

                if (request.isSuccess === true) {
                    successNotify();
                    setCustomer(initialCustomer);
                }
            } catch (error) {
                console.error('POST isteği gönderirken hata oluştu:', error);
            } finally {
                setIsSubmitting(false);
            }
        } else {

            errorNotify();
        }
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Row>
                        <Col xs={12}>
                            <h1>Müşteri Ekle</h1>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="CompanyId">Şirket Seç</Label>
                                            <Input
                                                type="select"
                                                name="CompanyId"
                                                id="CompanyId"
                                                value={customer.CompanyId}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Şirket Seçin</option>
                                                {companies.map((company) => (
                                                    <option key={company.id} value={company.id}>
                                                        {company.companyName}
                                                    </option>
                                                ))}
                                                <option value="0">Diğer</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="FirstName">Adı</Label>
                                            <Input
                                                type="text"
                                                name="FirstName"
                                                id="FirstName"
                                                value={customer.FirstName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="LastName">Soyadı</Label>
                                            <Input
                                                type="text"
                                                name="LastName"
                                                id="LastName"
                                                value={customer.LastName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="Phone1">Telefon 1</Label>
                                            <Input
                                                type="text"
                                                name="Phone1"
                                                id="Phone1"
                                                value={customer.Phone1}
                                                onChange={handleChange}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="Phone2">Telefon 2</Label>
                                            <Input
                                                type="text"
                                                name="Phone2"
                                                id="Phone2"
                                                value={customer.Phone2}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="Email">E-Posta</Label>
                                            <Input
                                                type="email"
                                                name="Email"
                                                id="Email"
                                                value={customer.Email}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="Address">Adres</Label>
                                            <Input
                                                type="text"
                                                name="Address"
                                                id="Address"
                                                value={customer.Address}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="City">Şehir</Label>
                                            <Input
                                                type="text"
                                                name="City"
                                                id="City"
                                                value={customer.City}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="District">İlçe</Label>
                                            <Input
                                                type="text"
                                                name="District"
                                                id="District"
                                                value={customer.District}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Button color="primary" type="submit" disabled={isSubmitting}>
                                    Ekle
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

export default CustomerAdd;
