#!/bin/bash
echo "🧪 Iniciando auditoría de dependencias BirdsColor..."

echo "📦 Verificando dependencias desactualizadas:"
npm run check-outdated

echo ""
echo "🛡️ Ejecutando auditoría de seguridad:"
npm run check-security

echo ""
echo "👁️ Exploración interactiva con npm-check:"
npm run check-interactive
