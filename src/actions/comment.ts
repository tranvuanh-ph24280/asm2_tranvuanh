import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export interface Comment {
    id: number;
    content: string;
    // Các thuộc tính khác của Comment
  }
// Thunk để fetch comments dựa vào productId
// export const fetchCommentsByProductId = createAsyncThunk<
//   { id: number; comments: Comment[] },
//   number
// >("comment/fetchCommentsByProductId", async (id) => {
//   try {
//     const response = await axios.get(`http://localhost:3000/products/${id}`);
//     const productData = response.data;

//     if (productData && productData.comments) {
//       return { id, comments: productData.comments };
//     } else {
//       // Trường hợp không có bình luận, trả về một mảng rỗng
//       return { id, comments: [] };
//     }
//   } catch (error) {
//     throw new Error("Failed to fetch comments.");
//   }
// });

// export const addCommentToProduct = createAsyncThunk<
//   { id: number; comment: Comment },
//   { id: number; comment: string }
// >("comment/addCommentToProduct", async ({ id, comment }) => {
//   try {
//     const response = await axios.post(
//       `http://localhost:3000/products/${id}/comments`,
//       {
//         content: comment,
//       }
//     );

//     return { id, comment: response.data };
//   } catch (error) {
//     throw new Error("Failed to add comment.");
//   }
// });
export const fetchCommentsByProductId = createAsyncThunk<
  { id: number; comments: Comment[] },
  number
>("comment/fetchCommentsByProductId", async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/products/${id}`);
    const productData = response.data;

    if (productData && productData.comments) {
      return { id, comments: productData.comments };
    } else {
      return { id, comments: [] };
    }
  } catch (error) {
    throw new Error("Failed to fetch comments.");
  }
});

// export const addCommentToProduct = createAsyncThunk<
//   { id: number; comment: Comment },
//   { id: number; comment: string }
// >("comment/addCommentToProduct", async ({ id, comment }) => {
//   try {
//     const {data} = await axios.post(
//       `http://localhost:3000/comment/${id}`,
//       {
//         content: comment,
//       }
//     );
//     console.log(comment);
//     return { id, comment: data };
//   } catch (error: any) {
//     return error.map((error: any) => (error.message));
//   }
// });
export const addCommentToProduct = createAsyncThunk<
  { id: number; comment: Comment },
  { id: number; comment: string }
>("comment/addCommentToProduct", async ({ id, comment }) => {
  try {
    // Gửi yêu cầu HTTP POST để thêm bình luận vào sản phẩm
    const response = await axios.post(`http://localhost:3001/products/${id}`, {
      content: comment,
    });
    const newComment = response.data;

    return { id, comment: newComment };
  } catch (error) {
    throw new Error("Failed to add comment.");
  }
});