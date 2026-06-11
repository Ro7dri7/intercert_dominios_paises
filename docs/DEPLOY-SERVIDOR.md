# Deploy en servidor propio (contraseña SSH)

GitHub hace build y sube archivos al servidor. **No uses Settings → Pages.**

---

## Secrets en GitHub

Repo → **Settings → Secrets and variables → Actions → New repository secret**

| Secret | Valor |
|--------|-------|
| `SSH_HOST` | `179.43.89.146` |
| `SSH_PORT` | `2222` |
| `SSH_USER` | `icltmits173` |
| `SSH_PASSWORD` | contraseña del servidor (la pones tú; no va en el código) |
| `DEPLOY_PATH` | `/var/www/intercert-landing` |

**No subas la contraseña al repositorio.** Solo en Secrets.

---

## IPs del servidor (misma máquina)

| Dónde | SSH |
|-------|-----|
| Oficina | `ssh -p 2222 icltmits173@192.168.3.146` |
| Internet / GitHub | `ssh -p 2222 icltmits173@179.43.89.146` |

GitHub Actions siempre usa **`179.43.89.146`**.

---

## Orden de trabajo (primera vez)

### 1. Crear secrets en GitHub (tabla de arriba)

### 2. Configurar Nginx sin romper otros sitios

Guía detallada: **[NGINX.md](NGINX.md)**

Resumen: se agrega un **archivo nuevo** `intercert-dominios-paises.conf`.  
**No se toca** `intercertlatam.com` ni `portal.intercertlatam.com`.

En el servidor:

```bash
ssh -p 2222 icltmits173@179.43.89.146
# subir/copiar la carpeta deploy/ del repo, luego:
cd deploy
chmod +x server-setup-dominios.sh
./server-setup-dominios.sh
```

### 3. Deploy automático

Cada push a `main` ejecuta `.github/workflows/deploy.yml`.

O manual: **Actions → Deploy landing to server → Run workflow**

### 4. Deploy manual desde Windows

```powershell
cd "c:\dominios paises\landing-intercert"
npm run build
scp -P 2222 -r dist/* icltmits173@179.43.89.146:/var/www/intercert-landing/
```

Te pedirá la contraseña en pantalla (normal).

---

## Seguridad

- Cambia la contraseña si se compartió por chat o correo.
- A medio plazo conviene migrar a clave SSH solo para GitHub (más seguro que password en Secrets).
