function replaceTemplate(template, productObj) {
  let output = template.replace(/{%PRODUCT_NAME%}/g, productObj.productName);
  output = output.replace(/{%IMAGE%}/g, productObj.image);
  output = output.replace(/{%FROM%}/g, productObj.from);
  output = output.replace(/{%NUTRIENTS%}/g, productObj.nutrients);
  output = output.replace(/{%QUANTITY%}/g, productObj.quantity);
  output = output.replace(/{%PRICE%}/g, productObj.price);
  output = output.replace(/{%ORGANIC%}/g, productObj.organic);
  output = output.replace(/{%DESCRIPTION%}/g, productObj.description);
  output = output.replace(/{%ID%}/g, productObj.id);
  if (!productObj.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  } else {
    output = output.replace(/{%NOT_ORGANIC%}/g, '');
  }

  return output;
}

export default replaceTemplate;
