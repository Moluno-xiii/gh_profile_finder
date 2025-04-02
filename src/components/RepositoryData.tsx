import { useProfileContext } from "../context/ProfileContext";

/* eslint-disable @typescript-eslint/no-explicit-any */
const RepositoryData = () => {
  const { repositoryData, isLoading, errorMessage } = useProfileContext();

  if (isLoading) return <span>Loading...</span>;
  if (errorMessage) return <span>{errorMessage}</span>;
  if (repositoryData.length <= 0) return <span>No repository data</span>;

  return (
    <div className="flex flex-col gap-y-4 ">
      <span className="text-2xl">
        Number of repositories : {repositoryData.length}
      </span>
      <ul className="flex flex-col gap-y-10 justify-center">
        {repositoryData.map((repository: any) => (
          <Repostitory repository={repository} key={repository.id} />
        ))}
      </ul>
    </div>
  );
};

export default RepositoryData;

const Repostitory = ({ repository }: { repository: any }) => {
  return (
    <li className="flex flex-col gap-y-3 justify-center">
      <span className="text-xl font-semibold">
        Repository id : {repository.id}
      </span>
      <span>Repository name: {repository.name}</span>
      <span>Description: {repository.description}</span>
      <span>
        Repository url:{" "}
        <a
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          {repository.html_url}
        </a>
      </span>
      <span>Fork : {String(repository.fork)}</span>
      <span>Forks : {repository.forks}</span>
      <span>Default Branch : {repository.default_branch}</span>
      <span>Open issues : {repository.open_issues || ""}</span>
      <span>
        Repository Watchers : {String(repository.watchers_count) || ""}
      </span>
      <span>Repository License : {repository.license?.name || ""}</span>
      <span>Repository License id : {repository.license?.spdx_id || ""}</span>
      <span>
        Repository homepage :{" "}
        <a href={repository.homepage} target="_blank" rel="noopener noreferrer">
          {repository.homepage}
        </a>
      </span>
      <span>Created at : {repository.created_at}</span>
      <span>Updated at : {repository.updated_at}</span>
      <span>Clone URL : {repository.clone_url}</span>
      {repository.topics.length > 0 && (
        <div>
          Topics:
          {repository.topics.map((topic: string) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>
      )}
    </li>
  );
};
