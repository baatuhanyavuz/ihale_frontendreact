import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendPostRequest, sendGetRequest } from '../../helpers/api';

const ServiceAdd = () => {
    const initialService = {
        CompanyId: null,
        ServiceDate: new Date().toISOString().split('T')[0],
        Address: '',
        MachineBrand: '',
        MachineModel: '',
        MachineSerialNumber: '',
        WorkingTime: '',
        Phone: '',
        FaultsandRequest: '',
        EmplooyeId: null,
        AuthorizedCustomer: '',
    };

    const [service, setService] = useState(initialService);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [companies, setCompanies] = useState([]); // Şirketler için dropdown verisi
    const [employees, setEmployees] = useState([]); // Çalışanlar için dropdown verisi

    useEffect(() => {
        // Şirketlerin verilerini çekmek için API isteği gönderin
        async function fetchCompanies() {
            try {
                const response = await sendGetRequest('Company');
                if (response.isSuccess === true) {
                    setCompanies(response.data);
                } else {
                    throw new Error(response.message);
                }
            } catch (error) {
                console.error('Şirket verilerini çekerken hata oluştu:', error);
            }
        }

        // Çalışanların verilerini çekmek için API isteği gönderin
        async function fetchEmployees() {
            try {
                const response = await sendGetRequest('Employee');
                if (response.isSuccess === true) {
                    setEmployees(response.data);
                } else {
                    throw new Error(response.message);
                }
            } catch (error) {
                console.error('Çalışan verilerini çekerken hata oluştu:', error);
            }
        }

        fetchCompanies(); // Şirket verilerini çekme işlemi
        fetchEmployees(); // Çalışan verilerini çekme işlemi
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = value === '' ? null : value;
        setService({
            ...service,
            [name]: newValue,
        });
    };

    const successNotify = () => {
        toast('Servis başarıyla eklendi.', {
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
            const request = await sendPostRequest('TechnicalService', service);

            if (request.isSuccess === true) {
                successNotify();
                setService(initialService);
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
                            <h1>Servis Formu Ekle</h1>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="CompanyId">Şirket ID</Label>
                                            <Input
                                                type="select"
                                                name="CompanyId"
                                                id="CompanyId"
                                                value={service.CompanyId || ''}
                                                onChange={handleChange}
                                            >
                                                <option value={null}>Seçiniz</option>
                                                {companies.map((company) => (
                                                    <option key={company.id} value={company.id}>
                                                        {company.companyName}
                                                    </option>
                                                ))}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="ServiceDate">Servis Tarihi</Label>
                                            <Input
                                                type="date"
                                                name="ServiceDate"
                                                id="ServiceDate"
                                                value={service.serviceDate}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="EmplooyeId">Çalışan ID</Label>
                                            <Input
                                                type="select"
                                                name="EmplooyeId"
                                                id="EmplooyeId"
                                                value={service.EmplooyeId || ''}
                                                onChange={handleChange}
                                            >
                                                <option value={null}>Seçiniz</option>
                                                {employees.map((employee) => (
                                                    <option key={employee.id} value={employee.id}>
                                                        {employee.name}
                                                    </option>
                                                ))}
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="Address">Adres</Label>
                                            <Input
                                                type="text"
                                                name="Address"
                                                id="Address"
                                                value={service.address}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="MachineBrand">Makine Markası</Label>
                                            <Input
                                                type="text"
                                                name="MachineBrand"
                                                id="MachineBrand"
                                                value={service.machineBrand}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="MachineModel">Makine Modeli</Label>
                                            <Input
                                                type="text"
                                                name="MachineModel"
                                                id="MachineModel"
                                                value={service.machineModel}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="MachineSerialNumber">Makine Seri Numarası</Label>
                                            <Input
                                                type="text"
                                                name="MachineSerialNumber"
                                                id="MachineSerialNumber"
                                                value={service.machineSerialNumber}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="WorkingTime">Çalışma Süresi</Label>
                                            <Input
                                                type="text"
                                                name="WorkingTime"
                                                id="WorkingTime"
                                                value={service.workingTime}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="Phone">Telefon</Label>
                                            <Input
                                                type="text"
                                                name="Phone"
                                                id="Phone"
                                                value={service.phone}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                       <FormGroup>
                                            <Label for="AuthorizedCustomer">Yetkilendirilmiş Müşteri</Label>
                                            <Input
                                                type="text"
                                                name="AuthorizedCustomer"
                                                id="AuthorizedCustomer"
                                                value={service.authorizedCustomer}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                    <FormGroup>
                                            <Label for="FaultsandRequest">Arızalar ve Talepler</Label>
                                            <Input
                                                type="textarea"
                                                name="FaultsandRequest"
                                                id="FaultsandRequest"
                                                value={service.faultsandRequest}
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

export default ServiceAdd;
