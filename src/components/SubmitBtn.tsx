import clsx from "clsx";

const SubmitBtn = ({
  formBtn,
  customBtn,
  pendingBtn,
  isLoading,
}: {
  formBtn: boolean;
  customBtn: string;
  pendingBtn: string;
  isLoading: boolean;
}) => {
  return (
    <button
      type="submit"
      className={clsx("btn btn-block", formBtn && `form-btn ${customBtn}`)}
      disabled={isLoading}
    >
      {isLoading ? "submitting..." : "submit"}
    </button>
  );
};
export default SubmitBtn;
