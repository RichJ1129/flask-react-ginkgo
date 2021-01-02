import React, {useState} from "react";
import {Form, Button, FormControl} from 'react-bootstrap';


export const SequenceForm = ({onNewSequence}) => {
    const [sequence, setSequence] = useState("");
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
                            setTimeout(
                                () => window.location.reload(),
                                10000
                            );
                        }
                    }}>
                    Submit
                </Button>
                <Button
                    onClick={async () => {
                        const response = await fetch("/api/clear_searches", {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json"
                            },
                        });

                        if (response.ok) {
                            console.log("response worked!");
                            window.location.reload()
                        }

                    }}>
                    Clear Searches </Button>

            </Form.Group>
        </Form>
    );
};