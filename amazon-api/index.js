const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const app = express();

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Success !',
    });
});

app.post('/payment/create', async (req, res) => {
    const total = parseInt(req.query.total);
    console.log('Total amount received:', total);
    if (total > 0) {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: total,
                currency: 'usd',
            });
            console.log('Payment Intent created:', paymentIntent);
            res.status(201).json({
                clientSecret: paymentIntent.client_secret,
            });
        } catch (error) {
            console.error('Error creating payment intent:', error);
            res.status(500).json({ error: 'Payment Intent creation failed' });
        }
    } else {
        res.status(403).json({
            message: 'Total must be greater than 0',
        });
    }
});

const PORT = 5000;
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Amazon Server Running on PORT: ${PORT}, http://localhost:${PORT}`);
});
