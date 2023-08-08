import { addCommentToProduct, fetchCommentsByProductId } from "@/actions/comment";
import { createSlice } from "@reduxjs/toolkit";



export interface Comment {
    id: number;
    content: string;
  }
  interface CommentState {
    commentsByProduct: { [id: number]: Comment[] };
    status: "idle" | "loading" | "failed";
    error: string | null;
  }
  
  const initialState: CommentState = {
    commentsByProduct: {},
    status: "idle",
    error: null,
  };
const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

    .addCase(fetchCommentsByProductId.fulfilled, (state, action) => {
      const { id, comments } = action.payload;
      state.commentsByProduct[id] = comments;
      state.status = "idle";
      state.error = null;
    })
    .addCase(fetchCommentsByProductId.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(fetchCommentsByProductId.rejected, (state, action) => {
      state.status = "failed";
      state.error = "Failed to fetch comments.";
    })
    .addCase(addCommentToProduct.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(addCommentToProduct.fulfilled, (state, action) => {
      const { id, comment } = action.payload;
      const productComments = state.commentsByProduct[id];

      // Kiểm tra nếu sản phẩm có bình luận rồi thì cập nhật vào mảng bình luận của sản phẩm
      if (productComments) {
        productComments.push(comment);
      } else {
        // Nếu sản phẩm chưa có bình luận thì tạo một mảng mới và thêm bình luận vào
        state.commentsByProduct[id] = [comment];
      }
      state.status = "idle";
      state.error = null;
    })
    .addCase(addCommentToProduct.rejected, (state, action) => {
      state.status = "failed";
      // state.error = "Failed to add comment.";
    });
  },
});

export const commentReducer = commentSlice.reducer;
