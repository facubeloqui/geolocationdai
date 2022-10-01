import * as React from 'react';
import MapView, {Callout, Marker, Circle} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [Pin, setPin] = React.useState({
    latitude: -34.6099800945476,
    longitude: -58.42915571289408
  });
  React.useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);

      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      })

    })();
  }, []);
  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      initialRegion={{
        latitude: -34.6099800945476,
        longitude: -58.42915571289408,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation={true}
      onUserLocationChange= {(e)=>{
        console.log("onUserLocationChange", e.nativeEvent.coordinate);

        setPin({
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude
        })
      }}
      >
        <Marker coordinate={Pin}
        title='Clase de Polshu'
        description='Depende quienes vayan'
        pinColor='gold'
        draggable={true}
        onDragStart={(e)=>{
          console.log('Drag Start', e.nativeEvent.coordinate);
        }}
        onDragEnd={(e)=>{
          console.log('Drag End', e.nativeEvent.coordinate);
          setPin({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude
          })
        }}
        >
          <Callout>
            <Text>Depende quienes vayan</Text>
          </Callout>
        </Marker>
        <Circle center={Pin}
        radius={100}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});