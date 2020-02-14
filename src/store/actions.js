export default {
  addCart(context,payLoad){
    return new Promise((resolve,reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid)
      if(oldProduct){
        context.commit('addCounter',oldProduct);
        resolve('当前商品数量+1')
      }
      else {
        payLoad.count = 1;
        //state.cartList.push(payLoad);
        context.commit('addToCart',payLoad);
        resolve('添加了新的商品')
      }
    })


  }
}
