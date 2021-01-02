import './App.css';
import React, {Component, useState, useEffect} from 'react';
import {SequenceForm} from "./components/sequenceForm";
import {Sequences} from './components/savedSequences';
import {Col, Row, Container} from "react-bootstrap";


function App() {
    const [sequences, setSequences] = useState([]);

    useEffect(() => {
        fetch("api/get_proteins").then(response =>
            response.json().then(data => {
                setSequences(data.sequences);
            })
        );
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <Container>
                    <Row>
                        <Col sm = {5}>
                            <div className="search_box">
                            <SequenceForm
                                onNewSequence={sequence =>
                                    setSequences(currentSequences => [sequence, ...currentSequences])
                                }
                            />
                            </div>
                        </Col>
                        <Col sm = {7}>
                            <Sequences sequences={sequences}/>
                        </Col>
                    </Row>
                </Container>
            </header>

        </div>
    );
}


export default App;


