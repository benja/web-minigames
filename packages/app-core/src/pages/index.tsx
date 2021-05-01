import { Test } from "shared-types";
import { Text } from "fe-common/dist";

const test: Test = {
  type: 1
}

export default function Home() {
  return (
    <>
      <p>{test.type}</p>
      <Text />
    </>
  )
}
