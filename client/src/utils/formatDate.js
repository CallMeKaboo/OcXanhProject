import { format } from 'date-fns';
const formatDate = (values) => {
    return format(new Date(values), 'dd-MM-yyyy');
};

export default formatDate;
