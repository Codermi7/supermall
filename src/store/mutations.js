export default {
  //mutations 唯一目的是修改state中状态
  addCounter(state,payload) {
    payload.count += 1;
  },
  addToCart(state,payload) {
    payload.checked = true;
    state.cartList.push(payload);
  }
}
