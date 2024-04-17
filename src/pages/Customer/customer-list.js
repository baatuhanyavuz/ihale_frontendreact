import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { sendGetRequest, sendPutRequest, sendDeleteRequest } from '../../helpers/api';
import BreadCrumb from '../../Components/Common/BreadCrumb';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [updateCustomerData, setUpdateCustomerData] = useState({});
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    // Bu kısım yeni eklenen şirket bilgisi için
    const [customerCompany, setCustomerCompany] = useState(null);

    const fetchCustomers = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await sendGetRequest('Customer');

            if (response.isSuccess === true) {
                setCustomers(response.data);
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
        fetchCustomers();
    }, []);

    const openUpdateModal = async (customer) => {
        setSelectedCustomer(customer);
        setUpdateCustomerData(customer);

        // Bu kısımda müşterinin bağlı olduğu şirketi alıyoruz
        const customerCompanyResponse = await sendGetRequest(`Company/CompanyName/${customer.companyId}`);
        if (customerCompanyResponse.isSuccess === true) {
            setCustomerCompany(customerCompanyResponse.data);
        }
    };

    const toggleDeleteModal = () => {
        setDeleteModalOpen(!deleteModalOpen);
    };

    const handleUpdateCustomer = async () => {
        try {
            // Güncellenmiş müşteri bilgilerini içeren JSON objesi oluştur
            const updatedCustomer = {
                id: updateCustomerData.id,
                firstName: updateCustomerData.firstName,
                lastName: updateCustomerData.lastName,
                phone1: updateCustomerData.phone1,
                phone2: updateCustomerData.phone2,
                email: updateCustomerData.email,
                address: updateCustomerData.address,
                city: updateCustomerData.city,
                district: updateCustomerData.district,
            };

            const response = await sendPutRequest('Customer', updatedCustomer);

            if (response.isSuccess === true) {
                // Başarılı güncelleme sonrası müşterileri güncelle
                const updatedCustomers = customers.map((customer) => {
                    if (customer.id === selectedCustomer.id) {
                        return { ...customer, ...updatedCustomer };
                    }
                    return customer;
                });
                setCustomers(updatedCustomers);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            console.error('Error updating customer:', error);
        } finally {
            setSelectedCustomer(null);
        }
    };

    const handleDeleteCustomer = async () => {
        try {
            const response = await sendDeleteRequest(`Customer/${selectedCustomer.id}`, {
                method: 'DELETE',
            });

            if (response.isSuccess === true) {
                // Başarılı silme işlemi sonrası müşterileri güncelle
                const updatedCustomers = customers.filter((customer) => customer.id !== selectedCustomer.id);
                setCustomers(updatedCustomers);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            console.error('Error deleting customer:', error);
        } finally {
            setSelectedCustomer(null);
            setDeleteModalOpen(false);
        }
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Müşteri Listesi" pageTitle="Sayfa" />
                    <Row>
                        <Col xs={12}>
                            <h1>Müşteri Listesi</h1>
                            {isLoading && <p>Veriler yükleniyor...</p>}
                            {error && <p>Hata: {error.message}</p>}
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>Ad</th>
                                        <th>Soyad</th>
                                        <th>Telefon 1</th>
                                        <th>Telefon 2</th>
                                        <th>E-Posta</th>
                                        <th>Adres</th>
                                        <th>Şehir</th>
                                        <th>İlçe</th>
                                        <th>Şirket</th> {/* Şirket sütunu ekledik */}
                                        <th>İşlemler</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map((customer) => (
                                        <tr key={customer.id}>
                                            <td>{customer.firstName}</td>
                                            <td>{customer.lastName}</td>
                                            <td>{customer.phone1}</td>
                                            <td>{customer.phone2}</td>
                                            <td>{customer.email}</td>
                                            <td>{customer.address}</td>
                                            <td>{customer.city}</td>
                                            <td>{customer.district}</td>
                                            <td>{customerCompany ? customerCompany.name : ''}</td> {/* Şirket bilgisini gösteriyoruz */}
                                            <td>
                                                <Button
                                                    color="info"
                                                    onClick={() => openUpdateModal(customer)}
                                                >
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

            {/* Müşteri Güncelleme Modalı */}
            <Modal isOpen={!!selectedCustomer} toggle={() => setSelectedCustomer(null)} size="lg">
                <ModalHeader toggle={() => setSelectedCustomer(null)}>Müşteri Detayları</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col md={6}>
                                {/* İlk yarı genişlikteki form alanları */}
                                <FormGroup>
                                    <Label for="firstName">Ad</Label>
                                    <Input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        value={updateCustomerData.firstName}
                                        onChange={(e) => setUpdateCustomerData({ ...updateCustomerData, firstName: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="lastName">Soyad</Label>
                                    <Input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        value={updateCustomerData.lastName}
                                        onChange={(e) => setUpdateCustomerData({ ...updateCustomerData, lastName: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="phone1">Telefon 1</Label>
                                    <Input
                                        type="text"
                                        name="phone1"
                                        id="phone1"
                                        value={updateCustomerData.phone1}
                                        onChange={(e) => setUpdateCustomerData({ ...updateCustomerData, phone1: e.target.value })}
                                    />
                                </FormGroup>
                                {/* Diğer form alanları burada */}
                            </Col>
                            <Col md={6}>
                                {/* İkinci yarı genişlikteki form alanları */}
                                <FormGroup>
                                    <Label for="phone2">Telefon 2</Label>
                                    <Input
                                        type="text"
                                        name="phone2"
                                        id="phone2"
                                        value={updateCustomerData.phone2}
                                        onChange={(e) => setUpdateCustomerData({ ...updateCustomerData, phone2: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">E-Posta</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={updateCustomerData.email}
                                        onChange={(e) => setUpdateCustomerData({ ...updateCustomerData, email: e.target.value })}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="address">Adres</Label>
                                    <Input
                                        type="text"
                                        name="address"
                                        id="address"
                                        value={updateCustomerData.address}
                                        onChange={(e) => setUpdateCustomerData({ ...updateCustomerData, address: e.target.value })}
                                    />
                                </FormGroup>
                                {/* Diğer form alanları burada */}
                            </Col>
                        </Row>
                        {/* Şirket bilgileri */}
                        <FormGroup>
                            <Label for="company">Şirket</Label>
                            <Input
                                type="text"
                                name="company"
                                id="company"
                                value={customerCompany ? customerCompany?.companyName : ''}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="companyPhone">Şirket Telefonu</Label>
                            <Input
                                type="text"
                                name="companyPhone"
                                id="companyPhone"
                                value={customerCompany ? customerCompany?.phone1 : ''}
                                readOnly
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleUpdateCustomer}>
                        Kaydet
                    </Button>
                    <Button color="danger" onClick={() => setDeleteModalOpen(true)}>
                        Sil
                    </Button>
                    <Button color="secondary" onClick={() => setSelectedCustomer(null)}>
                        İptal
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Müşteri Silme Modalı */}
            <Modal isOpen={deleteModalOpen} toggle={() => setDeleteModalOpen(false)}>
                <ModalHeader toggle={() => setDeleteModalOpen(false)}>Müşteri Sil</ModalHeader>
                <ModalBody>
                    Müşteriyi silmek istediğinizden emin misiniz?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleDeleteCustomer}>
                        Evet, Sil
                    </Button>{' '}
                    <Button color="secondary" onClick={() => setDeleteModalOpen(false)}>
                        İptal
                    </Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
};

export default CustomerList;
