import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Block} from '../../components/App';
import {PrivacyScreenProps} from '../../types/NavigationTypes.types';
import {config} from '../../../config/gluestack-ui.config';

const PrivacyPolicy: React.FunctionComponent<PrivacyScreenProps> = () => {
  return (
    <Block
      source={require('../../../assets/Images/Capture.png')}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 90,
        paddingHorizontal: 20,
      }}
      paddingBottom={100}>
      <Text style={styles.heading}>Privacy Policy</Text>
      <Text style={styles.subheading}>1. Information Collection:</Text>

      <Text style={styles.text}>
        The Application collects certain personal data from users, including but
        not limited to email address, first and last name, and profile picture.
        Additionally, the Application may collect information about users'
        devices and their use of the Application.
      </Text>
      <Text style={styles.subheading}>2. Use of Information:</Text>

      <Text style={styles.text}>
        The information collected by the Application is used to provide and
        improve the Application's services, maintain security, personalize user
        experiences, and may be used to provide advertisements or content of
        interest to users.
      </Text>
      <Text style={styles.subheading}>3. Data Retention:</Text>

      <Text style={styles.text}>
        User-provided data is retained for as long as the user continues to use
        the Application and for a reasonable time thereafter. Automatically
        collected information may be retained for up to [24] months.
      </Text>
      <Text style={styles.subheading}>4. Security:</Text>

      <Text style={styles.text}>
        The Application implements appropriate technical and organizational
        measures to protect user information against unauthorized access,
        alteration, disclosure, or destruction. However, no security system can
        guarantee absolute security.
      </Text>
      <Text style={styles.subheading}>5. Children's Privacy:</Text>

      <Text style={styles.text}>
        The Application is not intended for children under the age of [13], and
        does not knowingly collect personal information from children under this
        age. Parents or legal guardians should not allow children under [13] to
        use the Application.
      </Text>
      <Text style={styles.subheading}>6. Your Consent:</Text>

      <Text style={styles.text}>
        By using the Application, you consent to the processing of your
        information as described in this Privacy Policy. If you reside outside
        the United States, your information may be transferred, processed, and
        stored in the United States.
      </Text>
      <Text style={styles.subheading}>7. Effective Date:</Text>

      <Text style={styles.text}>
        This Privacy Policy is effective as of 2/feb/2023.
      </Text>
      <Text style={styles.subheading}>8. Contact Us:</Text>

      <Text style={styles.text}>
        If you have any questions or concerns about our privacy practices,
        please contact us at info@mylivingwill.net.
      </Text>
    </Block>
  );
};

export default PrivacyPolicy;
const styles = StyleSheet.create({
  heading: {
    paddingBottom: 20,
    fontWeight: '600',
    color: config.tokens.colors.linear,
    fontSize: 30,
  },
  subheading: {
    paddingBottom: 10,
    color: config.tokens.colors.linear,
    fontSize: 24,
    alignSelf: 'flex-start',
  },
  text: {
    color: config.tokens.colors.linear,
    paddingBottom: 10,
    paddingLeft: 10,
  },
});
