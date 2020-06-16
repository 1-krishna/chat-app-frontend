import React from 'react';
import { Image, List, Card } from 'semantic-ui-react'
class InterectedContacts extends React.Component {

    render() {
        return (
            <Card fluid>
                <List animated verticalAlign='middle'>
                    <List.Item>
                        <Image avatar src='../images/avatar/matt.jpg' />
                        <List.Content>
                            <List.Header>Helen</List.Header>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <Image avatar src='../images/avatar/matt.jpg' />
                        <List.Content>
                            <List.Header>Christian</List.Header>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <Image avatar src='../images/avatar/matt.jpg' />
                        <List.Content>
                            <List.Header>Daniel</List.Header>
                        </List.Content>
                    </List.Item>
                </List>
            </Card>
        );
    }
}

export default InterectedContacts;
