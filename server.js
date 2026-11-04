
// require('dotenv').config();

// const express = require('express');
// const nodemailer = require('nodemailer');
// const rateLimit = require('express-rate-limit');
// const path = require('path');

import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


const app = express();
const PORT = 3000;

// Middleware
app.use(express.json({ limit: '10kb' }));

// Раздаём файлы сайта
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

// Ограничение запросов
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    message: {
        success: false,
        message: 'Too many requests. Try again later.'
    }
});

// Настраиваем Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Проверка подключения к Gmail
transporter.verify()
    .then(() => {
        console.log('Gmail SMTP connection successful!');
    })
    .catch((error) => {
        console.error('Gmail SMTP connection error:', error.message);
    });

// Endpoint для формы
app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;

        // Проверяем обязательные поля
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please fill in all required fields.'
            });
        }

        // Проверяем типы и длину данных
        if (
            typeof name !== 'string' ||
            typeof email !== 'string' ||
            typeof message !== 'string' ||
            name.length > 100 ||
            email.length > 254 ||
            message.length > 5000 ||
            (phone != null && (typeof phone !== 'string' || phone.length > 40)) ||
            (service != null && (typeof service !== 'string' || service.length > 100))
        ) {
            return res.status(400).json({
                success: false,
                message: 'Invalid form data.'
            });
        }

        const cleanName = name.trim();
        const cleanEmail = email.trim();
        const cleanMessage = message.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
            !cleanName ||
            !cleanMessage ||
            !emailPattern.test(cleanEmail)
        ) {
            return res.status(400).json({
                success: false,
                message: 'Please enter valid information.'
            });
        }

        // Отправляем письмо
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            replyTo: cleanEmail,
            subject: 'Neue Kundenanfrage – Website',
            text: `
Neue Kundenanfrage

Name: ${cleanName}
E-Mail: ${cleanEmail}
Telefon: ${phone || 'Nicht angegeben'}
Dienstleistung: ${service || 'Nicht angegeben'}

Nachricht:
${cleanMessage}
            `
        });

        return res.status(200).json({
            success: true,
            message: 'Your request has been sent successfully!'
        });

    } catch (error) {
        console.error('Email sending error:', error);

        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again later.'
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
