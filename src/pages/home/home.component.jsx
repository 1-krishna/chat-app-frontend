import React from "react";
import ChatWindow from "../../components/chat-window/chat-window.component";
import InterectedContacts from "../../components/interected-contacts/interected-contacts.component";
import { Grid, Segment } from 'semantic-ui-react'

class Home extends React.Component {

    render() {
        return (<div>
            <h1 align="center">Chat App</h1>
            <Segment>
                <Grid>
                    <Grid.Row stretched>
                        <Grid.Column width={6}>
                            <InterectedContacts />
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <ChatWindow />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </div>
        );
    }
}

export default Home;