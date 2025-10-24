"use client";

import { useQueryState, debounce, parseAsString } from "nuqs";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Search } from "lucide-react";

export default function SearchInput() {
  const [search, setSearch] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({ shallow: false })
  );

  return (
    <InputGroup className="rounded-full bg-white">
      <InputGroupInput
        autoFocus
        type="text"
        className="font-medium text-base!"
        placeholder="Search for podcasts..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value, {
            limitUrlUpdates: e.target.value === "" ? undefined : debounce(500),
          })
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            // Send immediate update
            setSearch(e.currentTarget.value);
          }
        }}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}
