import React, { Component } from 'react';
import { Container, Row, Col, Label, Input } from 'reactstrap';

class HistoryFormat extends Component {

    // constructor() {
    //     super();
    // }

    render() {
        return (
            <Container>
                <br></br>
                <Row>

                    <Col sm="6">
                        <div className="checkbox">
                            <Input type="checkbox" name="highBloodPressure" id="highBloodPressure" />
                            <Label htmlFor="highBloodPressure"> High Blood Pressure</Label>
                            <Input
                                type="text"
                                name="highBloodPressure"
                                id="highBloodPressure"
                                placeholder="Family member with a history of High Blood Pressure"
                            />
                        </div>
                        <br></br>
                        <div>
                            <Input type="checkbox" name="stroke" id="stroke" />
                            <Label htmlFor="stroke"> Stroke</Label>
                            <Input
                                type="text"
                                name="stroke"
                                id="stroke"
                                placeholder="Family member with a history of Stroke"
                            />
                        </div>
                        <br></br>
                        <div>
                            <Input type="checkbox" name="heartAttack" id="heartAttack" />
                            <Label htmlFor="heartAttack"> Heart attack before the age of 55</Label>
                            <Input
                                type="text"
                                name="heartAttack"
                                id="heartAttack"
                                placeholder="Family member with a history of Heart Attack"
                            />
                        </div>
                        <br></br>
                        <div>
                            <Input type="checkbox" name="bloodDisorder" id="bloodDisorder" />
                            <Label htmlFor="bloodDisorder"> Blood or Clotting Disorder</Label>
                            <Input
                                type="text"
                                name="bloodDisorder"
                                id="bloodDisorder"
                                placeholder="Family member with a history of Blood or Clotting Disorder"
                            />
                        </div>
                        <br></br>
                        <div>
                            <Input type="checkbox" name="cholestrol" id="cholestrol" />
                            <Label htmlFor="cholestrol"> Cholestrol or Blood Fat Disorder</Label>
                            <Input
                                type="text"
                                name="cholestrol"
                                id="cholestrol"
                                placeholder="Family member with a history of Cholestrol"
                            />
                        </div>
                        <br></br>
                        <div>
                            <Input type="checkbox" name="diabetes" id="diabetes" />
                            <Label htmlFor="diabetes"> Diabetes</Label>
                            <Input
                                type="text"
                                name="diabetes"
                                id="diabetes"
                                placeholder="Family member with a history of Diabetes"
                            />
                        </div>
                    </Col>
                    <Col sm="6">
                        <div>
                            <Input type="checkbox" name="glaucoma" id="glaucoma" />
                            <Label htmlFor="glaucoma"> Glaucoma</Label>
                            <Input
                                type="text"
                                name="glaucoma"
                                id="glaucoma"
                                placeholder="Family member with a history of Glaucoma"
                            />
                        </div>
                        <br></br>
                        <div>
                            <Input type="checkbox" name="epilepsy" id="epilepsy" />
                            <Label htmlFor="epilepsy"> Epilepsy</Label>
                            <Input
                                type="text"
                                name="epilepsy"
                                id="epilepsy"
                                placeholder="Family member with a history of Epilepsy"
                            />
                        </div>
                        <br></br>
                        <div>
                            <Input type="checkbox" name="cancer" id="cancer" />
                            <Label htmlFor="cancer"> Cancer</Label>
                            <Input
                                type="text"
                                name="cancer"
                                id="cancer"
                                placeholder="Family member with a history of Cancer"
                            />
                        </div>
                        <br></br>
                        <div>
                            <Input type="checkbox" name="alcohol" id="alcohol" />
                            <Label htmlFor="alcohol"> Alcohol</Label>
                            <Input
                                type="text"
                                name="alcohol"
                                id="alcohol"
                                placeholder="Family member with a history of Alcoholism"
                            />
                        </div>
                        <br></br>
                        <div>
                            <Input type="checkbox" name="psychiatric" id="psychiatric" />
                            <Label htmlFor="psychiatric"> Psychiatric Illness</Label>
                            <Input
                                type="text"
                                name="psychiatric"
                                id="psychiatric"
                                placeholder="Family member with a history of Psychiatric Illness"
                            />
                        </div>
                        <br></br>
                        <div>
                            <Input type="checkbox" name="suicide" id="suicide" />
                            <Label htmlFor="suicide"> Suicide</Label>
                            <Input
                                type="text"
                                name="suicide"
                                id="suicide"
                                placeholder="Family member with a history of Suicide"
                            />
                        </div>
                    </Col>
                    <Col>


                    </Col>
                </Row>
            </Container >
        );
    };

}
export default HistoryFormat;
