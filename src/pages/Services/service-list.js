import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { sendGetRequest, sendDeleteRequest } from '../../helpers/api';
import BreadCrumb from '../../Components/Common/BreadCrumb';

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const fetchServices = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await sendGetRequest('TechnicalService');

            if (response.isSuccess === true) {
                const servicesWithCompanyAndEmployee = await Promise.all(
                    response.data.map(async (service) => {
                        const companyResponse = await sendGetRequest(`Company/${service.companyId}`);
                        const employeeResponse = await sendGetRequest(`Employee/${service.emplooyeId}`);

                        if (companyResponse.isSuccess && employeeResponse.isSuccess) {
                            service.companyName = companyResponse.data.companyName;
                            service.employeeName = employeeResponse.data.name;
                        }

                        return service;
                    })
                );

                setServices(servicesWithCompanyAndEmployee);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleDeleteService = async () => {
        try {
            toggleModal();
            setIsLoading(true);
            setError(null);

            const response = await sendDeleteRequest(`TechnicalService/${selectedService.id}`, {
                method: 'DELETE',
            });

            if (response.isSuccess === true) {
                // Başarılı silme işlemi sonrası servisleri güncelle
                const updatedServices = services.filter((service) => service.id !== selectedService.id);
                setServices(updatedServices);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
            setSelectedService(null);
        }
    };

    const openModal = (service) => {
        setSelectedService(service);
        toggleModal();
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Servis Listesi" pageTitle="Sayfa" />
                    <Row>
                        <Col xs={12}>
                            <h1>Servis Listesi</h1>
                            {isLoading && <p>Veriler yükleniyor...</p>}
                            {error && <p>Hata: {error.message}</p>}
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>Şirket Adı</th>
                                        <th>Servis Tarihi</th>
                                        <th>Çalışan Adı</th>
                                        <th>Telefon</th>
                                        <th>Yetkilendirilmiş Müşteri</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {services.map((service) => (
                                        <tr key={service.id}>
                                            <td>{service.companyName}</td>
                                            <td>{service.serviceDate}</td>
                                            <td>{service.employeeName}</td>
                                            <td>{service.phone}</td>
                                            <td>{service.authorizedCustomer}</td>
                                            <td>
                                                <Button color="info" onClick={() => openModal(service)}>
                                                    Detaylar
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Modal isOpen={modalOpen} toggle={toggleModal} size="xl">
                <ModalHeader toggle={toggleModal}>Servis Detayları</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="CompanyName">Şirket Adı</Label>
                                    <Input type="text" name="CompanyName" id="CompanyName" value={selectedService?.companyName} disabled />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="ServiceDate">Servis Tarihi</Label>
                                    <Input type="text" name="ServiceDate" id="ServiceDate" value={selectedService?.serviceDate} disabled />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="EmployeeName">Çalışan Adı</Label>
                                    <Input type="text" name="EmployeeName" id="EmployeeName" value={selectedService?.employeeName} disabled />
                                </FormGroup>
                            </Col>

                         
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="AuthorizedCustomer">Yetkilendirilmiş Müşteri</Label>
                                    <Input type="text" name="AuthorizedCustomer" id="AuthorizedCustomer" value={selectedService?.authorizedCustomer} disabled />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="MachineBrand">Marka</Label>
                                    <Input type="text" name="MachineBrand" id="MachineBrand" value={selectedService?.machineBrand} disabled />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="MachineModel">Model</Label>
                                    <Input type="text" name="MachineModel" id="MachineModel" value={selectedService?.machineModel} disabled />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="MachineSerialNumber">Seri Numarası</Label>
                                    <Input type="text" name="MachineSerialNumber" id="MachineSerialNumber" value={selectedService?.machineSerialNumber} disabled />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="WorkingTime">Çalışma Zamanı</Label>
                                    <Input type="text" name="WorkingTime" id="WorkingTime" value={selectedService?.workingTime} disabled />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="Phone">Telefon</Label>
                                    <Input type="text" name="Phone" id="Phone" value={selectedService?.phone} disabled />
                                </FormGroup>
                            </Col>
                           
                        </Row>
                        <Row>
                        <Col md={12}>
                                <FormGroup>
                                    <Label for="FaultsandRequest">Arıza ve Talepler</Label>
                                    <Input type="textarea" name="FaultsandRequest" id="FaultsandRequest" value={selectedService?.faultsandRequest} disabled />
                                </FormGroup>
                            </Col>
                       
                            <Col md={12}>
                                <FormGroup>
                                    <Label for="Address">Adres</Label>
                                    <Input type="textarea" name="Address" id="Address" value={selectedService?.address} disabled />
                                </FormGroup>
                            </Col>

                            <Col md={12}>
                                <FormGroup>
                                    <Label for="Address">Yapılan İşlemler</Label>
                                    <Input type="textarea" name="Address" id="Address" value={"test"} disabled />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleDeleteService}>
                        Sil
                    </Button>
                    <Button color="secondary" onClick={toggleModal}>
                        İptal
                    </Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
};

export default ServiceList;
