export const actions = {

  listCollection(state, collection) {
    return this.$axios.get(`/collection/${collection}`);
  },

  getItem(state, params) {
    return this.$axios.get(`/collection/${params.collection}/${params.id}`);
  },

  comment(state, params) {
    return this.$axios.post(`/collection/${params.collection}/${params.id}/comment`, {
      message: params.message
    })
  },

  deleteComment(state, params) {
    return this.$axios.delete(`/collection/${params.collection}/${params.id}/comment/${params.commentId}`)
  },

  deletePost(state, params) {
    return this.$axios.delete(`/collection/${params.collection}/${params.id}`)
  },

  createPost(state, params) {
    return this.$axios.post(`/collection/${params.collection}`, params.body)
  },

  updatePost(state, params) {
    return this.$axios.patch(`/collection/${params.collection}/${params.id}`, params.body)
  },

  addImg(state, params) {
    const formData = new FormData();
    formData.append('file', params.file);
    return this.$axios.post(`/collection/${params.collection}/${params.id}/image`, formData)
  }

}
