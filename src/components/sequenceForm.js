import React, {useState} from "react";
// import { Form, Input,  Button } from "semantic-ui-react";
import {Form, Button, FormControl} from 'react-bootstrap';


export const SequenceForm = ({onNewSequence}) => {
    const [sequence, setSequence] = useState("");
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {}

    setValidated(true);
  };
    return (
                <Form>
                    <Form.Group controlId="formBasicSequence">
                        <FormControl
                            type='text'
                            name='Sequence'
                            placeholder="Sequence"
                            value={sequence}
                            onChange={e => setSequence(e.target.value)}
                            required
                        />
          {/*                        <Form.Control.Feedback type="invalid">*/}
          {/*  Please provide a valid sequence.*/}
          {/*</Form.Control.Feedback>*/}
                    </Form.Group>
                    <Form.Group>
                        <Button
                            onClick={async () => {
                                const newSequence = {sequence};
                                const response = await fetch("/api/search_protein", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(newSequence)
                                });

                                if (response.ok) {
                                    console.log("response worked!");
                                    onNewSequence(sequence);
                                    setSequence("");
                                    window.location.reload();
                                }
                            }}>
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
    );
};