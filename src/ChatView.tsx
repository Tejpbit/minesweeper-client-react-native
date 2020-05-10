import React from "react";
import { View, Image } from "react-native";
import styled from "styled-components/native";

interface Props {}
export const ChatView = ({}: Props) => {
  return (
    <View>
      <IncomingMessageRow
        nick="Tejpbit"
        message="Good day to you all fine sirs!"
      />
      <OutgoingMessageRow message="hello! guest_v65507 is my name" />
      <IncomingMessageRow
        nick="Tejpbit"
        message="Nice to meet you! Would you like to get your ass handed to you in a friendly battle?"
      />
      <IncomingMessageRow
        nick="Tejpbit"
        message="Or should i  play against an AI instead? "
      />
      <OutgoingMessageRow message="Lets battle!" />
    </View>
  );
};

interface IncomingMessageRowProps {
  nick: string;
  message: string;
}

const IncomingMessageRow = ({ nick, message }: IncomingMessageRowProps) => {
  return (
    <IncomingMessage>
      <Image
        source={require("../assets/guest_profile_pic.png")}
        style={{ width: 50, height: 50, marginHorizontal: 10 }}
      />
      <View>
        <NickText>{nick}</NickText>
        <MessageText>{message}</MessageText>
      </View>
    </IncomingMessage>
  );
};

interface OutgoingMessageRowProps {
  message: string;
}

const OutgoingMessageRow = ({ message }: OutgoingMessageRowProps) => {
  return (
    <OutgoingMessage>
      <MessageText>{message}</MessageText>
    </OutgoingMessage>
  );
};

const IncomingMessage = styled.View`
  display: flex;
  flex-direction: row;
  padding-top: 20px;
`;

const OutgoingMessage = styled.View`
  padding-top: 20px;
  display: flex;
  flex-direction: row-reverse;
`;

const NickText = styled.Text`
  font-size: 12px;
  color: darkgrey;
`;

const MessageText = styled.Text`
  font-size: 18px;
  display: flex;
  flex-wrap: wrap;
`;
