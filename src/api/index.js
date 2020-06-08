import axios from 'axios';

export const fetchCompaniesApi = async () => {
    const response = await axios.get('https://recruitment.hal.skygate.io/companies').then(res => res.data);
    const mapCompany = await Promise.all(
        response.map(async (element) => {
            element.totalAmount = await getTotalAmountForCompany(element.id);
            return element;
        })
    );
    return response;
}

export const fetchCompanyByIdApi = async (id) => {
    const response = await axios.get(`https://recruitment.hal.skygate.io/companies`).then(res => res.data);
    const company = response.find(company => company.id == id);
    const mapCompany = await Promise.all(
        response.map(async (element) => {
            element.totalAmount = await getTotalAmountForCompany(element.id);
            element.averageAmount = await getAverageIncomeForCompany(element.id);
            element.lastMonthAmount = await getLastMonthForCompany(element.id);
            return element;
        })
    );
    return company;
};

export const getTotalAmountForCompany = async (id) => {
    const response = await axios.get(`https://recruitment.hal.skygate.io/incomes/${id}`).then(res => res.data);
    return response.incomes.reduce((accumulator, currentIncome) => accumulator + Math.ceil(Number(currentIncome.value)), 0);
}

export const getAverageIncomeForCompany = async (id) => {
    const response = await axios.get(`https://recruitment.hal.skygate.io/incomes/${id}`).then(res => res.data);
    return Math.ceil(response.incomes.reduce((accumulator, currentIncome) => accumulator + Number(currentIncome.value), 0) / response.incomes.length);
}

export const getLastMonthForCompany = async (id) => {
    const response = await axios.get(`https://recruitment.hal.skygate.io/incomes/${id}`).then(res => res.data);
    const sortedIncomes = response.incomes.sort((a, b) => new Date(b.date) - new Date(a.date));
    const filteredIncomes = sortedIncomes.filter((income) =>
        new Date(income.date).getMonth() === new Date(sortedIncomes[0].date).getMonth() &&
        new Date(income.date).getYear() === new Date(sortedIncomes[0].date).getYear());
    return Math.ceil(filteredIncomes.reduce((accumulator, currentIncome) => accumulator + Number(currentIncome.value), 0));
}