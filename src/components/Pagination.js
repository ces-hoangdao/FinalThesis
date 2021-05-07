import React from "react";
import PropType from "prop-types";
import { Pagination as Pa } from "react-bootstrap";

Pagination.PropType = {
  pagination: PropType.object.isRequired,
  onPageChange: PropType.func,
};
Pagination.defaultProps = {
  onPageChange: null,
};

function Pagination(props) {
  const { pagination, onPageChange } = props;
  const { page } = pagination;
  const showPage = page + 1;
  function handlePageChange(newPage) {
    if (onPageChange) {
      onPageChange(newPage);
    }
  }

  const pagi = () => {
    if (props.max === 1) return <Pa.Item active>{showPage}</Pa.Item>;
    else if (props.max === 2) {
      if (showPage === 1)
        return (
          <>
            <Pa.Item active>{showPage}</Pa.Item>
            <Pa.Item onClick={() => handlePageChange(1)}>2</Pa.Item>
          </>
        );
      else
        return (
          <>
            <Pa.Item onClick={() => handlePageChange(0)}>1</Pa.Item>
            <Pa.Item active>{showPage}</Pa.Item>
          </>
        );
    } else if (props.max === 3) {
      if (showPage === 1)
        return (
          <>
            <Pa.Item active>{showPage}</Pa.Item>
            <Pa.Item onClick={() => handlePageChange(1)}>2</Pa.Item>
            <Pa.Item onClick={() => handlePageChange(2)}>3</Pa.Item>
          </>
        );
      else if (showPage === 2)
        return (
          <>
            <Pa.Item onClick={() => handlePageChange(0)}>1</Pa.Item>
            <Pa.Item active>{showPage}</Pa.Item>
            <Pa.Item onClick={() => handlePageChange(2)}>3</Pa.Item>
          </>
        );
      else
        return (
          <>
            <Pa.Item onClick={() => handlePageChange(0)}>1</Pa.Item>
            <Pa.Item onClick={() => handlePageChange(1)}>2</Pa.Item>
            <Pa.Item active>{showPage}</Pa.Item>
          </>
        );
    } else
      return (
        <>
          {showPage > 2 ? (
            <>
              <Pa.First onClick={() => handlePageChange(0)} />
              <Pa.Prev onClick={() => handlePageChange(page - 1)} />
            </>
          ) : null}

          {showPage === 1 ? (
            <>
              <Pa.Item active>{showPage}</Pa.Item>
              <Pa.Item onClick={() => handlePageChange(1)}>2</Pa.Item>
              <Pa.Item onClick={() => handlePageChange(2)}>3</Pa.Item>
            </>
          ) : null}

          {showPage === 2 ? (
            <>
              <Pa.Item onClick={() => handlePageChange(0)}>1</Pa.Item>
              <Pa.Item active>{showPage}</Pa.Item>
              <Pa.Item onClick={() => handlePageChange(2)}>3</Pa.Item>
            </>
          ) : null}

          {showPage > 2 && showPage < props.max - 1 && (
            <>
              <Pa.Item onClick={() => handlePageChange(page - 1)}>
                {showPage - 1}
              </Pa.Item>
              <Pa.Item active>{showPage}</Pa.Item>
              <Pa.Item onClick={() => handlePageChange(page + 1)}>
                {showPage + 1}
              </Pa.Item>
            </>
          )}

          {showPage === props.max - 1 ? (
            <>
              <Pa.Item onClick={() => handlePageChange(props.max - 3)}>
                {props.max - 2}
              </Pa.Item>
              <Pa.Item active>{props.max - 1}</Pa.Item>
              <Pa.Item onClick={() => handlePageChange(props.max - 1)}>
                {props.max}
              </Pa.Item>
            </>
          ) : null}

          {showPage === props.max ? (
            <>
              <Pa.Item onClick={() => handlePageChange(props.max - 3)}>
                {props.max - 2}
              </Pa.Item>
              <Pa.Item onClick={() => handlePageChange(props.max - 2)}>
                {props.max - 1}
              </Pa.Item>
              <Pa.Item active>{props.max}</Pa.Item>
            </>
          ) : null}

          {showPage < props.max - 1 ? (
            <>
              <Pa.Next onClick={() => handlePageChange(page + 1)} />
              <Pa.Last onClick={() => handlePageChange(props.max - 1)} />
            </>
          ) : null}
        </>
      );
  };

  return (
    <div>
      <Pa>{pagi()}</Pa>
    </div>
  );
}
export default Pagination;
