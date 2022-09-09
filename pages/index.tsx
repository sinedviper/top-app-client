import { GetStaticProps } from "next";
import axios from "axios";

import { Htag } from "../components";
import { withLayout } from "../layout/Layout";
import { MenuItem } from "../interfaces/menu.interface";
import { API } from "../helpers/api";

function Home({}: HomeProps): JSX.Element {
  return (
    <div>
      <Htag tag='h1'>
        Hello, my name is Denis and this is my test site how it work with api HH
      </Htag>
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
