interface Props {
  text: string;
  onClick: () => void;
}

export const CreateButton = ({ text, onClick }: Props) => {
  return (
    <>
      <button
        onClick={() => onClick()}
        className={`btn-primary dark:btn-primary-dark text-md tracking-tighter leading-loose sm:tracking-normal sm:text-lg`}
      >
        {text}
      </button>
    </>
  );
};
