const FadeInWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="animate-fadeInUp">{children}</div>;
};

export default FadeInWrapper;
