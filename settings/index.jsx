function ClockSettings(props) {
  return (
    <Page>
      <Section>
        <Text>Thank you for buy my first clockface Bars and Circles</Text>
      </Section>
      <Section title={<Text bold align="center">Support</Text>}>
        <Text>Made with ❤️ in Kerala, India </Text>
        <Text>Connect with me on my <Link sourse ="https://garythomasgeorge.com"> Website </Link> </Text>
        <Text>If you wish to further support me to build more features and clockfaces support me by: </Text>
        <Text> <Link source='https://buymeacoffee.com/garytg' bold> Buying me a Coffee </Link> </Text>
      </Section>
    </Page>
  );
}

registerSettingsPage(ClockSettings);