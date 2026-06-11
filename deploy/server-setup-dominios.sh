#!/bin/bash
# Configura SOLO la landing de dominios por país.
# No toca intercertlatam.com, portal.intercertlatam.com ni otros sitios existentes.

set -e

DEPLOY_PATH="/var/www/intercert-landing"
NGINX_SITE="intercert-dominios-paises"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NGINX_CONF="$SCRIPT_DIR/nginx/intercert-dominios-paises.conf"

echo "==> Creando carpeta de la landing: $DEPLOY_PATH"
sudo mkdir -p "$DEPLOY_PATH"
sudo chown -R "$USER:$USER" "$DEPLOY_PATH"

echo "==> Instalando config Nginx NUEVA (archivo separado)"
sudo cp "$NGINX_CONF" "/etc/nginx/sites-available/$NGINX_SITE"

if [ ! -L "/etc/nginx/sites-enabled/$NGINX_SITE" ]; then
  sudo ln -s "/etc/nginx/sites-available/$NGINX_SITE" "/etc/nginx/sites-enabled/$NGINX_SITE"
fi

echo "==> Sitios activos actualmente:"
ls -la /etc/nginx/sites-enabled/

echo "==> Validando Nginx (no recarga si hay error)"
sudo nginx -t

echo "==> Recargando Nginx"
sudo systemctl reload nginx

echo ""
echo "Listo. Esta landing responde SOLO en:"
echo "  intercert.co, intercert.com.pe, intercert.mx, intercert.cr,"
echo "  intercert.ec, intercert.pa"
echo ""
echo "NO se modificaron configs de intercertlatam.com ni portal.intercertlatam.com"
echo "Verifica esos sitios en el navegador después del reload."
