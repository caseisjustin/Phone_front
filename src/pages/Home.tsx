import MainLayout from "../layouts/MainLayout"
import Sidebar from "../components/Sidebar"
import ProfileSettings from "../components/ProfileSettings"
import RoomList from "../components/RoomList"
import { Flex } from "@mantine/core"
import AddChatroom from "../components/AddChatroom"
import JoinRoomOrChatwindow from "../components/JoinRoomOrChatwindow"

function Home() {

  return (
    <MainLayout>
      <div
        style={{
          position: "absolute",
        }}
      >
        <ProfileSettings />
        <Sidebar />
        <AddChatroom />
        <Flex direction={{ base: "column", md: "row" }}>
          <RoomList />
          <JoinRoomOrChatwindow />
        </Flex>
      </div>
    </MainLayout>
  )
}

export default Home
