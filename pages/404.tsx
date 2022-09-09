import { Htag } from "../components/Htag/Htag";
import { withLayout } from "../layout/Layout";

export function Error404(): JSX.Element {
  return (
    <div>
      <Htag tag='h1'>Error 404</Htag>
    </div>
  );
}

export default withLayout(Error404);
