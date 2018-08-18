import React from 'react';
import {
    View,
    Button,
    StyleSheet
} from 'react-native';
import { autoLogInAsync, logInAsync, isAuthenticatedAsync } from '../services/authService';

export default class LoginScreen extends React.Component {

    async componentDidMount() {
        await autoLogInAsync();
        if (await isAuthenticatedAsync()) {
            this.props.navigation.navigate('Main');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logInContainer}>
                    <Button onPress={this._onLogIn} title='Login'></Button>
                </View>
            </View>
        );
    }

    _onLogIn = async () => {
        await logInAsync();
        if (await isAuthenticatedAsync()) {
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