import { Htag } from "../components/Htag/Htag";
import { withLayout } from "../layout/Layout";

function Error500(): JSX.Element {
  return (
    <div>
      <Htag tag='h1'>Error 500</Htag>
    </div>
  );
}

export default withLayout(Error500);
