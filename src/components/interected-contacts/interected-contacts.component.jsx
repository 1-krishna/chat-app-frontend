import React from 'react';
import { Image, List, Segment, Icon, Modal, Form, Input } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUsers } from "../../redux/messages/messages.selectors";
import { setCurrentlyOpenUser } from "../../redux/details/details.actions";
import { selectCurrentlyOpenUser, selectLoggedUser } from "../../redux/details/details.selectors";

class InterectedContacts extends React.Component {
    state = { username: '', open: false }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleClick(user) {
        this.props.setCurrentlyOpenUser(user);
    }

    handleSubmit = () => {
        const { username } = this.state
        this.setState({ username: '', open: false }, () => {
            this.props.setCurrentlyOpenUser(username);
        })
    }

    render() {
        const { username, open } = this.state
        return (
            <Segment style={{ overflow: 'auto', height: 400 }}>
                <Modal open={open}>
                    <Modal.Header>Enter username</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group inline>
                                <Form.Field required width={12}>
                                    <Input name='username'
                                        value={username}
                                        onChange={this.handleChange}
                                        placeholder='Enter username' />
                                </Form.Field>
                                <Form.Button floated='right' width={4}>Save</Form.Button>
                            </Form.Group>
                        </Form>
                    </Modal.Content>
                </Modal>
                <List size='small' verticalAlign='top'>
                    <List.Item onClick={() => { }}>
                        <List.Content floated='right'>
                            <Icon onClick={() => this.setState({ open: true })} size='big' name='user plus' />
                        </List.Content>
                    </List.Item>
                </List>
                <List relaxed size="huge" animated verticalAlign='middle'>
                    {
                        this.props.users.map(
                            (user, idx) => {
                                if (user !== this.props.fromUser) {
                                    return (
                                        <List.Item onClick={() => this.handleClick(user)} key={idx}>
                                            <Image avatar src='../images/avatar/matt.jpg' />
                                            <List.Content>
                                                <List.Header>{user}</List.Header>
                                            </List.Content>
                                        </List.Item>
                                    )
                                }
                                return null
                            }
                        )
                    }
                </List>
            </Segment>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    users: selectUsers,
    fromUser: selectLoggedUser,
    toUser: selectCurrentlyOpenUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentlyOpenUser: user => dispatch(setCurrentlyOpenUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(InterectedContacts);
