# INTERCERT LATAM — Landing por dominios

Landing page estática desplegada en **GitHub Pages** y servida en los dominios TLD de INTERCERT por país.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Despliegue (GitHub Actions)

Cada push a `main` ejecuta el workflow `.github/workflows/deploy.yml` y publica el contenido de `dist/` en GitHub Pages.

### Configuración en GitHub (una sola vez)

1. **Settings → Pages**
   - **Source:** GitHub Actions
   - Si el deploy falla con `404 Not Found`, entra aquí y confirma que Pages esté activado con origen **GitHub Actions** (no “Deploy from branch”).

2. **Settings → Actions → General**
   - **Workflow permissions:** *Read and write permissions*
   - Marca **Allow GitHub Actions to create and approve pull requests** si tu org lo exige

3. **Settings → Environments → github-pages**
   - Debe existir el environment `github-pages` (GitHub lo crea al activar Pages).
   - Si no aparece, vuelve a **Settings → Pages** y guarda con source **GitHub Actions**.

4. **DNS en cada registrador** (mismo destino para todos los dominios):

   | Tipo  | Nombre | Valor |
   |-------|--------|-------|
   | CNAME | `@` o `www` | `ro7dri7.github.io` |
   | A     | `@` | `185.199.108.153` |
   | A     | `@` | `185.199.109.153` |
   | A     | `@` | `185.199.110.153` |
   | A     | `@` | `185.199.111.153` |

   Usa CNAME para subdominios (`www`) o apex según permita tu registrador. GitHub validará HTTPS automáticamente.

5. **Custom domains** (en Settings → Pages): agrega cada dominio (`intercert.co`, `intercert.mx`, …).

### Dominios configurados

| País       | Dominio            |
|------------|--------------------|
| Colombia   | intercert.co       |
| México     | intercert.mx       |
| Ecuador    | intercert.ec       |
| Panamá     | intercert.pa       |
| Perú       | intercert.com.pe   |
| Costa Rica | intercert.cr       |
| España     | intercert.es       |

Todos sirven la misma landing. La lista vive en `src/config/domains.ts`.

## Estructura

```
src/pages/LandingPage.tsx   # Página principal
src/config/domains.ts       # Dominios por país
.github/workflows/deploy.yml
public/assets/images/       # Imágenes estáticas
```
