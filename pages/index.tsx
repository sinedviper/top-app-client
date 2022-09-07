import { GetStaticProps } from "next";
import { useState } from "react";
import { Button, Htag, P, Rating, Tag } from "../components";
import { withLayout } from "../layout/Layout";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";
import { API } from "../helpers/api";

function Home({ menu }: HomeProps): JSX.Element {
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
      <Tag size='s' color='red'>
        Red
      </Tag>
      <Tag size='m' color='green'>
        Red
      </Tag>
      <Rating rating={rating} isEditable setRating={setRating} />
    </div>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  });
  return {
    props: { menu, firstCategory },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
