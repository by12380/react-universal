import React from 'react';
import {
    View,
    Button,
    StyleSheet
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { login } from '../actions/authActions';

class LoginScreen extends React.Component {

    componentDidUpdate() {
        this.redirectToHome();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logInContainer}>
                    <Button onPress={this.onLogIn} title='Login'></Button>
                </View>
            </View>
        );
    }

    onLogIn = () => {
        this.props.login();
    }

    redirectToHome = () => {
        if (this.props.isAuthenticated) {
            this.props.navigation.navigate('Main');
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    logInContainer: {
        marginTop: 50
    }
})

const mapStateToProps = (state) => {

    return {
        isAuthenticated:
            new Date().getTime() <
            (state.authReducer.sessionItems ? state.authReducer.sessionItems.expiresAt : null),
    };

};

const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({
        login
    }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
