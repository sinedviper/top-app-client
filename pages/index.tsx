import { useState } from "react";
import { Button, Htag, P, Rating } from "../components";

export default function Home(): JSX.Element {
  const [rating, setRating] = useState<number>(4);
  return (
    <div>
      <Htag tag='h1'>hellow</Htag>
      <Button appearance='primary' arrow='down'>
        Button
      </Button>
      <Button appearance='ghost' arrow='right'>
        Button
      </Button>
      <P size='s'>mini text</P>
      <P>middle text</P>
      <P size='l'>Big text</P>
      <Rating rating={rating} isEditable setRating={setRating} />
    </div>
  );
}
