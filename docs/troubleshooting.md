# Solución de Problemas Comunes

Si encuentras problemas al levantar el entorno, revisa esta lista.

## 1. El Chat se queda pensando infinitamente

- **Causa:** n8n no está activo o la URL del Webhook no coincide.
- **Solución:** Ve a `http://localhost:5678`, abre el flujo y asegúrate de que el interruptor diga **Active (Verde)**. Verifica que no estés usando la URL de "Test".

## 2. Error: "Port 3000/5678 already in use"

- **Causa:** Tienes otro servicio corriendo en esos puertos o una instancia antigua de Docker.
- **Solución:**
  ```bash
  docker-compose down
  # Identifica qué proceso usa el puerto y mátalo, o cambia los puertos en docker-compose.yml
  ```

## 3. Error de conexión con OpenAI

- **Causa:** La API Key no está configurada o se excedió la cuota.
- **Solución:** Revisa las credenciales dentro del nodo de OpenAI en n8n.

## 4. Cambios en el Frontend no se reflejan

- **Causa:** El navegador está usando una versión en caché del CSS/JS.
- **Solución:** Abre las herramientas de desarrollador (F12), ve a la pestaña "Network" y marca "Disable Cache", o prueba en modo Incógnito.
