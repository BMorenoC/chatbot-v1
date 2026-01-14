# Arquitectura del Sistema

En este documento se describe el diseño técnico y el flujo de datos de la aplicación Chatbot IA.

## Diagrama de Flujo

- User[Usuario (Navegador)] -- HTTP/JSON --> NestJS[Backend (NestJS BFF)]
- NestJS -- Webhook POST --> n8n[Orquestador (n8n)]
- n8n -- API Request --> OpenAI[OpenAI GPT-4o]
- OpenAI -- JSON Response --> n8n
- n8n -- JSON Normalizado --> NestJS
- NestJS -- Respuesta Final --> User

## Stack Tecnológico

- Frontend: Vanilla JS + CSS (estático).
- Backend: NestJS (Node.js framework). Actúa como BFF (Backend For Frontend).
- Orquestación: n8n (Workflow Automation).
- Infraestructura: Docker & Docker Compose.

## Decisiones de Diseño

1. Patrón BFF (Backend For Frontend)
   Se decidió servir el cliente web directamente desde NestJS utilizando ServeStaticModule.

Motivo: Simplifica el despliegue en un entorno de prueba, elimina problemas de CORS y centraliza la validación de datos antes de tocar el orquestador de IA.

2. Desacoplamiento de la IA (n8n)
   La lógica de negocio de la IA no reside en el código, sino en n8n.

Motivo: Permite modificar el prompt, cambiar el modelo (GPT-4 a Claude, etc.) o agregar herramientas (búsqueda web) sin necesidad de re-desplegar el backend.
