<!--
File: deployment-guide.md
Description: Guide de déploiement des Agents Microsoft Copilot Studio
Author: Microsoft Copilot Studio Team
Date: 2025-11-11
Version: 1.0.0
License: MIT
-->

# Guide de Déploiement

## Prérequis

### Outils Requis
- Azure CLI (version 2.50+)
- Git
- Node.js 18+ (pour les scripts)
- jq (pour le traitement JSON)

### Comptes et Abonnements
- Abonnement Azure actif
- Accès Azure Active Directory
- Permissions de déploiement

## Déploiement Agent Light

### 1. Préparation

```bash
# Cloner le repository
git clone https://github.com/ngeorgeault/copilot-agent-lifecycle_repo.git
cd copilot-agent-lifecycle_repo

# Vérifier les prérequis
az --version
node --version
```

### 2. Configuration

```bash
# Copier le fichier de configuration
cp config/development.json.example config/development.json

# Éditer avec vos paramètres
nano config/development.json
```

### 3. Déploiement

```bash
# Se positionner dans le répertoire
cd scripts/deployment

# Rendre le script exécutable
chmod +x deploy-light.sh

# Déployer en development
./deploy-light.sh --environment development --region westeurope
```

### 4. Vérification

```bash
# Vérifier le déploiement
az resource list --resource-group rg-copilot-light-development

# Tester l'endpoint
curl https://rg-copilot-light-development.azurewebsites.net/health
```

## Déploiement Agent Full

### 1. Préparation Avancée

```bash
# Variables d'environnement
export AZURE_TENANT_ID="votre-tenant-id"
export AZURE_CLIENT_ID="votre-client-id"
export AZURE_CLIENT_SECRET="votre-secret"
```

### 2. Configuration Enterprise

```bash
# Copier et configurer
cp config/production.json.example config/production.json

# Configurer les secrets dans Azure Key Vault
az keyvault create --name kv-copilot-prod --resource-group rg-copilot-full-production
az keyvault secret set --vault-name kv-copilot-prod --name "DbConnectionString" --value "votre-string"
```

### 3. Déploiement Production

```bash
# Déploiement avec validation
cd scripts/deployment
chmod +x deploy-full.sh

# Mode interactif avec confirmation
./deploy-full.sh --production --region westeurope
```

### 4. Configuration Post-Déploiement

#### Intégration Teams
```bash
# Configurer l'app Teams
az bot create --resource-group rg-copilot-full-production \
    --name copilot-full-bot \
    --kind registration
```

#### Configuration Microsoft 365
```bash
# Enregistrer l'application Azure AD
az ad app create --display-name "Copilot Full Agent"
```

## Environnements

### Development
- URL: `https://dev-copilot.azurewebsites.net`
- Base de données: Development
- Monitoring: Basic

### Staging
- URL: `https://staging-copilot.azurewebsites.net`
- Base de données: Staging (copie de prod)
- Monitoring: Complet

### Production
- URL: `https://copilot.azurewebsites.net`
- Base de données: Production
- Monitoring: Complet avec alertes

## Rollback

### En cas de problème

```bash
# Récupérer la version précédente
az webapp deployment slot swap \
    --resource-group rg-copilot-full-production \
    --name copilot-agent \
    --slot staging \
    --target-slot production \
    --action swap

# Vérifier
curl https://copilot.azurewebsites.net/version
```

## Troubleshooting

### Problème de connexion Azure

```bash
# Réinitialiser la connexion
az logout
az login --tenant votre-tenant-id
```

### Erreur de déploiement

```bash
# Consulter les logs
az webapp log tail --name copilot-agent --resource-group rg-copilot-full-production

# Logs de déploiement
az webapp log deployment show --name copilot-agent --resource-group rg-copilot-full-production
```

### Performance dégradée

```bash
# Vérifier les métriques
az monitor metrics list --resource copilot-agent --metric-names "CPU Percentage"

# Augmenter les ressources si nécessaire
az webapp update --resource-group rg-copilot-full-production --name copilot-agent --set properties.siteConfig.numberOfWorkers=4
```

## Best Practices

1. **Toujours tester en development d'abord**
2. **Utiliser des slots de déploiement pour la production**
3. **Activer le monitoring dès le début**
4. **Documenter les changements de configuration**
5. **Maintenir des sauvegardes régulières**
6. **Utiliser des secrets via Key Vault**
7. **Implémenter une stratégie de rollback**

## Checklist de Déploiement

- [ ] Prérequis installés et vérifiés
- [ ] Configuration des environnements
- [ ] Secrets configurés dans Key Vault
- [ ] Tests de validation passés
- [ ] Monitoring configuré
- [ ] Alertes définies
- [ ] Documentation mise à jour
- [ ] Équipe informée
- [ ] Plan de rollback préparé
- [ ] Backup effectué

## Support

En cas de problème lors du déploiement:
- Consulter les [issues GitHub](https://github.com/ngeorgeault/copilot-agent-lifecycle_repo/issues)
- Contacter: support@copilot-studio.com
- Documentation Azure: https://docs.microsoft.com/azure
