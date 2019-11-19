import React, { Component, } from 'react';
import { Button, InputGroup, FormControl, Form, Modal} from 'react-bootstrap';
import DBOps from '../DBOps.js'
import { Auth } from 'aws-amplify'

class ProcessQuote extends Component {
    constructor() {
        super()
        this.state = {
            show: false
        }
    }
    render() {
        return (
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Modal body text goes here.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Close</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        )
    }


}

export default ProcessQuote;
