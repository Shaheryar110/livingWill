import {
    Dimensions,
    GestureResponderEvent,
    Pressable,
    View,
    Image,
    ViewStyle,
    StyleSheet,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import Carousel, {Pagination} from 'react-native-snap-carousel';
  
  interface IProps {
    carouselData: string[];
    isLoading?: boolean;
    isLooped?: boolean;
    imageContainerStyle?: ViewStyle;
  }
  
  const {width: screenWidth} = Dimensions.get('window');
  
  const BannerCarousel: React.FC<IProps> = ({
    carouselData,
    imageContainerStyle,
    isLooped = false,
  }) => {
    const [imageAspectRatio, setImageAspectRatio] = useState(3);
    const [slideIndex, setSlideIndex] = React.useState(0);
  
    const carouselRef = React.useRef<Carousel<string>>(null);
  
    useEffect(() => {
      const imageUri = carouselData[0];
      if (imageUri !== '')
        Image.getSize(imageUri, (width, height) =>
          setImageAspectRatio(width / height),
        );
    }, [carouselData]);
  
    return (
      <View style={styles.container}>
        <Carousel
          ref={carouselRef}
          data={carouselData}
          sliderWidth={screenWidth}
          itemWidth={screenWidth - 40}
          inactiveSlideScale={0.95}
          useScrollView={true}
          autoplay={true}
          loop={isLooped}
          vertical={false}
          autoplayInterval={3000}
          onSnapToItem={index => setSlideIndex(index)}
          renderItem={({item, index}) => (
            <Pressable
              style={[
                styles.bannerContainer,
                {aspectRatio: imageAspectRatio},
                imageContainerStyle,
              ]}
              key={`${item}_${index}`}>
              <Image
                style={{...styles.bannerImage}}
                source={{uri: `${item}`}}
                resizeMode={'contain'}
                defaultSource={{
                  uri: 'https://admin.broadwaypizza.com.pk/images/banner/zxcmnadi12412452134.jpg',
                }}
              />
            </Pressable>
          )}
        />
        {carouselData.length > 1 && (
          <Pagination
            dotsLength={carouselData.length}
            activeDotIndex={slideIndex}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.activePaginationDot}
            inactiveDotStyle={styles.inActivePaginationDot}
            carouselRef={carouselRef}
            tappableDots={true}
          />
        )}
      </View>
    );
  };
  
  export default BannerCarousel;
  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginTop: 12,
    },
    bannerContainer: {
      width: '100%',
    },
    bannerImage: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
      resizeMode: 'contain',
    },
    paginationContainer: {
      paddingVertical: 0,
      marginTop: 8,
    },
    activePaginationDot: {
      width: 40,
      height: 5,
      borderRadius: 5,
      marginHorizontal: -5,
    },
    inActivePaginationDot: {
      width: 30,
      height: 10,
      borderRadius: 5,
      marginHorizontal: -12,
    },
  });