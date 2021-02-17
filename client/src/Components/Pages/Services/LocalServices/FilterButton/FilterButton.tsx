import React from "react";
import { Filter } from "../LocalServices";

interface Props {
  filter: Filter;
  handleFilterToggle: (filter: Filter) => void;
}

const FilterButton = (props: Props) => {
  const { filter, handleFilterToggle } = props;
  return (
    <div
      className={`${
        filter.selected
          ? `bg-${filter.color} text-white`
          : `border-${filter.color} text-${filter.color} bg-white`
      } h-8 flex justify-center items-center font-semibold rounded-3xl border border-solid`}
      onClick={() => handleFilterToggle(filter)}
    >
      {filter.name}
    </div>
  );
};

export default FilterButton;
