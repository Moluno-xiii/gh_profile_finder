// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Repository = ({ repository }: { repository: any }) => {
  return (
    <li className="flex flex-col gap-y-3 justify-center">
      <span className="text-xl font-semibold" aria-label="repository name">
        Repository name: {repository.name}
      </span>
      <span aria-label="repository id">Repository id : {repository.id}</span>
      <span aria-label="repository description">
        Description: {repository.description}
      </span>
      <span aria-label="repository url">
        Repository url:{" "}
        <a
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          aria-label="repository url link"
        >
          {repository.html_url}
        </a>
      </span>
      <span>Fork : {String(repository.fork)}</span>
      <span aria-label="number of repository forks">
        Forks : {repository.forks}
      </span>
      <span aria-label="repository default branch">
        Default Branch : {repository.default_branch}
      </span>
      <span aria-label="repository open issues">
        Open issues : {repository.open_issues || ""}
      </span>
      <span aria-label="number of repository watchers">
        Repository Watchers : {String(repository.watchers_count) || ""}
      </span>
      <span aria-label="repository license">
        Repository License : {repository.license?.name || ""}
      </span>
      <span aria-label="repository license id">
        Repository License id : {repository.license?.spdx_id || ""}
      </span>
      <span aria-label="repository homepage">
        Homepage :{" "}
        <a
          href={repository.homepage}
          aria-label="repository homepage url"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          {repository.homepage}
        </a>
      </span>
      <span aria-label="repository created at date">
        Created at : {repository.created_at}
      </span>
      <span aria-label="repository updated at date">
        Updated at : {repository.updated_at}
      </span>
      <span aria-label="repository clone url">
        {" "}
        Clone URL : {repository.clone_url}
      </span>
      {repository.topics.length > 0 && (
        <div aria-label="repository topics">
          Topics:
          {repository.topics.map((topic: string) => (
            <span aria-label="repository topic" key={topic}>
              {topic}
            </span>
          ))}
        </div>
      )}
    </li>
  );
};

export default Repository;
