const FadeInWrapper = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`animate-fadeInUp ${className}`}>{children}</div>;
};

export default FadeInWrapper;
