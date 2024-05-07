const commaSeparators = (number) => {
    if (String(number) == "") {
      return number
    } else {
      const parts = number.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      const formattedNumber = parts.join('.');
      return formattedNumber;
    }

  };