type Props = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type"
>;

const Base: React.FC<Props> = (props) => {
  return <input {...props} type="file" />;
};

export default Base;
