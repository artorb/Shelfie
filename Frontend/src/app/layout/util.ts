export const colorizeTag = (color: string) => {
    switch (color) {
        case "green":
            return "bg-green-400";
        case "amber":
            return "bg-amber-400";
        case "fuchsia":
            return "bg-fuchsia-400";
        case "sky":
            return "bg-sky-400";
        case "red":
            return "bg-red-400";
        case "blue":
            return "bg-blue-400";
        case "slate":
            return "bg-slate-400";
    }
};
