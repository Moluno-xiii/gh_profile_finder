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
            <span
              aria-label="user's github username"
              className="text-3xl capitalize"
            >
              {data.login}
            </span>
            <img
              aria-label="user avatar"
              src={data.avatar_url}
              className="rounded-full size-24"
              alt="User's github avatar"
            />
          </li>
          <li aria-label="user bio">Bio : {data.bio || "No Bio"}</li>
          <li aria-label="user blog">
            Blog :{" "}
            {data.blog ? (
              <a
                aria-label="user blog url"
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
          <li aria-label="User display name">
            Name : {data.name || "No display name"}
          </li>
          <li aria-label="Number of user's followers">
            Followers : {data.followers}
          </li>
          <li aria-label="Number of user's following">
            Following : {data.following}
          </li>
          <li aria-label="user profile">
            Profile URL :{" "}
            <a
              href={data.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              aria-label="usr profile url"
            >
              {data.html_url}
            </a>
          </li>
          <li aria-label="Date account was created">
            Created At : {date.toDateString()}
          </li>
          <li aria-label="User email">
            Email:{" "}
            <a
              aria-label="user email url"
              href={data.email ? `mailto:${data.email}` : "#"}
            >
              {data.email || "Empty"}
            </a>
          </li>
          <li aria-label="user's company">
            Company : {data.company || "Empty"}
          </li>
          <li aria-label="user's location">
            Location : {data.location || "Empty"}
          </li>
          {repositoryData === null && (
            <button
              className="self-end btn"
              onClick={() => handleDisplayRepositories(data.login)}
              aria-label="Load repository data button"
            >
              {isLoading
                ? "Loading repository data..."
                : " View all public repositories"}
            </button>
          )}
        </ul>
      ) : (
        <span>Enter user name to fetch user data.</span>
      )}
      {repositoryData !== null && displayRepositories && (
        <div className="mt-6">
          <RepositoryData />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
