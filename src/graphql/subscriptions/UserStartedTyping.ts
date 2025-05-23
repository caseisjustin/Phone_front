import { gql } from "@apollo/client"

export const USER_STARTED_TYPING_SUBSCRIPTION = gql`
  subscription UserStartedTyping($chatroomId: Float!, $userId: Float!) {
    userStartedTyping(chatroomId: $chatroomId, userId: $userId) {
      id
      first_name
      phone_number
      profile_img
    }
  }
`
