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

  function handlePageChange(newPage) {
    if (onPageChange) {
      onPageChange(newPage);
    }
  }

  return (
    <div>
      <Pa>
        {page <= 2 ? null : (
          <>
            <Pa.First onClick={() => handlePageChange(1)} />
            <Pa.Prev onClick={() => handlePageChange(page - 1)} />
            <Pa.Ellipsis />

            <Pa.Item onClick={() => handlePageChange(page - 1)}>    
              {page - 1}
            </Pa.Item>
          </>
        )}
        {page - 1 === 1 ? <Pa.Item onClick={() => handlePageChange(page - 1)}>    
              {page - 1}
            </Pa.Item> : null}
        <Pa.Item active>{page}</Pa.Item>
        <Pa.Item onClick={() => handlePageChange(page + 1)}>{page + 1}</Pa.Item>
        
        {page <=1 ? <Pa.Item onClick={() => handlePageChange(page + 2)}>{page + 2}</Pa.Item> : null}

        <Pa.Next onClick={() => handlePageChange(page + 1)} />
        <Pa.Ellipsis />
        <Pa.Last />
      </Pa>
    </div>
  );
}
export default Pagination;
