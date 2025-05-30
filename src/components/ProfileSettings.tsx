import React, { useState } from "react"
import { useGeneralStore } from "../stores/generalStore"
import { useUserStore } from "../stores/userStore"
import { useForm } from "@mantine/form"
import { useMutation } from "@apollo/client"
import { UPDATE_PROFILE } from "../graphql/mutations/UpdateUserProfile"
import {
  Avatar,
  Button,
  FileInput,
  Flex,
  Group,
  Modal,
  TextInput,
} from "@mantine/core"
import { IconEditCircle } from "@tabler/icons-react"
import { useQuery } from "@apollo/client"
import { GET_USER } from "../graphql/queries/GetUser"
import { GetUserQuery } from "../gql/graphql"

function ProfileSettings() {
  const isProfileSettingsModalOpen = useGeneralStore(
    (state) => state.isProfileSettingsModalOpen
  )
  const toggleProfileSettingsModal = useGeneralStore(
    (state) => state.toggleProfileSettingsModal
  )
  const profileImage = useUserStore((state) => state.profile_img)
  const updateProfileImage = useUserStore((state) => state.updateProfileImage)
  const first_name = useUserStore((state) => state.first_name)
  const updateUsername = useUserStore((state) => state.updateUsername)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const imagePreview = imageFile ? URL.createObjectURL(imageFile) : null

  const fileInputRef = React.useRef<HTMLButtonElement>(null)
  const setUser = useUserStore((state) => state.setUser)
  const { data: stateUser} = useQuery<GetUserQuery>(GET_USER)
  setUser({
    id: stateUser?.getUser.id || undefined,
    profile_img: stateUser?.getUser.profile_img,
    first_name: stateUser?.getUser.first_name!,
  })

  const form = useForm({
    initialValues: {
      first_name: first_name,
      profileImage: profileImage,
    },
    validate: {
      first_name: (value: string) =>
        value.trim().length >= 3
          ? null
          : "Username must be at least 3 characters",
    },
  })

  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    variables: {
      first_name: form.values.first_name,
      file: imageFile,
    },
    // run liveUsersInChatroom subscription after mutation is completed

    onCompleted: (data) => {
      updateProfileImage(data.updateProfile.profile_img)
      updateUsername(data.updateProfile.first_name)
    },
  })
  const handleSave = async () => {
    if (form.validate().hasErrors) return
    await updateProfile().then(() => {
      toggleProfileSettingsModal()
    })
  }
  return (
    <Modal
      opened={isProfileSettingsModalOpen}
      onClose={toggleProfileSettingsModal}
      title="Profile Settings"
    >
      <form onSubmit={form.onSubmit(() => handleSave())}>
        <Group
          pos="relative"
          w={100}
          h={100}
          style={{ cursor: "pointer" }}
          onClick={() => fileInputRef.current?.click()}
        >
          <Avatar
            src={imagePreview || profileImage || null}
            alt="Profile"
            h={100}
            w={100}
            radius={100}
          />
          <IconEditCircle
            color="black"
            size={20}
            style={{
              position: "absolute",
              top: 50,
              right: -10,
              background: "white",
              border: "1px solid black",
              padding: 5,
              borderRadius: 100,
            }}
          />
          <FileInput
            ref={fileInputRef}
            style={{ display: "none" }}
            pos={"absolute"}
            accept="image/*"
            placeholder="Upload new image"
            onChange={(file) => setImageFile(file)}
          />
        </Group>
        <TextInput
          style={{ marginTop: 20 }}
          label="Username"
          {...form.getInputProps("first_name")}
          onChange={(event) => {
            form.setFieldValue("first_name", event.currentTarget.value)
          }}
          error={form.errors.first_name}
        />
        <Flex gap="md" mt="sm">
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={toggleProfileSettingsModal} variant="link">
            Cancel
          </Button>
        </Flex>
      </form>
    </Modal>
  )
}

export default ProfileSettings
