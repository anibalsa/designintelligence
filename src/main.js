// src/main.js
import './../styles.css'; // O Vite importa o CSS direto no JS
import { inicializarAgente01 } from './agente01/engine.js';

// Inicializa o sistema
document.addEventListener('DOMContentLoaded', () => {
    console.log('Design Intelligence System Active');
    inicializarAgente01();
});