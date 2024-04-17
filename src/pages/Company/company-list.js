import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { sendGetRequest, sendPutRequest, sendDeleteRequest } from '../../helpers/api';
import BreadCrumb from '../../Components/Common/BreadCrumb';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [updateCompanyData, setUpdateCompanyData] = useState({});

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const fetchCompanies = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await sendGetRequest('Company');

            if (response.isSuccess === true) {
                setCompanies(response.data);
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
        fetchCompanies();
    }, []);

    const handleDeleteCompany = async () => {
        try {
            toggleModal();
            setIsLoading(true);
            setError(null);


            const response = await sendDeleteRequest(`Company/${selectedCompany.id}`, {
                method: 'DELETE',
            });
            if (response.isSuccess === true) {
                // Başarılı silme işlemi sonrası şirketleri güncelle
                const updatedCompanies = companies.filter((company) => company.id !== selectedCompany.id);
                setCompanies(updatedCompanies);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
            setSelectedCompany(null);
        }
    };

    const handleUpdateCompany = async () => {
        try {
            toggleModal();
            setIsLoading(true);
            setError(null);

            // Güncellenmiş şirket bilgilerini içeren JSON objesi oluştur
            const updatedCompany = {
                id: updateCompanyData.id,
                companyName: updateCompanyData.companyName,
                phone1: updateCompanyData.phone1,
                phone2: updateCompanyData.phone2,
                address: updateCompanyData.address,
                email: updateCompanyData.email,
                city: updateCompanyData.city,
                district: updateCompanyData.district,

            };

            const response = await sendPutRequest('Company', updatedCompany);

            if (response.isSuccess === true) {
                // Başarılı güncelleme sonrası şirketleri güncelle
                const updatedCompanies = companies.map((company) => {
                    if (company.id === selectedCompany.id) {
                        return { ...company, ...updatedCompany };
                    }
                    return company;
                });
                setCompanies(updatedCompanies);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
            setSelectedCompany(null);
        }
    };

    const openModal = (company) => {
        setSelectedCompany(company);
        setUpdateCompanyData(company);
        toggleModal();
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Şirket Listesi" pageTitle="Sayfa" />
                    <Row>
                        <Col xs={12}>
                            <h1>Şirket Listesi</h1>
                            {isLoading && <p>Veriler yükleniyor...</p>}
                            {error && <p>Hata: {error.message}</p>}
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>Şirket Adı</th>
                                        <th>Telefon</th>
                                        <th>Mail</th>
                                        <th>Şehir</th>

                                        <th>İşlemler</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {companies.map((company) => (
                                        <tr key={company.id}>
                                            <td>{company.companyName}</td>
                                            <td>{company.phone1}</td>
                                            <td>{company.email}</td>
                                            <td>{company.city}</td>
                                            <td>
                                                <Button
                                                    color="info"
                                                    onClick={() => openModal(company)}
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

            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Şirket Detayları</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col md={12}>
                                {/* İlk yarı genişlikteki form alanları */}
                                <FormGroup>
                                    <Label for="companyName">Şirket Adı</Label>
                                    <Input
                                        type="text"
                                        name="companyName"
                                        id="companyName"
                                        value={updateCompanyData.companyName}
                                        onChange={(e) => setUpdateCompanyData({ ...updateCompanyData, companyName: e.target.value })}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="Email">E-Posta</Label>
                                    <Input
                                        type="email"
                                        name="Email"
                                        id="Email"
                                        value={updateCompanyData.email}
                                        onChange={(e) => setUpdateCompanyData({ ...updateCompanyData, email: e.target.value })}
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
                                        value={updateCompanyData.phone1}
                                        onChange={(e) => setUpdateCompanyData({ ...updateCompanyData, phone1: e.target.value })}
                                    />
                                </FormGroup>

                            </Col>

                            <Col md={6}>
                                {/* İkinci yarı genişlikteki form alanları */}


                                <FormGroup>
                                    <Label for="Phone2">Telefon 2</Label>
                                    <Input
                                        type="text"
                                        name="Phone2"
                                        id="Phone2"
                                        value={updateCompanyData.phone2}
                                        onChange={(e) => setUpdateCompanyData({ ...updateCompanyData, phone2: e.target.value })}
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
                                        value={updateCompanyData.city}
                                        onChange={(e) => setUpdateCompanyData({ ...updateCompanyData, city: e.target.value })}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="District">İlçe</Label>
                                    <Input
                                        type="text"
                                        name="District"
                                        id="District"
                                        value={updateCompanyData.district}
                                        onChange={(e) => setUpdateCompanyData({ ...updateCompanyData, district: e.target.value })}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={12}>
                                <FormGroup>
                                    <Label for="Address">Adres</Label>
                                    <Input
                                        type="text"
                                        name="Address"
                                        id="Address"
                                        value={updateCompanyData.address}
                                        onChange={(e) => setUpdateCompanyData({ ...updateCompanyData, address: e.target.value })}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleUpdateCompany}>
                        Kaydet
                    </Button>
                    <Button color="danger" onClick={handleDeleteCompany}>
                        Sil
                    </Button>
                    <Button color="secondary" onClick={toggleModal}>
                        İptal
                    </Button>
                </ModalFooter>
            </Modal>
        </React.Fragment >
    );
};

export default CompanyList;
