import React from 'react'
import { Form, Input } from 'semantic-ui-react'
import { setLoggedUser } from '../../redux/details/details.actions'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Username extends React.Component {

    state = { username: '' }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { history } = this.props
        const { username } = this.state
        this.setState({ username }, () => {
            this.props.setLoggedUser(this.state.username)
            history.push('/home')
        })
    }

    render() {
        const { username } = this.state
        return (
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
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setLoggedUser: user => dispatch(setLoggedUser(user))
})

export default withRouter(connect(null, mapDispatchToProps)(Username));