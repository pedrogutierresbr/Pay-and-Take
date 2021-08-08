import React, { useState } from "react";
import { Form, Row, Col, Button, Jumbotron, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

// Formik
import { Formik } from "formik";
import * as yup from "yup";

// Date Picker
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt";

//components
import ListarEstados from "./listar-estados/listar-estados";
import ListarCidades from "./listar-cidades/listar-cidades";

registerLocale("pt", pt);

function Checkout(props) {
    //Variaveis de estado para armazenar dados  para funcionalidades do Formik
    const [dataNascimento, setDataNascimento] = useState(null);
    const [formEnviado, setFormEnviado] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [erroModal, setErroModal] = useState(false);

    const schema = yup.object({
        email: yup.string().email().required(),
        nomeCompleto: yup.string().required().min(5),
        cpf: yup.string().required().min(14).max(14),
        endereco: yup.string().min(5).required(),
        cidade: yup.string().required(),
        estado: yup.string().required(),
        cep: yup.string().required().min(9).max(9),
        emailPromocional: yup.string().required(),
        termosCondicoes: yup.bool().oneOf([true]),
    });

    function visivel() {
        return props.visivel ? "null jumbo" : "hidden jumbo";
    }

    function finalizarCompra(values) {
        return;
    }

    function handleDataNascimento(data) {
        setDataNascimento(data);
    }

    function datePickerCss() {
        if (!formEnviado) {
            return "form-control";
        }

        if (dataNascimento) {
            return "form-control is-valid";
        } else {
            return "form-control is-invalid";
        }
    }

    return (
        <Jumbotron fluid className={visivel()}>
            <h3 className="text-center">Finalizar compra</h3>

            <Formik
                onSubmit={(values) => finalizarCompra(values)}
                initialValues={{
                    email: "",
                    nomeCompleto: "",
                    cpf: "",
                    endereco: "",
                    cidade: "",
                    estado: "",
                    cep: "",
                    termosCondicoes: false,
                    emailPromocional: "S",
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form noValidate className="container mt-5" onSubmit={handleSubmit}>
                        <Form.Group as={Row} controlId="email">
                            <Form.Label column sm={3}>
                                Email:
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Digite o seu email"
                                    data-testid="txt-email"
                                    value={values.email}
                                    onChange={handleChange}
                                    isValid={touched.email && !errors.email}
                                    isInvalid={touched.email && !!errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Digite um email válido
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="nomeCompleto">
                            <Form.Label column sm={3}>
                                Nome completo:
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="nomeCompleto"
                                    placeholder="Digite o seu nome completo"
                                    data-testid="txt-nome-completo"
                                    value={values.nomeCompleto}
                                    onChange={handleChange}
                                    isValid={touched.nomeCompleto && !errors.nomeCompleto}
                                    isInvalid={touched.nomeCompleto && !!errors.nomeCompleto}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Digite o seu nome completo (mínimo 5 caracteres)
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="dataNascimento">
                            <Form.Label column sm={3}>
                                Data de nascimento:
                            </Form.Label>
                            <Col sm={9}>
                                <DatePicker
                                    locale="pt"
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Selecione a data"
                                    withPortal
                                    selected={dataNascimento}
                                    onChange={handleDataNascimento}
                                    className={datePickerCss()}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="cpf">
                            <Form.Label column sm={3}>
                                CPF:
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="cpf"
                                    placeholder="Digite o seu CPF"
                                    data-testid="txt-cpf"
                                    value={values.cpf}
                                    onChange={handleChange}
                                    isValid={touched.cpf && !errors.cpf}
                                    isInvalid={touched.cpf && !!errors.cpf}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Digite um CPF válido
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="endereco">
                            <Form.Label column sm={3}>
                                Endereço:
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="endereco"
                                    placeholder="Digite o seu endereço completo"
                                    data-testid="txt-endereco"
                                    value={values.endereco}
                                    onChange={handleChange}
                                    isValid={touched.endereco && !errors.endereco}
                                    isInvalid={touched.endereco && !!errors.endereco}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Digite o seu endereço
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="estado">
                            <Form.Label column sm={3}>
                                Estado:
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    as="select"
                                    name="estado"
                                    data-testid="estado"
                                    value={values.estado}
                                    onChange={handleChange}
                                    isValid={touched.estado && !errors.estado}
                                    isInvalid={touched.estado && !!errors.estado}
                                >
                                    <ListarEstados />
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Selecione o seu estado
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="cidade">
                            <Form.Label column sm={3}>
                                Cidade:
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    as="select"
                                    name="cidade"
                                    data-testid="cidade"
                                    value={values.cidade}
                                    onChange={handleChange}
                                    isValid={touched.cidade && !errors.cidade}
                                    isInvalid={touched.cidade && !!errors.cidade}
                                >
                                    <option value="">Selecione a cidade</option>
                                    <ListarCidades estado={values.estado} />
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Selecione a sua cidade
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="cep">
                            <Form.Label column sm={3}>
                                CEP:
                            </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="cep"
                                    placeholder="Digite o seu CEP"
                                    data-testid="txt-cep"
                                    value={values.cep}
                                    onChange={handleChange}
                                    isValid={touched.cep && !errors.cep}
                                    isInvalid={touched.cep && !!errors.cep}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Digite o seu CEP
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="emailPromocional">
                            <Form.Label column sm={12} className="my-2">
                                Deseja receber emails com promoções?
                            </Form.Label>
                            <Form.Check
                                inline
                                name="emailPromocional"
                                type="radio"
                                id="promocaoSim"
                                value="S"
                                label="Sim"
                                className="ml-3"
                                checked={values.emailPromocional === "S"}
                                onChange={handleChange}
                            />
                            <Form.Check
                                inline
                                name="emailPromocional"
                                type="radio"
                                id="promocaoNao"
                                value="N"
                                label="Não"
                                className="ml-4"
                                checked={values.emailPromocional === "N"}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Row} controlId="termosCondicoes">
                            <Form.Check
                                name="termosCondicoes"
                                label="Concordo com os termos e condições"
                                className="ml-3"
                                data-testid="check-termos-condicoes"
                                value={values.termosCondicoes}
                                onChange={handleChange}
                                isValid={touched.termosCondicoes && !errors.termosCondicoes}
                                isInvalid={touched.termosCondicoes && !!errors.termosCondicoes}
                            />
                        </Form.Group>

                        <Form.Group as={Row} controlId="finalizarCompra">
                            <Col className="text-center" sm={12}>
                                <Button
                                    type="submit"
                                    variant="success"
                                    data-testid="btn-finalizar-compra"
                                >
                                    Finalizar compra
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                )}
            </Formik>

            <Modal show={false} data-testid="modal-compra-sucesso">
                <Modal.Header closeButton>
                    <Modal.Title>Compra realizada com sucesso!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Um email de confirmação foi enviado com os detalhes da sua compra.
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success">Continuar</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={false} data-testid="modal-erro-comprar">
                <Modal.Header closeButton>
                    <Modal.Title>Erro ao processar pedido</Modal.Title>
                </Modal.Header>

                <Modal.Body>Tente novamente em alguns instantes...</Modal.Body>

                <Modal.Footer>
                    <Button variant="warning">Fechar</Button>
                </Modal.Footer>
            </Modal>
        </Jumbotron>
    );
}

Checkout.propTypes = {
    visivel: PropTypes.bool.isRequired,
    handleExibirProdutos: PropTypes.func.isRequired,
    total: PropTypes.string.isRequired,
    produtos: PropTypes.object.isRequired,
    handleLimparCarrinho: PropTypes.func.isRequired,
};

export default Checkout;
