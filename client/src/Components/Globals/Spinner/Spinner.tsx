import loading from "./loading.svg";

interface PropsSpinner {
  size: number;
}

const Spinner = (props: PropsSpinner) => {
  return (
    <div>
      <img
        src={loading}
        alt="Loading spinner"
        className={`animate-spin-ease min-w-12 w-${props.size}`}
      />
    </div>
  );
};

export default Spinner;
