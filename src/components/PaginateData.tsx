import { useProfileContext } from "../context/ProfileContext";

const PaginateData: React.FC = () => {
  const { handlePageNumber, repositoryData, page_number } = useProfileContext();
  return (
    <div className="flex flex-row justify-end items-center gap-3">
      {page_number > 1 && (
        <button className="btn" onClick={() => handlePageNumber(-1)}>
          Previous{" "}
        </button>
      )}
      <span>Page {page_number}</span>
      {repositoryData.length === 30 && (
        <button className="btn" onClick={() => handlePageNumber(1)}>
          Next{" "}
        </button>
      )}
    </div>
  );
};

export default PaginateData;
