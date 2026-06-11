# Configuración Nginx sin romper sitios existentes

## Idea clave (para Joseph)

Nginx enruta por **`server_name`** (el dominio que escribe el usuario en el navegador).

Cada plataforma debe tener **su propio archivo** de configuración:

| Dominio | Qué es | Archivo (ejemplo) | Carpeta |
|---------|--------|-------------------|---------|
| `intercertlatam.com` | Portal / web principal | *ya existe* — **no tocar** | *la que ya tenga* |
| `portal.intercertlatam.com` | Portal helpdesk | *ya existe* — **no tocar** | *la que ya tenga* |
| `intercert.co`, `.mx`, `.ec`… | **Nueva landing** | `intercert-dominios-paises` | `/var/www/intercert-landing` |

Al agregar un **archivo nuevo**, los sitios viejos **siguen igual** porque sus `server_name` no cambian.

```
Usuario entra a intercertlatam.com     → Nginx usa config A → app actual
Usuario entra a portal.intercertlatam  → Nginx usa config B → portal actual
Usuario entra a intercert.co           → Nginx usa config C → landing nueva
```

---

## Antes de tocar nada — respaldo

En el servidor:

```bash
ssh -p 2222 icltmits173@179.43.89.146

sudo mkdir -p /root/nginx-backup-$(date +%Y%m%d)
sudo cp -a /etc/nginx/sites-available /root/nginx-backup-$(date +%Y%m%d)/
sudo cp -a /etc/nginx/sites-enabled   /root/nginx-backup-$(date +%Y%m%d)/
```

---

## Ver qué sitios existen hoy

```bash
ls -la /etc/nginx/sites-enabled/
grep -r "server_name" /etc/nginx/sites-enabled/
```

Anota cuál archivo corresponde a `intercertlatam.com` y cuál a `portal.intercertlatam.com`. **No los edites.**

---

## Instalar SOLO la landing de dominios

Sube el repo al servidor o copia los archivos de `deploy/`. Luego:

```bash
cd /ruta/al/repo/deploy
chmod +x server-setup-dominios.sh
./server-setup-dominios.sh
```

Ese script:

1. Crea `/var/www/intercert-landing`
2. Copia `nginx/intercert-dominios-paises.conf` como **archivo nuevo**
3. Crea symlink en `sites-enabled`
4. Ejecuta `nginx -t` (si falla, **no** recarga)
5. Hace `reload` solo si la prueba pasa

---

## Instalación manual (si prefieres)

```bash
sudo mkdir -p /var/www/intercert-landing
sudo chown -R icltmits173:icltmits173 /var/www/intercert-landing

sudo nano /etc/nginx/sites-available/intercert-dominios-paises
# pegar contenido de deploy/nginx/intercert-dominios-paises.conf

sudo ln -s /etc/nginx/sites-available/intercert-dominios-paises /etc/nginx/sites-enabled/

sudo nginx -t && sudo systemctl reload nginx
```

---

## Comprobar que NO rompiste nada

Después del reload, prueba en el navegador:

- [ ] https://intercertlatam.com — sigue igual
- [ ] https://portal.intercertlatam.com — sigue igual
- [ ] http://intercert.co (cuando DNS apunte al servidor) — muestra la landing

Desde el servidor:

```bash
curl -I -H "Host: intercertlatam.com" http://127.0.0.1
curl -I -H "Host: portal.intercertlatam.com" http://127.0.0.1
curl -I -H "Host: intercert.co" http://127.0.0.1
```

Cada uno debe responder con el sitio correcto (código 200/301/302 según tu config actual).

---

## SSL (HTTPS) solo para los dominios nuevos

Cuando el DNS de `intercert.co`, `.mx`, etc. apunte a `179.43.89.146`:

```bash
sudo certbot --nginx \
  -d intercert.co -d www.intercert.co \
  -d intercert.mx -d www.intercert.mx \
  -d intercert.ec -d www.intercert.ec \
  -d intercert.pa -d www.intercert.pa \
  -d intercert.com.pe -d www.intercert.com.pe \
  -d intercert.cr -d www.intercert.cr \
  -d intercert.es -d www.intercert.es
```

Certbot **añade** bloques SSL al archivo `intercert-dominios-paises`; no modifica los otros sitios.

---

## Si algo sale mal

Restaurar backup:

```bash
sudo rm /etc/nginx/sites-enabled/intercert-dominios-paises
sudo nginx -t && sudo systemctl reload nginx
```

Los sitios originales vuelven a funcionar como antes.

---

## DNS de los dominios TLD

En cada registrador, registro **A** → `179.43.89.146`

Eso es independiente de `intercertlatam.com` (que puede tener su propio DNS).
