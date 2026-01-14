---

### 2. `docs/guia-n8n.md`

Este archivo es **CRUCIAL**. Si el entrevistador baja tu repo, Docker levantará un n8n **vacío**. Necesitan saber cómo cargar tu cerebro.

_(Nota: Para que esto funcione, necesitas exportar tu flujo de n8n. Abajo te digo cómo)._

````markdown
# Configuración del Cerebro (n8n)

Docker levantará el servicio de n8n, pero es necesario importar el flujo de trabajo workflow (n8n-chat-agent) para que el chatbot funcione.

## Pasos de Importación

1.  Asegúrate de que el contenedor de n8n esté corriendo (`http://localhost:5678`).
2.  Ve al menú de **Workflows** > **Import from File**.
3.  Selecciona el archivo `n8n-chat-agent.json` ubicado en la carpeta `docs` de este repositorio.
4.  Abre el nodo **OpenAI Chat Model** y configura tu Credencial (API Key).
5.  **IMPORTANTE:** Haz clic en el botón **Active** (arriba a la derecha) para poner el flujo en producción.

## Endpoints del Workflow

- **Método:** POST
- **URL Producción:** `http://localhost:5678/webhook/chat`
- **Body Esperado:**
  ```json
  {
    "message": "Hola, ¿cómo estás?"
  }
  ```
````
