import axios from 'axios'
import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export class Feedback extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message: "",
            rating: null
        }
    }

    onValueChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    submitFeedback = (event) => {
        event.preventDefault();
        axios.post("https://2oyrg6shsk.execute-api.us-west-1.amazonaws.com/dev/feedback", this.state).then(response => {
            console.log(response)
            alert("Feedback sumitted")
            this.setState({message: ""});
            this.setState({rating: null})
        })
    }
    render() {
        return (
            <div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter Feedback</Form.Label>
                        <Form.Control as="textarea" rows={3} name="message"
                            value={this.state.message} onChange={this.onValueChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter Rating</Form.Label>
                        <Form.Control type="number" name="rating"
                            value={this.state.rating}
                            onChange={this.onValueChange} />
                    </Form.Group>
                    <Button variant="primary" onClick={this.submitFeedback}>Submit</Button>
                </Form>
            </div>
        )
    }
}

export default Feedback
