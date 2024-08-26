interface PartitionProps {
  color?: "bold" | "semibold" | "light";
  height?: "thick" | "thin" | "md";
}

const Partition = ({ color = "light", height = "thin" }: PartitionProps) => {
  const colorStyles = {
    bold: "bg-[#7a7a7a]",
    semibold: "bg-[#eaeaea]",
    light: "bg-[#F4F5F7]",
  };

  const heightStyles = {
    thick: "h-[0.5rem]",
    md: "h-[0.3rem]",
    thin: "h-[0.0625rem]",
  };

  return (
    <div className={`w-full ${colorStyles[color]} ${heightStyles[height]}`} />
  );
};

export default Partition;
