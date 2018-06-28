import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';


class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('./Images/spiro.png')}
        style={{ width: 30, height: 30 }}
      />
    );
  }
}


class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <LogoTitle />,
      headerRight: (
        <Button
          onPress={navigation.getParam('increaseCount')}
          title="+1"
          color="#fff"
        />
      ),
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ increaseCount: this._increaseCount });
  }

  state = {
    count: 0
  };

  _increaseCount = () => {
    this.setState({ count: this.state.count + 1 });

    console.log(this.state.count);
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title='Go to Details' onPress={
          () => this.props.navigation.navigate('Details',
            {
              itemId: 86,
              otherParam: 'anything you want here'
            })} />
      </View>
    );
  }
}




class DetailsScreen extends React.Component {

  static navigationOptions = ({ navigation, navigationOptions }) => {

    const { params } = navigation.state;

    return {
      title: params ? params.otherParam : 'A Nested Details Screen',
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor
    };
  };


  render() {

    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');


    return (
      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>

        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>

        <Button
          title="Go to Details... again"
          onPress={() =>
            this.props.navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />

        <Button
          title="Update the title"
          onPress={() => this.props.navigation.setParams({ otherParam: 'Updated!' })}
        />

      </View>

    );
  }
}







const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'green'
      },
      headerTintColor: 'red',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }


  });


export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}