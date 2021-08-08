import React from "react";
import { Form, Row, Col, Button, Jumbotron, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

// Date Picker
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt";

//components
import ListarEstados from "./listar-estados/listar-estados";
import ListarCidades from "./listar-cidades/listar-cidades";

registerLocale("pt", pt);

function Checkout(props) {
    return (
        <Jumbotron fluid className="jumbo">
            <h3 className="text-center">Finalizar compra</h3>

            <Form noValidate className="container mt-5">
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
                            dateFormat="dd/mm/yyyy"
                            placeholderText="Selecione a data"
                            withPortal
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
                        <Form.Control as="select" name="estado" data-testid="estado">
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
                        <Form.Control as="select" name="cidade" data-testid="cidade">
                            <option value="">Selecione a cidade</option>
                            <ListarCidades estado={""} />
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
                    />
                    <Form.Check
                        inline
                        name="emailPromocional"
                        type="radio"
                        id="promocaoNao"
                        value="N"
                        label="Não"
                        className="ml-4"
                    />
                </Form.Group>

                <Form.Group as={Row} controlId="termosCondicoes">
                    <Form.Check
                        name="termosCondicoes"
                        label="Concordo com os termos e condições"
                        className="ml-3"
                        data-testid="check-termos-condicoes"
                    />
                </Form.Group>

                <Form.Group as={Row} controlId="finalizarCompra">
                    <Col className="text-center" sm={12}>
                        <Button type="submit" variant="success" data-testid="btn-finalizar-compra">
                            Finalizar compra
                        </Button>
                    </Col>
                </Form.Group>
            </Form>

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

export default Checkout;
