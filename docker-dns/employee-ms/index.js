const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 8081;

app.get('/employee-service', async (req, res) => {
    try {
        const response = await axios.get('http://accounts.abc.com/account');
        const account = response.data;

        const serviceYears = new Date().getFullYear() - new Date(account.joinedDate).getFullYear();

        res.json({
            employeeId: 'EMP001',
            yearsOfService: serviceYears,
            baseSalary: account.salary,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to fetch account data' });
    }
});

app.listen(PORT, () => {
    console.log(`Employee MS running on port ${PORT}`);
});
