import React from "react";
import ChatWindow from "../../components/chat-window/chat-window.component";
import InterectedContacts from "../../components/interected-contacts/interected-contacts.component";
import { Grid, Card } from 'semantic-ui-react'

class Home extends React.Component {

    render() {
        return (<div>
            <ChatWindow />
            <Card.Group fluid>
                <Grid>
                    <Grid.Column width={6}>
                        <InterectedContacts />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <ChatWindow />
                    </Grid.Column>
                </Grid>
            </Card.Group>
        </div>
        );
    }
}

export default Home;