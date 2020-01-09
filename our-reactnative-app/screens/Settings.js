import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  Alert,
  Slider,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AsyncStorage } from "react-native";
import axios from 'axios';
import { Card, ListItem, Button, Divider, Tooltip, Text } from 'react-native-elements'



const ip_address = 'nosqueeze.herokuapp.com'
const serverURL = 'http://' + ip_address + ':80';
const http = axios.create({
  baseURL: serverURL,
});
const sampleNUSMODS = 'https://nusmods.com/timetable/sem-1/share?CS2100=LAB:09,TUT:03,LEC:1&CS2101=&CS2102=TUT:08,LEC:1&CS2103T=LEC:G13&GEH1074=TUT:W04,LEC:1'

const DATA = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
      },
];

function Item({ message, username }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{username} : {message}</Text>
    </View>
  );
}

export class Settings extends Component {
  constructor(props) {
    super(props);

    this.retrieveData();
    let emptyMap = new Map();
    emptyMap.set('day', " ");
    emptyMap.set('startTime', " ");
    emptyMap.set('endTime', " ");
    emptyMap.set('venue', " ");
    emptyMap.set('module', "No TimeTable Entered yet!");
    emptyMap.set('compare', " ");
    emptyMap.set('view', 'Empty');
    emptyMap.set('type', " ");
    global.timeTable = [];
    global.monday = [];
    global.tuesday = [];
    global.wednesday = [];
    global.thursday = [];
    global.friday = [];
    global.monday.push(emptyMap)
    global.tuesday.push(emptyMap)
    global.wednesday.push(emptyMap)
    global.thursday.push(emptyMap)
    global.friday.push(emptyMap)

    global.mondayNavigate = 'None';
    global.tuesdayNavigate = 'None';
    global.wednesdayNavigate = 'None';
    global.thursdayNavigate = 'None';
    global.fridayNavigate = 'None';
    global.defaultDay ='None',

    global.monday2 = [];
    global.tuesday2 = [];
    global.wednesday2 = [];
    global.thursday2 = [];
    global.friday2 = [];

    global.distance1 = 5;
    global.distance1 = 5;

    global.fridayInit = false;
    this.state = {
      
      distance1: 5,
      distance2: 5,
      minDistance: 0,
      maxDistance: 10,
      pointsLeft: 0,
      moduleInput: 'https://nusmods.com/timetable/sem-2/share?ACC1002=LEC:V1,TUT:V07&CG2028=LAB:01,TUT:03,LEC:01&CS1010S=REC:11,LEC:1,TUT:11&EG1311=LAB:01,LEC:01&GES1000=SEC:A1&MA1102R=TUT:11,LAB:3,LEC:1&UTC1102C=SEM:1&UTC1112A=SEM:1&UTC1119=SEM:2',
      timetable: ['hi'],
    };
  }

  componentWillMount() {
    this.startHeaderHeight = 50;
    if (Platform.OS == 'android') {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem(
        '@MySuperStore:key1',
        this.state.distance1.toString()
      );
    } catch (error) {
      // Error saving data
    }

    try {
      await AsyncStorage.setItem(
        '@MySuperStore:key2',
        this.state.distance2.toString()
      );
    } catch (error) {
      // Error saving data
    }
    global.distance1 = this.state.distance1;
    global.distance2 = this.state.distance2;

    alert('Successfully updated user preferences!');
  };

  retrieveData = async () => {
    try {
      const value1 = await AsyncStorage.getItem('@MySuperStore:key1');
      if (value1 !== null) {
        // We have data!!
        this.setState({ distance1: parseInt(value1) });
      }
    } catch (error) {
      // Error retrieving data
    }

    try {
      const value2 = await AsyncStorage.getItem('@MySuperStore:key2');
      if (value2 !== null) {
        // We have data!!
        this.setState({ distance2: parseInt(value2) });
      }
    } catch (error) {
      // Error retrieving data
    }

    global.distance1 = this.state.distance1;
    global.distance2 = this.state.distance2;
  };

  makeIntoString(objectInput) {
    return JSON.stringify(objectInput);
  }

  printModCode() {
    Alert.alert('TimeTable Updated! Click any of the days to refresh');
    return this.parseNusModsLink(this.state.moduleInput);
  }

  parseModule(inputModule) {
    //represent each module as a map
    //each map has the following keys and entries:
    //module_Code = {the module name}
    //TUT,LEC,LAB,SEC,REC, each giving the respective number
    let myModuleMap = new Map();
    //split by = to give the mod code in [0] and the classes in [1]
    let splitModule = inputModule.split('=');
    let moduleName = splitModule[0];
    myModuleMap.set('module_Code', moduleName);
    if (splitModule.length == 1) {
      //this basically means that the module has no classes
      return myModuleMap;
    }
    let classes = splitModule[1];
    let myClassesSplit = classes.split(',');
    //split into the name of the class
    //like: TUT LEC LAB SEC REC
    let length = myClassesSplit.length;
    for (let i = 0; i < length; i++) {
      let currClass = myClassesSplit[i];
      let currClassSplit = currClass.split(':');
      myModuleMap.set(currClassSplit[0], currClassSplit[1]);
    }
    return myModuleMap;
  }

  parseNusModsLink(link) {
    //myModules is an array of each "module" --> refer to parseModule
    let myModules = [];
    //Take the NUS MODS link and remove the useless stuff

    let startIndex = link.indexOf('?') + 1;
    let linkWithoutHTTPS = link.substring(startIndex);
    //split by & to get an array of the string of each module
    let modulesString = linkWithoutHTTPS.split('&');
    let length = modulesString.length;
    //for each module string, parse it and add to the myModules array as a module
    for (let i = 0; i < length; i++) {
      let currModule = this.parseModule(modulesString[i]);
      myModules.push(currModule);
    }
    return myModules;
  }
  //returns an array of the modules, in which each module
  //is represented as a map of key value pairs
  //"module_Code" is the key to the module
  //rest are "LAB","TUT","LEC","SEC"

  // https://nusmods.com/timetable/sem-1/share?
  // CS2100=LAB:09,TUT:03,LEC:1&CS2101=&CS2102=TUT:08,
  // LEC:1&CS2103T=LEC:G13&GEH1074=TUT:W04,LEC:1

  onGetModule() {
    
    let moduleArray = this.printModCode();
    //moduleArray is the parse array of all modules,
    //where each module is represented as a map
    //each map contains module_Code and classes
    let myArrayOfModules = [];
    global.monday = [];
    global.tuesday = [];
    global.wednesday = [];
    global.thursday = [];
    global.friday = [];

    global.monday2 = [];
    global.tuesday2 = [];
    global.wednesday2 = [];
    global.thursday2 = [];
    global.friday2 = [];

    for (let i = 0; i < moduleArray.length; i++) {
      let myCurrentModuleMap = new Map();
      //this map is the final version of each module,
      //with all the relevant info
      let currentModuleBeingAdded = moduleArray[i];
      let moduleName = currentModuleBeingAdded.get('module_Code');
      myCurrentModuleMap.set('module_Code', moduleName);
      //So set the module code for this map
      http
        .get(serverURL + '/Timetable/' + moduleName, {
          moduleCode: moduleName,
        }) //get this module info from NUS mods api
        .then(response => this.handleResponse(response))
        .then(response => {
          //so with this response, we have the timetable
          //in the timetable, we have an array of all the classes
          //so you access each class with array notation
          //then, you access the info inside each class
          //using object notation (x.y)
          let numberOfClassesInThisModule = response.length;
          let tutClass = currentModuleBeingAdded.get('TUT');

          let labClass = currentModuleBeingAdded.get('LAB');

          let sectClass = currentModuleBeingAdded.get('SEC');

          let lectClass = currentModuleBeingAdded.get('LEC');

          if (global.monday.length == 0){
              let emptyMap = new Map();
              emptyMap.set('view', 'Empty');
              emptyMap.set('module', "No Lesson On Monday!");
              emptyMap.set('day', " ");
              emptyMap.set('startTime', " ");
              emptyMap.set('endTime', " ");
              emptyMap.set('venue', " ");
              emptyMap.set('compare', " ");
              emptyMap.set('type', " ");
              global.monday.push(emptyMap);
		  }
          if (global.tuesday.length == 0){
              let emptyMap = new Map();
              emptyMap.set('view', 'Empty');
              emptyMap.set('module', "No Lesson On Tuesday!");
              emptyMap.set('day', " ");
              emptyMap.set('startTime', " ");
              emptyMap.set('endTime', " ");
              emptyMap.set('venue', " ");
              emptyMap.set('compare', " ");
              emptyMap.set('type', " ");
              global.tuesday.push(emptyMap);
		  }
          if (global.wednesday.length == 0){
              let emptyMap = new Map();
              emptyMap.set('view', 'Empty');
              emptyMap.set('module', "No Lesson On Wednesday!");
              emptyMap.set('day', " ");
              emptyMap.set('startTime', " ");
              emptyMap.set('endTime', " ");
              emptyMap.set('venue', " ");
              emptyMap.set('compare', " ");
              emptyMap.set('type', " ");
              global.wednesday.push(emptyMap);
		  }
          if (global.thursday.length == 0){
              let emptyMap = new Map();
              emptyMap.set('view', 'Empty');
              emptyMap.set('module', "No Lesson On Thursday!");
              emptyMap.set('day', " ");
              emptyMap.set('startTime', " ");
              emptyMap.set('endTime', " ");
              emptyMap.set('venue', " ");
              emptyMap.set('compare', " ");
              emptyMap.set('type', " ");
              global.thursday.push(emptyMap);
		  }
          if (global.friday.length == 0){
              let emptyMap = new Map();
              emptyMap.set('view', 'Empty');
              emptyMap.set('module', "No Lesson On Friday!");
              emptyMap.set('day', " ");
              emptyMap.set('startTime', " ");
              emptyMap.set('endTime', " ");
              emptyMap.set('venue', " ");
              emptyMap.set('compare', " ");
              emptyMap.set('type', " ");
              global.friday.push(emptyMap);
		  }
          for (let j = 0; j < numberOfClassesInThisModule; j++) {
            let currClass = response[j];
            let classNumber = currClass.classNo;
            let classType = currClass.lessonType;

            let myMap = new Map();
            myMap.set('day', currClass.day);
            myMap.set('startTime', currClass.startTime);
            myMap.set('endTime', currClass.endTime);
            myMap.set('venue', currClass.venue);
            myMap.set('module', moduleName);
            myMap.set('compare', parseInt(currClass.startTime));
            myMap.set('view', 'Category');

            if (classNumber == tutClass && classType == 'Tutorial') {
              myMap.set('type', 'Tutorial');
            } else if (classNumber == labClass && classType == 'Laboratory') {
              myMap.set('type', 'Lab');
            } else if (classNumber == sectClass && classType == 'Sectional') {
              myMap.set('type', 'Sectional');
            } else if (classNumber == lectClass && classType == 'Lecture') {
              myMap.set('type', 'Lecture');
            } else {
              continue;
            }
            if (currClass.day == 'Monday') {
              if (global.monday.length == 1 && global.monday[0].get('view') == 'Empty'){
                global.monday = [];     
			  }
              global.monday.push(myMap);
            } else if (currClass.day == 'Tuesday') {
              if (global.tuesday.length == 1 && global.tuesday[0].get('view') == 'Empty'){
                global.tuesday = [];     
			  }
              global.tuesday.push(myMap);
            } else if (currClass.day == 'Wednesday') {
              if (global.wednesday.length == 1 && global.wednesday[0].get('view') == 'Empty'){
                global.wednesday = [];     
			  }
              global.wednesday.push(myMap);
            } else if (currClass.day == 'Thursday') {
                if (global.thursday.length == 1 && global.thursday[0].get('view') == 'Empty'){
                global.thursday = [];     
			  }
              global.thursday.push(myMap);
            } else if (currClass.day == 'Friday') {
                if (global.friday.length == 1 && global.friday[0].get('view') == 'Empty'){
                global.friday = [];     
			  }
              global.friday.push(myMap);
            }
          }
          myArrayOfModules.push(myCurrentModuleMap);
          return myCurrentModuleMap;
        })
        .then(hello => {
          this.setState({ timetable: myArrayOfModules });
          global.timeTable = myArrayOfModules;

          global.monday.sort(this.comparatorHere);
          global.tuesday.sort(this.comparatorHere);
          global.wednesday.sort(this.comparatorHere);
          global.thursday.sort(this.comparatorHere);
          global.friday.sort(this.comparatorHere);

          return myArrayOfModules;
        })
        .catch(err => console.log(err));

        
    }

  }

  comparatorHere(a, b) {
    return a.get('compare') - b.get('compare');
  }

  handleResponse = response => {
    if (response.data.semesterData.length > 1) {
      this.setState({
        timetable: response.data.semesterData[1].timetable,
      });
      return response.data.semesterData[1].timetable;
    } else {
      this.setState({
        timetable: response.data.semesterData[0].timetable,
      });
      return response.data.semesterData[0].timetable;
    }

    //Return the timetable for this semester (2)
    //timetable contains all the classes
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
         <View
          style={{
            height: this.startHeaderHeight,
            backgroundColor: 'purple',
            borderBottomWidth: 1,
            borderBottomColor: '#dddddd',
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Text
              style={{ fontWeight: '700', paddingLeft: 175, paddingTop: 20, paddingBottom: 20, color: 'white',textAlign: 'center'}}
            >Settings</Text>
          </View>
        </View>

        <ScrollView scrollEventThrottle={16} style={{}}>
          <View style={{ flex: 1, paddingTop: 5 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                paddingHorizontal: 5,
              }}>
              Preferences
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                paddingHorizontal: 5,
              }}>
              Paste your NusMods sharing link in the box below:
            </Text>

            <View style={{ flex: 1, paddingHorizontal: 5 }}>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="https://nusmods.com/timetable/sem-2/share?ACC1002=LEC:V1,TUT:V07&CG2028=LAB:01,TUT:03,LEC:01&CS1010S=REC:11,LEC:1,TUT:11&EG1311=LAB:01,LEC:01&GES1000=SEC:A1&MA1102R=TUT:11,LAB:3,LEC:1&UTC1102C=SEM:1&UTC1112A=SEM:1&UTC1119=SEM:2"
                placeholderTextColor="black"
                onChangeText={moduleInput => this.setState({ moduleInput })}
                style={{
                  height: 40,
                  borderColor: 'gray',
                  borderWidth: 1,
                  paddingHorizontal: 5,
                }}
              />

              <Button
                style={{ marginHorizontal: 10, marginVertical: 10 }}
                title="Update timetable"
                backgroundColor="purple"
                color="white"
                onPress={() =>
                    {
                      global.mondayNavigate = 'Monday';
                      global.tuesdayNavigate = 'Tuesday';
                      global.wednesdayNavigate = 'Wednesday';
                      global.thursdayNavigate = 'Thursday';
                      global.fridayNavigate = 'Friday';
                      global.defaultDay ='Monday',
                      this.onGetModule();
                      this.props.navigation.navigate('Timetable', {
                        myArray: this.state.timetable,});
                    }
                }
              />
            </View>

            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                paddingHorizontal: 5,
              }}>
              Allocate importance points(10 total) among the two conditions
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                paddingHorizontal: 5,
                paddingTop: 5,
              }}>
            </Text>

            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                paddingHorizontal: 5,
              }}>
              Hate crowds? Walk!
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                paddingHorizontal: 5,
              }}>
              Hate walking? Take the bus! 
            </Text>

            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                paddingHorizontal: 5,
                paddingTop: 5,
              }}>
            </Text>

            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'stretch',
                marginLeft: 5,
                marginRight: 5,
                borderWidth: 0.5,
                borderColor: '#dddddd',
              }}>

              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch', padding: 5 }}>
                  <View style={{ flex: 1, padding: 5 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '700',
                      }}>
                      Loves Crowd
                    </Text>
                  </View>
                  <View style={{ flex: 1, padding: 5 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '700',
                        paddingLeft: 90,
                      }}>
                      Hates Crowd
                    </Text>
                  </View>
              </View>

              <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'stretch',
                marginLeft: 5,
                marginRight: 5,
              }}>
                  <View style={{ flex: 1, padding: 5 }}>
                    <Icon name={'users'} size={40} color="F19F86" />
                  </View>
                  <View style={{ flex: 5 }}>
                    <Slider
                      style={{ flex: 1, height: 10 }}
                      step={1}
                      minimumValue={this.state.minDistance}
                      maximumValue={this.state.maxDistance}
                      value={this.state.distance1}
                      onValueChange={val => {
                        this.setState({ distance1: val });
                        this.setState({ distance2:  this.state.maxDistance - val });
                      }}
                      onSlidingComplete={val => {
                        if (val + this.state.distance2 > this.state.maxDistance) {
                          this.setState({ distance1: 5 });
                          this.setState({ distance2: 5 });
                        }
                        if (this.state.distance1 < 0 || this.state.distance2 < 0) {
                          this.setState({ distance1: 5 });
                          this.setState({ distance2: 5 });
                        }
                      }}
                      thumbTintColor="#376DCF"
                      maximumTrackTintColor="#d3d3d3"
                      minimumTrackTintColor="grey"
                    />
                    <View style={styles.textCon}>
                      <Text style={styles.colorGrey}>{this.state.minDistance}</Text>
                      <Text style={styles.colorYellow}>{this.state.distance1}</Text>
                      <Text style={styles.colorGrey}>{this.state.maxDistance}</Text>
                    </View>
                  </View>
                  <View style={{ flex: 1, padding: 5 }}>
                    <Icon name={'user'} size={40} color="F19F86" />
                  </View>
            </View>
            </View>
            

            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'stretch',
                marginLeft: 5,
                marginRight: 5,
                borderWidth: 0.5,
                borderColor: '#dddddd',
              }}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch', padding: 5 }}>
                  <View style={{ flex: 1, padding: 5 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '700',
                      }}>
                      Loves Walking
                    </Text>
                  </View>
                  <View style={{ flex: 1, padding: 5 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '700',
                        paddingLeft: 90,
                      }}>
                      Hates Walking
                    </Text>
                  </View>
              </View>

              <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'stretch',
                marginLeft: 5,
                marginRight: 5
              }}>
              <View style={{ flex: 1, padding: 5 }}>
                <Icon name={'street-view'} size={40} color="F19F86" /> 
              </View>
              <View style={{ flex: 5 }}>
                <Slider
                  style={{ flex: 1, height: 20 }}
                  step={1}
                  minimumValue={this.state.minDistance}
                  maximumValue={this.state.maxDistance}
                  value={this.state.distance2}
                  onValueChange={val => {
                    this.setState({ distance2: val });
                    this.setState({ distance1:  this.state.maxDistance - val });
                  }}
                  onSlidingComplete={val => {
                    if (val + this.state.distance1 > this.state.maxDistance) {
                      this.setState({ distance1: 5 });
                      this.setState({ distance2: 5 });
                    }
                    if (this.state.distance1 < 0 || this.state.distance2 < 0) {
                      this.setState({ distance1: 5 });
                      this.setState({ distance2: 5 });
                    }

                  }}
                  thumbTintColor="#376DCF"
                  maximumTrackTintColor="#d3d3d3"
                  minimumTrackTintColor="grey"
                />
                <View style={styles.textCon}>
                  <Text style={styles.colorGrey}>{this.state.minDistance}</Text>
                  <Text style={styles.colorYellow}>{this.state.distance2}</Text>
                  <Text style={styles.colorGrey}>{this.state.maxDistance}</Text>
                </View>
              </View>
              <View style={{ flex: 1, padding: 5 }}>
                <Icon name={'bus'} size={40} color="F19F86" />
              </View>
            </View>
              
            </View>

            

            <Button
              style={{ marginHorizontal: 10, marginVertical: 10 }}
              title="Update Preferences"
              backgroundColor="purple"
              onPress={() => this.storeData()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  textCon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorGrey: {
    marginLeft: 10,
    marginRight: 10,
    color: '#d3d3d3',
  },
  colorYellow: {
    color: 'rgb(252, 228, 149)',
  },
});
export default Settings;
