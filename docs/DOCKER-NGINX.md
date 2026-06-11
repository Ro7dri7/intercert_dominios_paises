# Deploy con Docker — contenedor `intercert_nginx`

En este servidor **80/443 los maneja Docker**, no Nginx del sistema.

```
Internet → intercert_nginx (Docker) → según dominio:
  intercertlatam.com        → /var/www/frontend
  portal.intercertlatam.com → helpdesk :3005
  intercert.co / .mx / .ec  → /var/www/intercert-landing  (NUEVO)
```

El Nginx de systemd (`systemctl nginx`) **no debe usarse** en este servidor.

---

## Paso 1 — Ubicar el proyecto intercert-latam en el servidor

```bash
docker inspect intercert_nginx --format '{{range .Mounts}}{{println .Source " -> " .Destination}}{{end}}'
```

Busca la ruta host de `nginx.cloudflare.conf`, por ejemplo:

`/home/icltmits173/intercert-latam/nginx/nginx.cloudflare.conf`

---

## Paso 2 — Montar la carpeta de la landing en Docker

Edita `docker-compose.production.yml` del proyecto **intercert-latam**.

En el servicio `nginx`, sección `volumes`, agrega:

```yaml
      - /var/www/intercert-landing:/var/www/intercert-landing:ro
```

Quedaría junto a las otras líneas (`./frontend/dist:/var/www/frontend:ro`, etc.).

---

## Paso 3 — Agregar server block en nginx.cloudflare.conf

Abre `nginx/nginx.cloudflare.conf` y **antes del último `}`** del bloque `http {` pega el contenido de:

`deploy/nginx/docker-intercert-dominios.snippet.conf`

(de este repo `intercert_dominios_paises`)

No modifiques los bloques de `intercertlatam.com` ni `portal.intercertlatam.com`.

---

## Paso 4 — Subir archivos de la landing

Desde Windows (oficina):

```powershell
cd "c:\dominios paises\landing-intercert"
npm run build
scp -P 2222 -r dist/* icltmits173@192.168.3.146:/var/www/intercert-landing/
```

---

## Paso 5 — Validar y recargar solo el contenedor Nginx

```bash
cd /ruta/al/intercert-latam   # donde está docker-compose.production.yml

docker exec intercert_nginx nginx -t
docker compose -f docker-compose.production.yml up -d nginx
# o: docker restart intercert_nginx
```

Si `nginx -t` falla, **no reinicies** — corrige el archivo.

---

## Paso 6 — Probar

```bash
curl -I -H "Host: intercertlatam.com" http://127.0.0.1
curl -I -H "Host: portal.intercertlatam.com" http://127.0.0.1
curl -I -H "Host: intercert.co" http://127.0.0.1
ls /var/www/intercert-landing/
```

---

## Limpiar Nginx del sistema (opcional)

Evita confusiones:

```bash
sudo rm -f /etc/nginx/sites-enabled/intercert-dominios-paises
sudo systemctl disable nginx
```

---

## SSL por dominio TLD

Mientras uses el certificado self-signed actual, los dominios TLD tendrán aviso de certificado en el navegador hasta que se emitan certs propios (Let's Encrypt por dominio o Cloudflare delante).

---

## DNS

Registro **A** de cada TLD → IP pública `179.43.89.146` (o la que use Cloudflare/proxy delante del servidor).
