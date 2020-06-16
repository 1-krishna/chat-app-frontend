import React from 'react';
import io from 'socket.io-client';
import { Button, Comment, Form, Grid, Card, Segment } from 'semantic-ui-react'

class ChatWindow extends React.Component {
    state = {
        messages: [],
        currentMessage: '',
        fromUser: ''
    }

    componentDidMount() {
        while (!this.fromUser) {
            let fromUserInput = prompt('Who are you?')
            this.fromUser = fromUserInput;
            console.log(this.fromUser);
        }

        while (!this.toUser) {
            let toUserInput = prompt('To whom are you sending?')
            this.toUser = toUserInput;
            console.log(this.toUser);
        }
        this.socket = io('http://localhost:4000');
        this.socket.on(`${this.fromUser}`, incomingMessage => {
            console.log(incomingMessage)
            this.setState({
                messages: [...this.state.messages, incomingMessage]
            })
        })
        this.setState({
            fromUser: this.fromUser
        })
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = event => {
        event.preventDefault();
        const { currentMessage } = this.state;

        let msgObject = {
            type: 'outgoing', // for sender
            data: currentMessage,
            fromUser: this.fromUser,
            toUser: this.toUser
        }

        let msgObjectToBeSent = {
            type: 'incoming', // for receiver
            data: currentMessage,
            fromUser: this.fromUser,
            toUser: this.toUser
        }

        this.socket.emit('messageSent', msgObjectToBeSent);
        this.setState({
            currentMessage: '',
            messages: [...this.state.messages, msgObject],
            fromUser: this.fromUser
        })
    }

    render() {
        return (

            <Card width="800px" centered raised>
                <Card.Header as='h3'>
                    Chat window of {this.state.fromUser}
                </Card.Header>
                <Grid>
                    {
                        this.state.messages.map((message, index) => {
                            if (message.type === 'incoming') {
                                return (
                                    <Grid.Row>
                                        <Grid.Column floated='left' width={12}>
                                            <Comment>
                                                <Comment.Avatar src='../images/avatar/matt.jpg' />
                                                <Comment.Content>
                                                    <Comment.Author as='a'>{message.fromUser}</Comment.Author>
                                                    <Comment.Metadata>
                                                        <div>12 baje</div>
                                                    </Comment.Metadata>
                                                    <Comment.Text>{message.data}</Comment.Text>
                                                </Comment.Content>
                                            </Comment>
                                        </Grid.Column>
                                        <Grid.Column floated='right' width={4}><Segment></Segment></Grid.Column>
                                    </Grid.Row>
                                )
                            } else {
                                return (
                                    <Grid.Row>
                                        <Grid.Column floated='left' width={4}><Segment></Segment></Grid.Column>
                                        <Grid.Column textAlign="right" floated='right' width={12}>
                                            <Comment>
                                                <Comment.Content>
                                                    <Comment.Author as='a'>You</Comment.Author>
                                                    <Comment.Metadata>
                                                        <div>1 baje</div>
                                                    </Comment.Metadata>
                                                    <Comment.Text>{message.data}</Comment.Text>
                                                </Comment.Content>
                                            </Comment>
                                        </Grid.Column>
                                    </Grid.Row>
                                )
                            }
                        })
                    }
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Form reply onSubmit={this.handleSubmit}>
                                <Form.Group widths='equal'>
                                    <Form.Input placeholder="write your message" type='text' label="Message" name='currentMessage' value={this.state.currentMessage} onChange={this.handleChange} />
                                    <Button content='Reply' labelPosition='left' icon='send' primary />
                                </Form.Group>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Card>
        );
    }
}

export default ChatWindow;
