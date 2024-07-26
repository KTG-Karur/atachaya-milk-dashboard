import moment from "moment";
import { NotificationContainer, NotificationManager, } from "react-notifications";
import Swal from 'sweetalert2';
const CryptoJS = require("crypto-js");
const secretKey = "passwordscretekey123"

const showMessage = (type, msg, title = null) => {
  switch (type) {
    case 'info':
      NotificationManager.info(msg, title);
      break;
    case 'success':
      NotificationManager.success(msg, title);
      break;
    case 'warning':
      NotificationManager.warning(msg, title);
      break;
    case 'error':
      NotificationManager.error(msg, title);
      break;
  }
}


const findCustomerCat = (type) => {
  const typeStr = removeSpaceStr(type).toLowerCase()
  let sampleField = ''
  switch (typeStr) {
    case 'fabricator':
      sampleField = 'fabricatPrice'
      break;
    case 'b2bretailshop':
      sampleField = 'retailPrice'
      break;
    case 'sales':
      sampleField = 'endToEndPrice'
      break;
  }
  return sampleField
}

const formatStr = (inputString) => {
  const words = inputString.split(' ');
  const capitalizedWords = words.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  const result = words[0].toLowerCase() + capitalizedWords.join('');
  return result;
}

const showConfirmationDialog = (message, callback, confirmButtonText = 'Yes', cancelButtonText = 'No', title = 'Are you sure?') => {
  Swal.fire({
    title: title,
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    customClass:{
      icon: "swal-icon-custom"
    }
  }).then((result) => {
    if (result.isConfirmed) {
      callback(); // Execute the callback if the user confirms
    } else {
      Swal.fire({
        title: 'Cancelled!',
        text: 'Permission denied.',
        icon: 'error',
        customClass:{
          icon: "swal-icon-custom"
        },
        timer: 1500,
      });
    }
  });
};

async function decrptPassword(passcode) {
  try {
    var bytes = CryptoJS.AES.decrypt(passcode, secretKey);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
  } catch (error) {
    throw error;
  }
}

const convertFeetIntoMtr = (value) => {
  const singleFeetVal = 0.3048
  let result = value * singleFeetVal
  return result;
}

const priceFormat = (price) => {
  let parsedPrice = parseFloat(price);
  let roundedPrice = parsedPrice.toFixed(2);
  return roundedPrice;
}

const calculateQuotationAmount = (quantity, length, width, feet, amount) => {
  let lengthVal = length
  if (feet) {
    lengthVal = convertFeetIntoMtr(length)
  }
  let totalQuantityVal = lengthVal * width * quantity
  let totlaAmount = totalQuantityVal * priceFormat(amount)
  const returnobj = {
    total: totlaAmount,
    quantity: (totalQuantityVal).toFixed(2),
  }
  return returnobj
}

const dateConversion = (date, format = "DD-MM-YYYY") => {
  const data = (date.$d).toString()
  const formatData = "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (zz)";
  const result = date ? moment(data, formatData).format(format) : "";
  return result
}

const roundedAmount =(num, decimals=0) => {
  let factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}

const dateConversionNormal = (date, format = "DD-MM-YYYY") => {
  const result = date ? moment(date).format(format) : "";
  return result
}

const filterArray = (array, filterKey, value) => {
  return array.filter((ele) => { return ele[filterKey] == value })
}

const updateDateConversion = (dateString) => {
  return moment(dateString).locale('en')
}

const removeNullKeyFromObj = (obj) => {
  return _.omitBy(obj, (value) => value === null)
}

const findNullValues = (obj) => {
  for (let key in obj) {
    if (obj[key] === null && [key] != "orderProductId" && [key] != "description") {
      return true;
    }
  }
};

const removeSpaceStr = (str) => {
  return str.replace(/ /g, '')
}

const numberFormat = (val)=>{
  return val.toString().padStart(2, '0')
}

const getRequiredFieldNames = (array) => {
  return array.reduce((acc, obj) => {
    obj.formFields.forEach(field => {
      if (field.required) {
        acc.push(field.name);
      }
    });
    return acc;
  }, []);
};

export {
  showMessage,
  showConfirmationDialog,
  updateDateConversion,
  numberFormat,
  getRequiredFieldNames,
  formatStr,
  dateConversion,
  filterArray,
  decrptPassword,
  dateConversionNormal,
  removeNullKeyFromObj,
  priceFormat,
  calculateQuotationAmount,
  removeSpaceStr,
  roundedAmount,
  findCustomerCat,
  findNullValues,
};