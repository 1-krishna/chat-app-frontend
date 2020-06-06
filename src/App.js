import React from 'react';
import './App.css';
import io from 'socket.io-client';
import { Button, Comment, Form, Grid, Card } from 'semantic-ui-react'

class App extends React.Component {
  state = {
    messages: [],
    currentMessage: '',
    fromUser: ''
  }

  componentDidMount() {
    while (!this.fromUser) {
      let fromUserInput = prompt('tum kaun ho?')
      this.fromUser = fromUserInput;
      console.log(this.fromUser);
    }

    while (!this.toUser) {
      let toUserInput = prompt('kisko bhej rahe ho?')
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
      type: 'outgoing', // for current user
      data: currentMessage,
      fromUser: this.fromUser,
      toUser: this.toUser
    }

    let msgObjectToBeSent = {
      type: 'incoming', // for other user
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

      <Card fluid centered raised>
        <Grid centered columns={2}>
          <Grid.Column>
            <Comment.Group>
              <Card.Header as='h3' dividing>
                Chat window of {this.state.fromUser}
              </Card.Header>
              <Grid>
                {
                  this.state.messages.map(message => {
                    if (message.type === 'incoming') {
                      return (
                        <Grid.Row>
                          <Grid.Column floated='left' width={10}>
                            <Comment key={message.data}>
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
                        <Grid.Row>
                          <Grid.Column textAlign="right" floated='right' width={10}>
                            <Comment key={message.data}>
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
              <Form reply onSubmit={this.handleSubmit}>
                <Grid>
                  <Grid.Column floated="left" width={12} verticalAlign="bottom">
                    <Form.Field>
                      <label>Message</label>
                      <input placeholder="currentMessage" type='text' name='currentMessage' value={this.state.currentMessage} onChange={this.handleChange} />
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column floated="right" width={4} verticalAlign="bottom">
                    <Form.Field>
                      <Button content='Reply' labelPosition='left' icon='send' primary />
                    </Form.Field>
                  </Grid.Column>
                </Grid>
              </Form>
            </Comment.Group>
          </Grid.Column>
        </Grid>
      </Card>
    );
  }
}

export default App;