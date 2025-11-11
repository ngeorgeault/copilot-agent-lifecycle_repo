<!--
File: SECURITY.md
Description: Politique de sécurité du projet
Author: Microsoft Copilot Studio Team
Date: 2025-11-11
Version: 1.0.0
License: MIT
-->

# Politique de Sécurité

## Versions Supportées

Nous prenons la sécurité au sérieux. Voici les versions actuellement supportées avec des mises à jour de sécurité:

| Version | Supportée          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Signaler une Vulnérabilité

### Processus de Signalement

Si vous découvrez une vulnérabilité de sécurité, **NE PAS** créer une issue publique sur GitHub.

Au lieu de cela, veuillez:

1. **Envoyer un email** à: security@copilot-studio.com
2. **Inclure** les informations suivantes:
   - Description détaillée de la vulnérabilité
   - Étapes pour reproduire
   - Impact potentiel
   - Version(s) affectée(s)
   - Suggestions de correctif (si disponibles)

3. **Attendre** notre réponse initiale (sous 48h ouvrées)

### Ce que vous pouvez attendre

- **Accusé de réception** dans les 48 heures
- **Évaluation initiale** dans les 5 jours ouvrables
- **Mise à jour régulière** sur le statut
- **Crédit** dans les notes de version si désiré
- **Coordination** pour la divulgation responsable

## Bonnes Pratiques de Sécurité

### Pour les Développeurs

#### Secrets et Credentials

```bash
# ❌ NE JAMAIS FAIRE
git add .env
git commit -m "Add configuration"

# ✅ TOUJOURS FAIRE
# Ajouter .env dans .gitignore
echo ".env" >> .gitignore
# Utiliser Azure Key Vault pour les secrets en production
```

#### Variables d'Environnement

```javascript
// ❌ Mauvais
const apiKey = "ma-cle-secrete-1234";

// ✅ Bon
const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY must be set");
}
```

#### Validation des Entrées

```javascript
// ✅ Toujours valider les entrées utilisateur
function processMessage(message) {
  if (typeof message !== 'string' || message.length > 5000) {
    throw new Error("Invalid message");
  }
  // Traitement...
}
```

### Pour les Déploiements

#### Azure Key Vault

```bash
# Créer un Key Vault
az keyvault create --name kv-copilot --resource-group rg-copilot

# Stocker un secret
az keyvault secret set \
  --vault-name kv-copilot \
  --name "DbPassword" \
  --value "votre-mot-de-passe-fort"

# Récupérer dans l'application
# Via Managed Identity, pas de credentials nécessaires
```

#### Managed Identity

```bash
# Activer Managed Identity pour l'App Service
az webapp identity assign \
  --name your-app \
  --resource-group your-rg

# Donner accès au Key Vault
az keyvault set-policy \
  --name kv-copilot \
  --object-id <managed-identity-id> \
  --secret-permissions get list
```

#### Network Security

```bash
# Configurer les règles de pare-feu
az sql server firewall-rule create \
  --resource-group your-rg \
  --server sql-copilot \
  --name AllowAzureServices \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0

# Activer Private Link pour plus de sécurité
```

### Pour les Utilisateurs

#### Authentication

- ✅ Utiliser Azure AD pour l'authentification
- ✅ Activer MFA (Multi-Factor Authentication)
- ✅ Utiliser des mots de passe forts et uniques
- ✅ Renouveler régulièrement les credentials

#### Monitoring

- ✅ Activer Application Insights
- ✅ Configurer des alertes de sécurité
- ✅ Examiner régulièrement les logs
- ✅ Surveiller les accès inhabituels

## Checklist de Sécurité

### Avant le Déploiement

- [ ] Tous les secrets sont dans Key Vault ou variables d'environnement
- [ ] Aucun secret dans le code source
- [ ] TLS 1.3 activé
- [ ] Managed Identity configurée
- [ ] Pare-feu configuré
- [ ] RBAC configuré
- [ ] Logs et monitoring activés

### Configuration Recommandée

```json
{
  "security": {
    "authentication": "azure_ad",
    "authorization": "rbac",
    "encryption": {
      "transport": "tls_1.3",
      "at_rest": "aes_256_gcm"
    },
    "network": {
      "private_endpoints": true,
      "firewall_enabled": true
    },
    "monitoring": {
      "security_alerts": true,
      "audit_logs": true
    }
  }
}
```

## Mises à Jour de Sécurité

### Dépendances

Nous utilisons:
- **Dependabot** pour les mises à jour automatiques
- **npm audit** pour scanner les vulnérabilités
- **Azure Security Center** pour les recommandations

### Process

1. Vérification automatique quotidienne
2. Revue manuelle hebdomadaire
3. Application des patchs critiques: < 24h
4. Application des patchs importants: < 7 jours
5. Application des patchs mineurs: < 30 jours

## Compliance

Ce projet vise à être conforme avec:
- **GDPR** (Protection des données)
- **ISO 27001** (Sécurité de l'information)
- **SOC 2** (Contrôles de sécurité)

### Protection des Données

- Chiffrement des données au repos et en transit
- Minimisation des données collectées
- Droit à l'oubli respecté
- Logs anonymisés
- Résidence des données configurable

## Ressources

- [Azure Security Best Practices](https://docs.microsoft.com/azure/security/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [Microsoft Security Response Center](https://msrc.microsoft.com/)

## Contact

- **Security Email**: security@copilot-studio.com
- **PGP Key**: [Disponible sur demande]
- **Security Advisory**: https://github.com/ngeorgeault/copilot-agent-lifecycle_repo/security/advisories

---

**Dernière mise à jour**: 2025-11-11

Merci de nous aider à maintenir ce projet sécurisé! 🔒
