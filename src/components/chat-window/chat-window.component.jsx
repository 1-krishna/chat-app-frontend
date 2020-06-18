import React from 'react';
import io from 'socket.io-client';
import { Comment, Form, Grid, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectMessages } from "../../redux/messages/messages.selectors";
import { setMessages } from "../../redux/messages/messages.actions";


class ChatWindow extends React.Component {
    state = {
        messages: [],
        currentMessage: '',
        fromUser: '',
        toUser: ''
    }

    componentDidMount() {
        while (!this.fromUser) {
            let fromUserInput = prompt('Who are you?')
            this.fromUser = fromUserInput;
        }

        while (!this.toUser) {
            let toUserInput = prompt('To whom are you sending?')
            this.toUser = toUserInput;
        }
        this.socket = io('http://localhost:4000');
        this.socket.on(`${this.fromUser}`, incomingMessage => {
            console.log(incomingMessage)
            this.setState({
                messages: [...this.state.messages, incomingMessage]
            }, () => this.scrollToBottom())
        })
        this.setState({
            fromUser: this.fromUser,
            toUser: this.toUser
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
        }, () => {
            this.props.setMessages(this.state.messages)
            this.scrollToBottom()
        })
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    render() {
        return (
            <div>
                <h3>
                    Chat window of "{this.state.fromUser}" sending to "{this.state.toUser}"
                </h3>
                <Segment style={{ overflow: 'auto', height: 350 }}>
                    <Grid>
                        {
                            this.state.messages.map((message, index) => {
                                if (message.type === 'incoming') {
                                    return (
                                        <Grid.Row key={index}>
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
                                        </Grid.Row>
                                    )
                                } else {
                                    return (
                                        <Grid.Row key={index}>
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
                    </Grid>
                    <div style={{ float: "left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </Segment>
                <Segment>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Form reply onSubmit={this.handleSubmit}>
                                    <Form.Group>
                                        <Form.Input width={12} placeholder="write your message" type='text' name='currentMessage' value={this.state.currentMessage} onChange={this.handleChange} />
                                        <Form.Button width={4} floated="right" content='Reply' labelPosition='left' icon='send' primary />
                                    </Form.Group>
                                </Form>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    messages: selectMessages
})

const mapDispatchToProps = dispatch => ({
    setMessages: messages => dispatch(setMessages(messages))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);
