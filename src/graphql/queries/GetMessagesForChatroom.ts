import { gql } from "@apollo/client"

export const GET_MESSAGES_FOR_CHATROOM = gql`
  query GetMessagesForChatroom($chatroomId: Float!) {
    getMessagesForChatroom(chatroomId: $chatroomId) {
      id
      content
      imageUrl
      createdAt
      user {
        id
        first_name
        phone_number
        profile_img
      }
      chatroom {
        id
        name
        users {
          id
          first_name
          phone_number
          profile_img
        }
      }
    }
  }
`
