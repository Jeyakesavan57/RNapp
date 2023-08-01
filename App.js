

import {React,Component}from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import io from "socket.io-client";

class App extends Component{
  
  constructor(props)
  {
    super(props);

    this.state={
    chatMessage:"",
    chatMessages:[]}
  }
  componentDidMount()
  {
    this.socket=io("http://192.168.208.64:3000")
    console.log("connected with server")
    this.socket.on("chat message", msg=>
    {
      this.setState({chatMessages: [...this.state.chatMessages, msg]});
      console.log("connected")
    });
  }
  submitChatMessage()
  {
this.socket.emit("chat message",this.state.chatMessage);
this.setState({chatMessage:""});
  }
    
  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage=>(<Text key={chatMessage}>{chatMessage} 
  </Text>));
  return(
<ScrollView>
    <View style={styles.container}>
   
    <TextInput 
    style={{height: 40, borderWidth: 2}}
    autocorrect={false}
    value={this.state.chatMessage}
     onSubmitEditing={()=>this.submitChatMessage()} 
     onChangeText={chatMessage=>{this.setState({chatMessage});
     }}/>

     {chatMessages}
  
    </View>
    </ScrollView>
  );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
