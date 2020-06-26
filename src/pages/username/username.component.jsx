import React from 'react'
import { Form, Input, Modal } from 'semantic-ui-react'
import { setLoggedUser } from '../../redux/details/details.actions'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Username extends React.Component {

    state = { username: '', open: true }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { history } = this.props
        const { username } = this.state
        this.setState({ username, open: false }, () => {
            this.props.setLoggedUser(this.state.username)
            history.push('/home')
        })
    }

    render() {
        const { username, open } = this.state
        return (

            <Modal open={open} closeOnEscape='false'
                closeOnDimmerClick='false'>
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

        )
    }
}

const mapDispatchToProps = dispatch => ({
    setLoggedUser: user => dispatch(setLoggedUser(user))
})

export default withRouter(connect(null, mapDispatchToProps)(Username));