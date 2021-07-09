import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, Vibration, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

export default function App() {
  const [workMinute, setWorkMinute] = useState(5);
  const [workSecond, setWorkSecond] = useState(0);
  const [currentWorkMinute, setCurrentWorkMinute] = useState(5);
  const [currentWorkSecond, setCurrentWorkSecond] = useState(0);
  const [currentBreakMinute, setCurrentBreakMinute] = useState(5);
  const [currentBreakSecond, setCurrentBreakSecond] = useState(0);
  const [breakMinute, setBreakMinute] = useState(5);
  const [breakSecond, setBreakSecond] = useState(0);
  let [state, setState] = useState('Pause');
  let [timer, setTimer] = useState('Work');
  useEffect(() => {
    let interval = null;
     interval = setInterval(() => {
      if (state == 'Pause') {
      if (workSecond == 0)   (setWorkSecond(60), setWorkMinute(workMinute - 1))
      setWorkSecond(workSecond => workSecond - 1)
      if (workSecond == 0 && workMinute == 0){
        Vibration.vibrate()
        workBreak()



      }
    }

    }, 1000);
    return () => clearInterval(interval);
  });
  const pauseStart = () => {
    state == 'Pause' ?  setState('Start') : setState('Pause')
  }
  const workBreak = () => {
    if(timer == "Work"){
      setTimer('Break')
      setWorkMinute(currentBreakMinute)
      setWorkSecond(currentBreakSecond)
    }
    else{
      setTimer('Work')
      setWorkMinute(currentWorkMinute)
      setWorkSecond(currentWorkSecond)
    }
  }
  const reset = () => {
    if(timer == "Work"){
    setState('Start');
    setWorkMinute(currentWorkMinute)
    setWorkSecond(currentWorkSecond)
    }

  else{
    setState('Start');
    setWorkMinute(currentBreakMinute)
    setWorkSecond(currentBreakSecond)
  }
}
  return (

    <View style = {styles.background}>
    <View style={styles.box1}>
      <Text style = {styles.title}>My Pomodoro Timer</Text>
      <StatusBar style="auto" />
    </View>
    <View style={styles.box2}>
    <Text style = {styles.box1text}>{timer} Timer</Text>
      <Text style = {styles.box2text}> {Number(workMinute) + Number(Math.floor(workSecond / 60))}:{(workSecond % 60) > 9  ? workSecond % 60 : '0' + workSecond % 60}</Text>
      <StatusBar style="auto" />
      <View style = {styles.box2buttons}>
      <TouchableOpacity onPress={pauseStart}>
      <Text style = {styles.buttontext}>{state} </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={reset}>
      <Text style = {styles.buttontext}>Reset </Text>
      </TouchableOpacity>
      </View>
    </View>
    <KeyboardAvoidingView
         behavior={"height"}
         style = {styles.background}
       >
    <View style={styles.box3}>
     <View style = {styles.work}>
    <Text style={styles.worktext}> Work Mins: </Text>
    <TextInput
       style={styles.textInput} keyboardType='numeric' textAlign={'center'} onChangeText={(workMinute) => {

         setCurrentWorkMinute(workMinute);

         if(timer == 'Work'){
           setWorkMinute(workMinute);
           setWorkSecond(currentWorkSecond);
         setState('Start');
       }


     }}
         defaultValue = '5'/>

      <Text style={styles.worktext}> seconds: </Text>
      <TextInput
         style={styles.textInput} keyboardType='numeric' textAlign={'center'} onChangeText={(workSecond) =>
            {
              setCurrentWorkSecond(workSecond);

              if(timer == 'Work'){
                setWorkSecond(workSecond);
                setWorkMinute(currentWorkMinute);
              setState('Start');
            }
}} defaultValue = '0'/>
      </View>
      <View style = {styles.work}>
     <Text style={styles.worktext}> Break Mins: </Text>
     <TextInput
        style={styles.textInput} keyboardType='numeric' textAlign={'center'} onChangeText={(breakMinute) => {
         setCurrentBreakMinute(breakMinute);

         if(timer == 'Break'){
           setWorkMinute(breakMinute);
           setWorkSecond(currentBreakSecond);
         setState('Start');
       }

     }}  defaultValue = '5'/>

       <Text style={styles.worktext}> seconds: </Text>
       <TextInput
          style={styles.textInput} keyboardType='numeric' textAlign={'center'} onChangeText={(breakSecond) => {
           setCurrentBreakSecond(breakSecond);
           if(timer == 'Break'){
             setWorkSecond(breakSecond);
             setWorkMinute(currentBreakMinute);
           setState('Start');
         }

        }} defaultValue = '0'/>
       </View>
      <StatusBar style="auto" />
    </View>
    </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#224',

  },
  container: {
    flex: 1
  },

  title: {
    fontSize: 40,
    color: "#ff0"

  },

  box1: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box3: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  box1text: {
    padding: 15,
    fontSize: 30,
    color: '#fff',

  },
  box2text: {
    fontSize: 70,
    color: '#fff',
    fontWeight: 'bold',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flex: 0.5

  },
  box2buttons: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#eee',
  },
  buttontext: {
     padding: 15,
     fontSize: 20,
     borderColor: 'black',
     color: '#224',
     backgroundColor: 'white'

  },
  work: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10
  },
  worktext: {
    fontSize: 20,
    color: 'white'

  },
  textInput: {
    flex:0.4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white'
  }
});
