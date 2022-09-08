import cn from "classnames";
import React, { KeyboardEvent, useState } from "react";
import { useRouter } from "next/router";

import { SearchProps } from "./Search.props";
import styles from "./Search.module.css";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import GlassIcon from "./glass.svg";

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const goToSearch = () => {
    router.push({
      pathname: "/search",
      query: {
        q: search,
      },
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == "Enter") {
      goToSearch();
    }
  };

  return (
    <form className={cn(className, styles.search)} {...props} role='search'>
      <Input
        className={styles.input}
        placeholder='Search...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <Button
        appearance='primary'
        className={styles.button}
        onClick={goToSearch}
        aria-label='Search of the site'
      >
        <GlassIcon />
      </Button>
    </form>
  );
};
