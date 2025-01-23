import { format } from 'date-fns';

const formatJsonDate = (date, pattern = 'dd.MM.yyyy') => {
    if (date) {
        return format(jsonDateToDate(date), pattern);
    } else {
        return '';
    }
};

const jsonDateToDate = (date) => {
    if (date) {
        return new Date(Number(date.match(/\d+/)[0]));
    } else {
        return null;
    }
};

const formatTime = (time, pattern = 'HH:mm') => {
    return format(new Date(time), pattern);
};

const formatToOData = (date) => {
    if (!date) {
        return null;
    }

    return format(new Date(date), `yyyy-MM-dd'T'HH:mm:ss`);
};

const formatJsonTime = (time) => {
    if (time?.length !== 11) {
        return '';
    }
    return `${time.substring(2, 4)}:${time.substring(5, 7)}`;
};

export {
    formatJsonDate,
    formatToOData,
    formatTime,
    formatJsonTime,
    jsonDateToDate
};
