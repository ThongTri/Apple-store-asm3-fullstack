function formatNumber(str) {
  let number = "";
  let count = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    number = str[i] + number;
    count++;
    if (count % 3 === 0 && i !== 0) {
      number = "." + number;
    }
  }
  return number + " VND";
}

exports.orderEmail = (user, address, total, time) => {
  const products = user.cart
    .map(
      (product) => `
    <tr>
      <td>${product.product.name}</td>
      <td>${formatNumber(product.product.price.toString())}</td>
      <td><img src='${
        product.product.img1
      }' style='width:50px;height:50px;'/></td>
      <td>${product.qty}</td>
      <td>${formatNumber(
        Number(product.qty * product.product.price).toString()
      )}</td>
    </tr>
  `
    )
    .join("");
  const htmlContent = `
    <h1>Xin chào, ${user.fullName}</h1>
    <h4>Phone: ${user.phoneNumber}</h4>
    <h4>Địa chỉ: ${address}</h4>
    <table border="1" cellspacing="0" cellpadding="5">
      <thead>
        <tr>
          <th>Sản phẩm</th>
          <th>Giá</th>
          <th>Hình ảnh</th>
          <th>Số lượng</th>
          <th>Thành tiền</th>
        </tr>
      </thead>
      <tbody>
        ${products}
      </tbody>
    </table>
    <h3>Tổng hóa đơn: ${formatNumber(total.toString())} $</h3>
    <p>Đơn đặt vào lúc: ${time.getDate()}/${
    time.getMonth() + 1
  }/${time.getFullYear()}</p>
    <p>Cảm ơn bạn đã mua hàng!</p>
  `;
  return htmlContent;
};
