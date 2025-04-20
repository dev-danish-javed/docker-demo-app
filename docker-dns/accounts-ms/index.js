const express = require('express');
const app = express();
const PORT = 80;

app.get('/account', (req, res) => {
    res.json({
        accountId: 'ACC123',
        joinedDate: '2020-01-15',
        salary: 80000
    });
});

app.listen(PORT, () => {
    console.log(`Accounts MS running on port ${PORT}`);
});
