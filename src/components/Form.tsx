import { useProfileContext } from "../context/ProfileContext";

const Form: React.FC = () => {
  const { fetchUserData, isLoading } = useProfileContext();
  return (
    <form onSubmit={fetchUserData} className="space-y-4">
      <div className="flex flex-col gap-y-2">
        <label htmlFor="userName">Enter github username</label>
        <input
          className="border focus:outline-none border-secondary rounded-md px-3 py-1"
          name="userName"
          id="userName"
          type="text"
        />
      </div>
      <button disabled={isLoading} className="btn" type="submit">
        {isLoading ? "Loading..." : "submit"}
      </button>
    </form>
  );
};

export default Form;
