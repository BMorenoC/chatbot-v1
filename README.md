# Asistente Virtual IA (NestJS + n8n + Docker)

Este proyecto es una implementación técnica de un Chatbot Inteligente utilizando una arquitectura moderna orientada a servicios. Integrando un backend robusto en NestJS que actúa como Backend For Frontend, orquestación de flujos de IA con n8n y despliegue contenedor con Docker.

## Tabla de Contenidos

- [Asistente Virtual IA (NestJS + n8n + Docker)](#asistente-virtual-ia-nestjs--n8n--docker)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Arquitectura](#arquitectura)
  - [Requisitos Previos](#requisitos-previos)
  - [Instalación y Despliegue](#instalación-y-despliegue)
    - [1. Clonar y preparar](#1-clonar-y-preparar)
    - [2. Levantar la Infraestructura (n8n)](#2-levantar-la-infraestructura-n8n)
    - [3. Configurar Variables de Entorno](#3-configurar-variables-de-entorno)
    - [4. Iniciar la Aplicación (Backend + Frontend)](#4-iniciar-la-aplicación-backend--frontend)
  - [configurar n8n](#configurar-n8n)
    - [1. Importar el Flujo](#1-importar-el-flujo)
    - [2. Configurar Credenciales](#2-configurar-credenciales)
    - [3. Activar el flujo](#3-activar-el-flujo)
  - [Probar](#probar)
  - [Notas Adicionales](#notas-adicionales)

---

## Arquitectura

El sistema sigue el patrón **BFF (Backend For Frontend)** para desacoplar la lógica de presentación de la lógica de negocio de la IA.

- **Frontend:** HTML5, CSS3 y Vanilla JS (Servido estáticamente por NestJS).
- **Backend:** NestJS (TypeScript). Gestiona la seguridad, CORS y normaliza la comunicación entre el cliente y el orquestador.
- **Orquestador:** n8n. Maneja la lógica conversacional, la memoria y la integración con OpenAI (GPT-4o-mini).
- **Infraestructura:** Docker & Docker Compose.

---

## Requisitos Previos

Asegurarse de tener instalado:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Corriendo).
- [Node.js](https://nodejs.org/) (v18 o superior).
- Una **API Key de OpenAI** válida.

---

## Instalación y Despliegue

Sigue estos pasos para levantar el entorno completo:

### 1. Clonar y preparar

```bash
git clone <URL_DE_TU_REPOSITORIO>
cd chatbot-v1
```

---

### 2. Levantar la Infraestructura (n8n)

```bash
docker-compose up -d #solo si se quiere activar el servicio de n8n por terminal
```

---

### 3. Configurar Variables de Entorno

Navegar a la carpeta de la aplicación y crear tu archivo de configuración local

```bash
cd chatbot-app
cp .env.example .env
```

(Opcional) Abre el archivo .env creado si necesitas ajustar el puerto o la URL del webhook manualmente.

---

### 4. Iniciar la Aplicación (Backend + Frontend)

```bash
cd chatbot-app
npm install
npm run start:dev ##El servidor iniciará
```

---

## configurar n8n

Para que el chatbot responda, necesitas cargar su lógica:

### 1. Importar el Flujo

- Acceder a http://localhost:5678.
- Ver a Workflows > Import from File.
- Seleccionar el archivo n8n-chat-agent.json ubicado en la carpeta /docs de este proyecto.

### 2. Configurar Credenciales

- Dentro del flujo, hacer doble clic en el nodo OpenAI Chat Model.
- En "Credential", seleccionar "Create New" y pega tu API Key de OpenAI.

### 3. Activar el flujo

- Hacer clic en el botón "Publish" (o el interruptor "Inactive") en la esquina superior derecha.
- Asegurarse de que quede en Verde (Active).

---

## Probar

- Abrir tu navegador en: http://localhost:3000
- Escribir un mensaje (Ej: "Hola, me puedes decir como estará el clima hoy?").

El sistema procesará tu solicitud a través de NestJS -> n8n -> OpenAI y devolverá la respuesta.

---

## Notas Adicionales

Para más detalles sobre decisiones de diseño o solución de problemas, revisar la carpeta `docs`.
