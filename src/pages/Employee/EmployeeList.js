import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { sendGetRequest, sendDeleteRequest } from '../../helpers/api'; // Yardımcı API işlevini içe aktarın

import BreadCrumb from '../../Components/Common/BreadCrumb';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [deleteModal, setDeleteModal] = useState(false); // Silme modalını açmak/kapatmak için kullanılır
    const [employeeToDelete, setEmployeeToDelete] = useState(null); // Silinecek çalışanı tutar

    const toggleDeleteModal = () => {
        setDeleteModal(!deleteModal);
    };

    const fetchEmployees = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await sendGetRequest('Employee');
        
            if (response.isSuccess === true) {
                setEmployees(response?.data); // Veri yapısına göre 'data' özelliğine erişiyoruz
            } else {
                throw new Error(response?.message);
            }
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDeleteEmployee = async (employeeId) => {
        try {
            // Silme isteği gönderin
            const response = await sendDeleteRequest(`Employee/${employeeId}`, {
                method: 'DELETE',
            });

            if (!response.isSuccess ===true) {
                throw new Error('Network response was not ok');
            }

            // Başarılı silme işlemi sonrası çalışanları güncelleyin
            const updatedEmployees = employees.filter((employee) => employee.id !== employeeId);
            setEmployees(updatedEmployees);

            // Silme işlemi tamamlandığında modalı kapatın
            toggleDeleteModal();
        } catch (error) {
            console.error('Error sending DELETE request:', error);
        }
    };

    const confirmDeleteEmployee = (employeeId) => {
        // Silmek istediğiniz çalışanın kim olduğunu belirlemek için state'i güncelleyin
        setEmployeeToDelete(employeeId);
        
        // Silme işlemini onaylamak için modalı açın
        toggleDeleteModal();
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Servis" pageTitle="Sayfa" />
                    <Row>
                        <Col xs={12}>
                            <h1>Çalışan Listesi</h1>
                            {isLoading && <p>Veriler yükleniyor...</p>}
                            {error && <p>Hata: {error.message}</p>}
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>Adı</th>
                                        <th>Soyadı</th>
                                        <th>İşe Giriş Tarihi</th>
                                        <th>Rol</th>
                                        <th>Maaş</th>
                                        <th>İşlemler</th> {/* Silme düğmesi için yeni sütun */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((employee) => (
                                        <tr key={employee?.id}>
                                            <td>{employee?.name}</td>
                                            <td>{employee?.lastName}</td>
                                            <td>{employee?.hireDate}</td>
                                            <td>{employee?.role}</td>
                                            <td>{employee?.salary}</td>
                                            <td>
                                                <Button
                                                    color="danger"
                                                    onClick={() => confirmDeleteEmployee(employee?.id)}
                                                >
                                                    Sil
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

            {/* Silme Modalı */}
            <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
                <ModalHeader toggle={toggleDeleteModal}>Çalışanı Sil</ModalHeader>
                <ModalBody>
                    Çalışanı silmek istediğinizden emin misiniz?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => handleDeleteEmployee(employeeToDelete)}>
                        Evet, Sil
                    </Button>{' '}
                    <Button color="secondary" onClick={toggleDeleteModal}>
                        İptal
                    </Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
};

export default EmployeeList;
