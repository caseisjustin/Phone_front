import { gql } from "@apollo/client"

export const GET_USERS_OF_CHATROOM = gql`
  query GetUsersOfChatroom($chatroomId: Float!) {
    getUsersOfChatroom(chatroomId: $chatroomId) {
      id
      first_name
      phone_number
      profile_img
    }
  }
`
