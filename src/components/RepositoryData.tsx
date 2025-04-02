import { useProfileContext } from "../context/ProfileContext";
import PaginateData from "./PaginateData";
import Repository from "./Repository";

/* eslint-disable @typescript-eslint/no-explicit-any */
const RepositoryData = () => {
  const { repositoryData, isLoading, errorMessage } = useProfileContext();

  if (isLoading) return <span>Loading...</span>;
  if (errorMessage) return <span>{errorMessage}</span>;
  if (repositoryData.length <= 0) return <span>No repository data</span>;

  return (
    <div className="flex flex-col gap-y-4 ">
      <span aria-label="number of repositories" className="text-2xl">
        Number of repositories : {repositoryData.length}
      </span>
      <ul
        aria-label="user repositories"
        className="flex flex-col gap-y-10 justify-center"
      >
        {repositoryData.map((repository: any) => (
          <Repository repository={repository} key={repository.id} />
        ))}
      </ul>
      <PaginateData />
    </div>
  );
};

export default RepositoryData;
