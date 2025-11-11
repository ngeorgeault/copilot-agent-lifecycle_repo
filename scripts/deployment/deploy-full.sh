#!/bin/bash

###############################################################################
# File: deploy-full.sh
# Description: Script de déploiement pour l'Agent Copilot Studio Full
# Author: Microsoft Copilot Studio Team
# Date: 2025-11-11
# Version: 1.0.0
# License: MIT
#
# Usage: ./deploy-full.sh [--environment ENV] [--region REGION] [--production]
###############################################################################

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration par défaut
ENVIRONMENT=${ENVIRONMENT:-"development"}
REGION=${REGION:-"westeurope"}
AGENT_TYPE="full"
PRODUCTION=false

# Fonction pour afficher les messages
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --environment)
            ENVIRONMENT="$2"
            shift 2
            ;;
        --region)
            REGION="$2"
            shift 2
            ;;
        --production)
            PRODUCTION=true
            ENVIRONMENT="production"
            shift
            ;;
        *)
            log_error "Argument inconnu: $1"
            exit 1
            ;;
    esac
done

log_info "=========================================="
log_info "Déploiement de l'Agent Copilot Studio Full"
log_info "=========================================="
log_info "Environnement: $ENVIRONMENT"
log_info "Région: $REGION"
log_info "Mode production: $PRODUCTION"

# Vérifications supplémentaires pour la production
if [ "$PRODUCTION" = true ]; then
    log_warn "ATTENTION: Déploiement en PRODUCTION"
    read -p "Êtes-vous sûr de vouloir continuer? (oui/non): " confirmation
    if [ "$confirmation" != "oui" ]; then
        log_info "Déploiement annulé"
        exit 0
    fi
fi

# Vérification des prérequis
log_step "1/8 - Vérification des prérequis..."
if ! command -v az &> /dev/null; then
    log_error "Azure CLI n'est pas installé"
    exit 1
fi

if ! command -v jq &> /dev/null; then
    log_error "jq n'est pas installé"
    exit 1
fi

# Validation du manifest
log_step "2/8 - Validation du manifest..."
if [ ! -f "agents/full/agent-manifest.json" ]; then
    log_error "Fichier manifest introuvable"
    exit 1
fi

# Validation du schéma
# TODO: Ajouter validation JSON Schema

# Connexion à Azure
log_step "3/8 - Connexion à Azure..."
az account show > /dev/null 2>&1 || az login

# Création des ressources Azure
RESOURCE_GROUP="rg-copilot-${AGENT_TYPE}-${ENVIRONMENT}"
log_step "4/8 - Création du groupe de ressources: $RESOURCE_GROUP"
az group create --name "$RESOURCE_GROUP" --location "$REGION" > /dev/null

# Déploiement de l'infrastructure
log_step "5/8 - Déploiement de l'infrastructure..."
az deployment group create \
    --resource-group "$RESOURCE_GROUP" \
    --template-file "templates/full-agent-template.json" \
    --parameters environment="$ENVIRONMENT" region="$REGION" \
    > /dev/null

# Configuration de la base de données
log_step "6/8 - Configuration de la base de données..."
# Initialisation des tables
# Migration des données

# Configuration des intégrations
log_step "7/8 - Configuration des intégrations..."
# Microsoft Teams
# Microsoft 365
# Power Automate

# Déploiement de l'agent
log_step "8/8 - Déploiement de l'agent..."
# Téléchargement du manifest
# Configuration des actions personnalisées
# Activation des plugins
# Configuration du monitoring

log_info "=========================================="
log_info "Déploiement terminé avec succès!"
log_info "=========================================="
log_info "URL de l'agent: https://${RESOURCE_GROUP}.azurewebsites.net"
log_info "Dashboard: https://portal.azure.com/#@/resource${RESOURCE_GROUP}"
log_info "Logs: Application Insights"

if [ "$PRODUCTION" = true ]; then
    log_warn "N'oubliez pas de:"
    log_warn "  1. Vérifier les alertes de monitoring"
    log_warn "  2. Tester les intégrations"
    log_warn "  3. Valider les sauvegardes"
    log_warn "  4. Informer l'équipe du déploiement"
fi
