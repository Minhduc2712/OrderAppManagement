import { createSelector } from "@reduxjs/toolkit";

const productSelector = (state) => state.post.content;
// const statusSelector = (state) => state.post.status;
// const errorSelector = (state) => state.post.error;
const pageNoSelector =(state)=>state.post.pageNo;
const pageSizeSelector =(state)=>state.post.pageSize;
const totalElementsSelector =(state)=>state.post.totalElements;
const totalPagesSelector=(state)=>state.post.totalPages;


export const selectlistFilteredProduct = createSelector(
  [productSelector, pageNoSelector, pageSizeSelector,totalElementsSelector,totalPagesSelector],
  (content, pageNo,pageSize,totalElements,totalPages) => {
    return {
      content: content,
    //   status: status,
    //   error: error,
      pageNo: pageNo,
      pageSize:pageSize,
      totalElements: totalElements,
      totalPages: totalPages
    };
  }
);
