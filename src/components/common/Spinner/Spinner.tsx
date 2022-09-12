import { FaSpinner } from "react-icons/fa";

export default function Spinner() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <FaSpinner className="animate-spin text-2xl" />
    </div>
  );
}
