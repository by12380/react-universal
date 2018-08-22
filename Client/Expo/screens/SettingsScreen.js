import React from 'react';
import { connect } from "react-redux";
import { ExpoConfigView } from '@expo/samples';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <ExpoConfigView />;
  }
}

export default connect()(SettingsScreen);
