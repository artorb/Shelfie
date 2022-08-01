import { observer } from "mobx-react-lite";
import { ColorFilter } from "../../stores";
import { useStore } from "../../stores/store";

const ColorTag = ({
  handleOnChange,
  classNames,
  color,
}: {
  handleOnChange: () => void;
  classNames: string;
  color: boolean;
}) => {
  return (
    <>
      <input
        type="checkbox"
        checked={color}
        className={classNames}
        onChange={handleOnChange}
      />
    </>
  );
};

const TagSection = observer(() => {
  const { ingredientStore } = useStore();
  const { colortagFilter, setColorFilter } = ingredientStore;

  const handleOnChange = (colortags: ColorFilter) => {
    setColorFilter(colortags);
  };

  return (
    <>
      <ColorTag
        color={colortagFilter.amber}
        classNames="w-8 h-8 border-0 rounded-full checked:text-amber-400 text-amber-600 bg-amber-400 focus:ring-2 focus:bg-amber-500 focus:ring-amber-500 dark:focus:bg-amber-400 dark:bg-amber-500"
        handleOnChange={() =>
          handleOnChange({ ...colortagFilter, amber: !colortagFilter.amber })
        }
      ></ColorTag>
      <ColorTag
        color={colortagFilter.blue}
        classNames="w-8 h-8 border-0 rounded-full checked:text-blue-400 text-blue-600 bg-blue-400 focus:ring-2 focus:bg-blue-500 focus:ring-blue-500 dark:focus:bg-blue-400 dark:bg-blue-500"
        handleOnChange={() =>
          handleOnChange({ ...colortagFilter, blue: !colortagFilter.blue })
        }
      ></ColorTag>
      <ColorTag
        color={colortagFilter.fuchsia}
        classNames="w-8 h-8 border-0 rounded-full checked:text-fuchsia-400 text-fuchsia-600 bg-fuchsia-400 focus:ring-2 focus:bg-fuchsia-500 focus:ring-fuchsia-500 dark:focus:bg-fuchsia-400 dark:bg-fuchsia-500"
        handleOnChange={() =>
          handleOnChange({
            ...colortagFilter,
            fuchsia: !colortagFilter.fuchsia,
          })
        }
      ></ColorTag>
      <ColorTag
        color={colortagFilter.green}
        classNames="w-8 h-8 border-0 rounded-full checked:text-green-400 text-green-600 bg-green-400 focus:ring-2 focus:bg-green-500 focus:ring-green-500 dark:focus:bg-green-400 dark:bg-green-500"
        handleOnChange={() =>
          handleOnChange({ ...colortagFilter, green: !colortagFilter.green })
        }
      ></ColorTag>
      <ColorTag
        color={colortagFilter.red}
        classNames="w-8 h-8 border-0 rounded-full checked:text-red-400 text-red-600 bg-red-400 focus:ring-2 focus:bg-red-500 focus:ring-red-500 dark:focus:bg-red-400 dark:bg-red-500"
        handleOnChange={() =>
          handleOnChange({ ...colortagFilter, red: !colortagFilter.red })
        }
      ></ColorTag>
      <ColorTag
        color={colortagFilter.sky}
        classNames="w-8 h-8 border-0 rounded-full checked:text-sky-400 text-sky-600 bg-sky-400 focus:ring-2 focus:bg-sky-500 focus:ring-sky-500 dark:focus:bg-sky-400 dark:bg-sky-500"
        handleOnChange={() =>
          handleOnChange({ ...colortagFilter, sky: !colortagFilter.sky })
        }
      ></ColorTag>
      <ColorTag
        color={colortagFilter.slate}
        classNames="w-8 h-8 border-0 rounded-full checked:text-slate-400 text-slate-600 bg-slate-400 focus:ring-2 focus:bg-slate-500 focus:ring-slate-500 dark:focus:bg-slate-400 dark:bg-slate-500"
        handleOnChange={() =>
          handleOnChange({ ...colortagFilter, slate: !colortagFilter.slate })
        }
      ></ColorTag>
    </>
  );
});

export default TagSection;
