#!/bin/bash

###############################################################################
# File: deploy-light.sh
# Description: Script de déploiement pour l'Agent Copilot Studio Light
# Author: Microsoft Copilot Studio Team
# Date: 2025-11-11
# Version: 1.0.0
# License: MIT
#
# Usage: ./deploy-light.sh [--environment ENV] [--region REGION]
###############################################################################

set -e

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration par défaut
ENVIRONMENT=${ENVIRONMENT:-"development"}
REGION=${REGION:-"westeurope"}
AGENT_TYPE="light"

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
        *)
            log_error "Argument inconnu: $1"
            exit 1
            ;;
    esac
done

log_info "Déploiement de l'Agent Copilot Studio Light"
log_info "Environnement: $ENVIRONMENT"
log_info "Région: $REGION"

# Vérification des prérequis
log_info "Vérification des prérequis..."
if ! command -v az &> /dev/null; then
    log_error "Azure CLI n'est pas installé"
    exit 1
fi

# Validation du manifest
log_info "Validation du manifest..."
if [ ! -f "agents/light/agent-manifest.json" ]; then
    log_error "Fichier manifest introuvable"
    exit 1
fi

# Connexion à Azure
log_info "Connexion à Azure..."
az account show > /dev/null 2>&1 || az login

# Création du groupe de ressources
RESOURCE_GROUP="rg-copilot-${AGENT_TYPE}-${ENVIRONMENT}"
log_info "Création du groupe de ressources: $RESOURCE_GROUP"
az group create --name "$RESOURCE_GROUP" --location "$REGION" > /dev/null

# Déploiement de l'agent
log_info "Déploiement de l'agent..."
az deployment group create \
    --resource-group "$RESOURCE_GROUP" \
    --template-file "templates/light-agent-template.json" \
    --parameters environment="$ENVIRONMENT" region="$REGION" \
    > /dev/null

# Configuration de l'agent
log_info "Configuration de l'agent..."
# Téléchargement du manifest
# Configuration des paramètres
# Activation des triggers

log_info "Déploiement terminé avec succès!"
log_info "URL de l'agent: https://${RESOURCE_GROUP}.azurewebsites.net"
