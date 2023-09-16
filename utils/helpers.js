const dayjs = require('dayjs');

module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    // date.toLocaleDateString();
    const d = new Date(date);
    const formattedDate = dayjs(d).format('DD/MM/YYYY');
    return formattedDate;
  },
};
