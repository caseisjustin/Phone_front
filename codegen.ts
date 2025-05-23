import { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: "http://10.10.1.91:3001/graphql",
  documents: ["src/graphql/**/*.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: ["typescript"],
    },
  },
}

export default config
