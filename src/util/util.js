export const generateUniqueNumber = (length) => {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
  }

  export const logger = (...args) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(...args);
    }
  };

  // const commaSeparators = (number) => {
    //     if (String(number) == "") {
    //         return number
    //     } else {
    //         const parts = number.toString().split('.');
    //         parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    //         const formattedNumber = parts.join('.');
    //         return formattedNumber;
    //     }
    // };