import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Block} from '../../components/App';
import {config} from '../../../config/gluestack-ui.config';
import {TermsAndConditionsScreenProps} from '../../types/NavigationTypes.types';

const TermsAndCondition: React.FunctionComponent<
  TermsAndConditionsScreenProps
> = () => {
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
      <Text style={styles.heading}>Terms & Conditions</Text>
      <Text style={styles.subheading}>1. Acceptance of Terms:</Text>
      <Text style={styles.text}>
        By downloading, installing, or using the Living Will mobile application
        ("Application"), you agree to be bound by these Terms & Conditions,
        which constitute a legally binding agreement between you and Living
        Will.
      </Text>
      <Text style={styles.subheading}>2. Use of Application:</Text>

      <Text style={styles.text}>
        The Application is provided solely for your personal, non-commercial
        use. You may not use the Application in any manner that violates any
        applicable laws or regulations.
      </Text>
      <Text style={styles.subheading}>3. User Accounts:</Text>

      <Text style={styles.text}>
        You may be required to create an account to access certain features of
        the Application. You are responsible for maintaining the confidentiality
        of your account credentials and for all activities that occur under your
        account.
      </Text>
      <Text style={styles.subheading}>4. Intellectual Property:</Text>

      <Text style={styles.text}>
        All content and materials available through the Application, including
        but not limited to text, graphics, logos, images, and software, are the
        property of Living Will or its licensors and are protected by
        intellectual property laws.
      </Text>
      <Text style={styles.subheading}>5. Privacy:</Text>

      <Text style={styles.text}>
        Your use of the Application is subject to our Privacy Policy, which is
        incorporated herein by reference. By using the Application, you consent
        to the collection and use of your information as described in the
        Privacy Policy.
      </Text>
      <Text style={styles.subheading}>6. Disclaimer of Warranties:</Text>

      <Text style={styles.text}>
        The Application is provided on an "as is" and "as available" basis,
        without any warranties of any kind, either express or implied. Living
        Will disclaims all warranties, including but not limited to the implied
        warranties of merchantability, fitness for a particular purpose, and
        non-infringement.
      </Text>
      <Text style={styles.subheading}>7. Limitation of Liability:</Text>

      <Text style={styles.text}>
        In no event shall Living Will be liable for any indirect, incidental,
        special, consequential, or punitive damages arising out of or in
        connection with your use of the Application, whether based on warranty,
        contract, tort (including negligence), or any other legal theory.
      </Text>
      <Text style={styles.subheading}>8. Governing Law:</Text>

      <Text style={styles.text}>
        These Terms & Conditions shall be governed by and construed in
        accordance with the laws of [insert jurisdiction], without regard to its
        conflict of law principles.
      </Text>
      <Text style={styles.subheading}>9. Changes to Terms & Conditions:</Text>

      <Text style={styles.text}>
        Living Will reserves the right to modify or revise these Terms &
        Conditions at any time. Your continued use of the Application following
        the posting of any changes constitutes acceptance of those changes.
      </Text>
      <Text style={styles.subheading}>10. Contact Information:</Text>

      <Text style={styles.text}>
        If you have any questions or concerns about these Terms & Conditions,
        please contact us at info@mylivingwill.net.
      </Text>
    </Block>
  );
};

export default TermsAndCondition;

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
