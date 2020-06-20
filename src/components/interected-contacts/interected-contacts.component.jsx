import React from 'react';
import { Image, List, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUsers } from "../../redux/messages/messages.selectors";

class InterectedContacts extends React.Component {

    render() {
        return (
            <Segment style={{ overflow: 'auto', height: 400 }}>
                <List divided relaxed size="huge" animated verticalAlign='middle'>
                    {
                        this.props.users.map(user => (
                            <List.Item>
                                <Image avatar src='../images/avatar/matt.jpg' />
                                <List.Content>
                                    <List.Header>{user}</List.Header>
                                </List.Content>
                            </List.Item>)
                        )
                    }
                </List>
            </Segment>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    users: selectUsers
})

export default connect(mapStateToProps)(InterectedContacts);
