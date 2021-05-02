import styled from "styled-components";
import { Text } from "../../atoms";
import { Card } from "../../layouts";
import { Game } from "@wmg/shared";

interface GameEntryProps extends Game {
  onClick: () => void;
}
export function GameEntry(props: GameEntryProps) {
  return (
    <Card header={props.name} onClick={props.onClick}>
      <Text>{props.description}</Text>
    </Card>
  )
}
