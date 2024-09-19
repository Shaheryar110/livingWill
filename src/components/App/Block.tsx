import React, {ReactElement} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Dimensions,
  StatusBar,
  ViewStyle,
  ViewProps,
  FlexStyle,
  Text,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';
import {config} from '../../../config/gluestack-ui.config';
const {width, height} = Dimensions.get('window');
interface props {
  contentContainerStyle?: ViewStyle;
  justifyContent?: FlexStyle['justifyContent'];
  alignItems?: FlexStyle['alignItems'];
  children?: string | JSX.Element | JSX.Element[] | null;
  backgroundColor?: string;
  scrollStyle?: ViewStyle;
  withoutScroll?: boolean;
  navigation?: props;
  viewStyle?: ViewStyle;
  paddingBottom?: number;
  source?: ImageSourcePropType;
}
const Block: React.FunctionComponent<props> = ({
  contentContainerStyle,
  justifyContent,
  alignItems,
  children,
  backgroundColor,
  scrollStyle,
  withoutScroll,
  navigation,
  viewStyle,
  paddingBottom,
  source,
}) => {
  const externalStyle: ViewStyle = {
    justifyContent: justifyContent || 'flex-start',
    alignItems: alignItems || 'stretch',
    backgroundColor: backgroundColor || config.tokens.colors.primary0,
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={1}
      style={[{flex: 1}, externalStyle]}>
      <StatusBar
        hidden={false}
        barStyle="light-content"
        backgroundColor={'rgba(41, 171, 226, 0.85)'}
      />
      {withoutScroll ? (
        <View
          style={[
            viewStyle,
            {flex: 1, justifyContent: 'center', alignItems: 'center'},
          ]}>
          <ImageBackground
            source={source || require('../../../assets/Images/bg.png')}
            style={{
              width: 100,
              height: '100%',
            }}
            resizeMode="cover"
          />
          {children}
        </View>
      ) : (
        <ImageBackground
          source={source || require('../../../assets/Images/bg.png')}
          style={{
            width: width,
            height: height,
          }}
          resizeMode="cover">
          <ScrollView
            style={[scrollStyle, {flex: 1}]}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              contentContainerStyle,
              {paddingBottom: paddingBottom ? paddingBottom : 0},
            ]}
            keyboardShouldPersistTaps="handled">
            {children}
          </ScrollView>
        </ImageBackground>
      )}
    </KeyboardAvoidingView>
  );
};

export default Block;
