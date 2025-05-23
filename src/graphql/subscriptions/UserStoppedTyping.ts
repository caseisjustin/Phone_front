import { gql } from "@apollo/client"

export const USER_STOPPED_TYPING_SUBSCRIPTION = gql`
  subscription UserStoppedTyping($chatroomId: Float!, $userId: Float!) {
    userStoppedTyping(chatroomId: $chatroomId, userId: $userId) {
      id
      first_name
      phone_number
      profile_img
    }
  }
`
