import {Test} from '@wmg/shared';
import {Text} from '@wmg/common';

const test: Test = {
  type: 1,
};

export default function Home() {
  return (
    <>
      <p>{test.type}</p>
      <Text />
    </>
  );
}
