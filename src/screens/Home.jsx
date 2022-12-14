import delay from 'delay';
import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Text, View, Image, StatusBar, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import Btn from './_components/Btn';
import Navbar from './_components/Navbar';
import { setRadius, setBtn, setFriends } from '../redux/features/formSearch';

function Home(props) {
  const { navigation } = props;
  const [range, setRange] = useState(1);
  const [showNav, setShowNav] = useState(false);
  const dispatch = useDispatch();
  const formSearch = useSelector((state) => state.formSearch);

  // Handle press events.
  const press = {
    navToggle() {
      setShowNav(!showNav);
    },

    async searchFriends() {
      const url = `/api/friends?radius=${formSearch.form.radius}`;
      dispatch(setBtn({ disabled: true, value: 'Mencari...' }));
      await axios.get(url).then(({ data }) => {
        dispatch(setFriends(data.friends));
      });
      navigation.navigate('Maps');
      await delay(250);
      dispatch(setBtn({ disabled: false, value: 'Cari Teman' }));
    },
  };

  return (
    <View className="flex-1 bg-white pt-8" style={{ position: 'relative' }}>

      <StatusBar style="dark" />

      <Navbar navigation={navigation} showNav={showNav} />

      <View className="flex-row items-center w-full justify-between py-2 px-6">
        <Image className="w-11 h-11" source={require('../assets/finally.png')} />
        <TouchableOpacity activeOpacity={0.4} onPress={press.navToggle}>
          <MaterialIcons name={(!showNav) ? 'menu' : 'close'} size={35} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView className="px-6">
        <Text className="text-center text-2xl pt-14" style={style.textBanner}>
          Tentukan jarak pencarian anda! Anda dapat menjangkau hingga radius 100 KM.
        </Text>

        <View className="items-center justify-center pt-10">
          <Image style={style.radar} source={require('../assets/radar.gif')} />
          <Text style={style.textRadius} className="text-xl">
            {`${range} KM`}
          </Text>
        </View>

        <View className="w-full pt-16 pb-4">
          <Slider
            className="w-11/12 h-10"
            thumbTintColor="#FB4911"
            minimumValue={1}
            step={1}
            maximumValue={100}
            minimumTrackTintColor="#FCAF39"
            maximumTrackTintColor="#D9D9D9"
            value={formSearch.form.radius}
            onValueChange={setRange}
            onSlidingComplete={((value) => dispatch(setRadius(value)))}
          />
        </View>

        <View>
          <Btn
            disabled={formSearch.btn.disabled}
            text={formSearch.btn.value}
            click={press.searchFriends}
          />
        </View>

      </ScrollView>

    </View>
  );
}

const style = StyleSheet.create({
  textBanner: {
    fontFamily: 'Urbanist-Medium',
    lineHeight: 30,
    color: '#212121',
  },
  radar: {
    width: 220,
    height: 220,
  },
  textRadius: {
    position: 'absolute',
    top: 134,
  },
});

export default Home;
