import { useState } from "react";
import { useProfileContext } from "../context/ProfileContext";
import RepositoryData from "./RepositoryData";

const UserProfile: React.FC = () => {
  const { data, isLoading, errorMessage, repositoryData, fetchRepositoryData } =
    useProfileContext();
  const [displayRepositories, setDisplayRepositories] = useState(false);

  async function handleDisplayRepositories(userName: string) {
    await fetchRepositoryData(userName);
    setDisplayRepositories(true);
  }
  const date = new Date(data.created_at);
  if (errorMessage) return <span>{errorMessage}</span>;
  return (
    <div className="flex flex-col gap-y-5">
      {data.login ? (
        <ul className="flex flex-col gap-y-3">
          <li className="flex flex-row justify-between items-center">
            <span className="text-3xl capitalize">{data.login}</span>
            <img
              src={data.avatar_url}
              className="rounded-full size-24"
              alt=""
            />
          </li>
          <li>Bio : {data.bio || "No Bio"}</li>
          <li>
            Blog :{" "}
            {data.blog ? (
              <a
                href={data.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="underline "
              >
                {data.blog}
              </a>
            ) : (
              "No blog url"
            )}
          </li>
          <li>Name : {data.name || "No display name"}</li>
          <li>Followers : {data.followers}</li>
          <li>Following : {data.following}</li>
          <li>
            Profile URL :{" "}
            <a
              href={data.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {data.html_url}
            </a>
          </li>
          <li>Created At : {date.toDateString()}</li>
          <li>
            Email:{" "}
            <a href={data.email ? `mailto:${data.email}` : "#"}>
              {data.email || "Empty"}
            </a>
          </li>
          <li>Company : {data.company || "Empty"}</li>
          <li>Location : {data.location || "Empty"}</li>
          <button
            className="self-end btn"
            onClick={() => handleDisplayRepositories(data.login)}
          >
            {isLoading
              ? "Loading repository data..."
              : " View all public repositories"}
          </button>
        </ul>
      ) : (
        <span>Enter user name to fetch user data.</span>
      )}
      {repositoryData !== null && displayRepositories && (
        <div>
          <RepositoryData />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
