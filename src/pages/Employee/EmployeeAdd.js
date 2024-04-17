import React, { useState } from 'react';
import { Col, Container, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendPostRequest } from '../../helpers/api'; // Yardımcı API işlevini içe aktarın

const EmployeeAdd = () => {
    const initialEmployee = {
        Name: null,
        LastName: null,
        HireDate: null,
        IsContinue: true,
        QuitDate: null,
        Role: null,
        Position: null,
        BirtDate: null,
        Phone: null,
        Email: null,
        Notes: null,
        EmergencyContact: null,
        Address: null,
        Salary: null,
    };

    const [employee, setEmployee] = useState(initialEmployee);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        const newValue = value === '' ? null : value;

        setEmployee({
            ...employee,
            [name]: newValue
        });
    };

    const successnotify = () => {
        toast("Kayıt başarılı bir şekilde eklendi.", {
            position: "top-right",
            hideProgressBar: true,
            closeOnClick: false,
            className: 'bg-success text-white'
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            var request = await sendPostRequest('Employee', employee);

            if (request.isSuccess === true) {
                successnotify();
                setEmployee(initialEmployee);
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
                            <h1>Çalışan Ekle</h1>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="Name">Adı</Label>
                                            <Input
                                                type="text"
                                                name="Name"
                                                id="Name"
                                                value={employee.Name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="LastName">Soyadı</Label>
                                            <Input
                                                type="text"
                                                name="LastName"
                                                id="LastName"
                                                value={employee.LastName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="HireDate">İşe Giriş Tarihi</Label>
                                            <Input
                                                type="date"
                                                name="HireDate"
                                                id="HireDate"
                                                value={employee.HireDate || ''}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="QuitDate">İşten Çıkış Tarihi</Label>
                                            <Input
                                                type="date"
                                                name="QuitDate"
                                                id="QuitDate"
                                                value={employee.QuitDate || ''}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="Role">Rol</Label>
                                            <Input
                                                type="text"
                                                name="Role"
                                                id="Role"
                                                value={employee.Role}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="Position">Pozisyon</Label>
                                            <Input
                                                type="text"
                                                name="Position"
                                                id="Position"
                                                value={employee.Position}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="BirtDate">Doğum Tarihi</Label>
                                            <Input
                                                type="date"
                                                name="BirtDate"
                                                id="BirtDate"
                                                value={employee.BirtDate || ''}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="Phone">Telefon</Label>
                                            <Input
                                                type="text"
                                                name="Phone"
                                                id="Phone"
                                                value={employee.Phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="Email">E-Posta</Label>
                                            <Input
                                                type="email"
                                                name="Email"
                                                id="Email"
                                                value={employee.Email}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="EmergencyContact">Acil Durum İletişim</Label>
                                            <Input
                                                type="text"
                                                name="EmergencyContact"
                                                id="EmergencyContact"
                                                value={employee.EmergencyContact}
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
                                                value={employee.Address}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="Salary">Maaş</Label>
                                            <Input
                                                type="number"
                                                name="Salary"
                                                id="Salary"
                                                value={employee.Salary}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup>
                                    <Label for="Notes">Notlar</Label>
                                    <Input
                                        type="textarea"
                                        name="Notes"
                                        id="Notes"
                                        value={employee.Notes}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
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

export default EmployeeAdd;
