import React from 'react';
import { Image, List, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUsers } from "../../redux/messages/messages.selectors";
import { setCurrentlyOpenUser } from "../../redux/details/details.actions";
import { selectCurrentlyOpenUser, selectLoggedUser } from "../../redux/details/details.selectors";

class InterectedContacts extends React.Component {

    handleClick(user) {
        this.props.setCurrentlyOpenUser(user);
    }

    render() {
        return (
            <Segment style={{ overflow: 'auto', height: 400 }}>
                <List divided relaxed size="huge" animated verticalAlign='middle'>
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
