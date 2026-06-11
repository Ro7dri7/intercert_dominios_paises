# INTERCERT LATAM — Landing por dominios

Landing estática (Vite + React) en **servidor propio** con Nginx.  
Código en GitHub; deploy por SSH con contraseña (Secrets).

## Desarrollo local

```bash
npm install
npm run dev
```

## Documentación de deploy

| Tema | Archivo |
|------|---------|
| GitHub Secrets + SSH | [docs/DEPLOY-SERVIDOR.md](docs/DEPLOY-SERVIDOR.md) |
| Nginx sin romper intercertlatam.com / portal | [docs/NGINX.md](docs/NGINX.md) |

## Secrets en GitHub (Settings → Secrets → Actions)

| Secret | Valor |
|--------|-------|
| `SSH_HOST` | `179.43.89.146` |
| `SSH_PORT` | `2222` |
| `SSH_USER` | `icltmits173` |
| `SSH_PASSWORD` | contraseña del servidor |
| `DEPLOY_PATH` | `/var/www/intercert-landing` |

## Dominios de esta landing

| País | Dominio |
|------|---------|
| Colombia | intercert.co |
| Perú | intercert.com.pe |
| México | intercert.mx |
| Costa Rica | intercert.cr |
| Ecuador | intercert.ec |
| Panamá | intercert.pa |

**No afecta** a `intercertlatam.com` ni `portal.intercertlatam.com`.
