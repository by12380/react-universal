import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { connect } from "react-redux";
import { isAuthenticatedAsync, logOutAsync } from '../services/authService';
import { getUserProfileFromAuth0Async } from '../services/userService';

import { MonoText } from '../components/StyledText';

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: null,
      picture: null
    }
  }

  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    const profile = await getUserProfileFromAuth0Async();
    this.setState({
      name: profile.name,
      picture: profile.picture
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            {this.state.picture
            ? <Image
                source={{uri: this.state.picture}}
                style={styles.welcomeImage}
              />
            : null}
          </View>

          <View style={styles.getStartedContainer}>
            {this.state.name
              ? <Text style={styles.getStartedText}>
                  Welcome, {this.state.name}
                </Text>
              : null}
          </View>
          <Button onPress={this._onLogOut} title='Logout'></Button>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View>
      </View>
    );
  }

  _onLogOut = async () => {
    await logOutAsync();
    this.props.navigation.navigate('LogIn');
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  welcomeImage: {
    borderRadius: 50,
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
});


const mapStateToProps = (state) => {

  return {
  };

};

export default connect(mapStateToProps)(HomeScreen);
