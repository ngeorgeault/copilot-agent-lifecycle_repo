---
{
  "title": "Glossaire \u2014 Cycle de vie d\u2019un agent Microsoft Copilot Studio",
  "description": "R\u00e9f\u00e9rentiel des termes cl\u00e9s pour concevoir, s\u00e9curiser, d\u00e9ployer et exploiter des agents Copilot Studio int\u00e9gr\u00e9s \u00e0 Microsoft 365.",
  "author": "Nicolas Georgeault",
  "date": "2025-11-11",
  "version": "1.0.0",
  "license": "MIT",
  "tags": [
    "Copilot Studio",
    "Microsoft 365",
    "ALM",
    "Purview",
    "SharePoint",
    "Dataverse",
    "Entra",
    "Microsoft Graph"
  ]
}
---

# Glossaire — Cycle de vie d’un agent Microsoft Copilot Studio

Ce glossaire couvre **tout le cycle de vie** d’un agent : idéation, conception, données & connaissances, sécurité & conformité, identité & permissions, ALM/DevOps, test & exploitation, amélioration continue.

---

## 1) Noyau Copilot Studio & Microsoft 365 Copilot

- **Copilot Studio** — Plateforme low-code pour **concevoir, tester et publier** des agents (conversations, actions, connaissances, connecteurs). Peut étendre **Microsoft 365 Copilot** et publier des agents vers M365 ou d’autres canaux.  
- **Agent (Copilot Studio)** — Expérience conversationnelle + logique d’orchestration (flows), **connaissances** (sources métiers), **actions** (plugins/APIs), et politiques d’accès.  
- **Microsoft 365 Copilot** — Assistant ancré sur les données de l’utilisateur, **respectant les permissions M365** et les frontières de tenant ; le **Semantic Index** n’expose que le contenu autorisé.  
- **Agent Builder (dans Microsoft 365 Copilot)** — Entrée “Create agents” dans l’app Microsoft 365 Copilot pour **prototyper** et **déployer** des agents intégrés à la suite M365.  
- **Connaissances (Knowledge sources)** — Attache des sources d’entreprise (Power Platform/Dynamics, sites web, systèmes externes) que l’agent peut **citer** et **parcourir** sous contrôle.  
- **Actions / Plugins** — Intégrations préconstruites ou custom permettant d’**exécuter** des opérations (lecture/écriture) dans des apps/SaaS via APIs/Graph.

## 2) Cycle de vie d’un agent (Build–Test–Run)

- **Conception** — Définir objectifs métier, personas, “happy path / edge cases”, critères de succès (KPI), et données nécessaires (qualité/accès).  
- **Itérations & Tests** — Dialog tests, jeu de prompts/contre-exemples, sandbox avec **données de test** isolées ; revues pair.  
- **Publication** — Promotion Dev→Test→Prod, validations sécurité/conformité, **observabilité** et plan de rollback.  
- **Exploitation** — Suivi d’usage, journalisation, feedback, corrections & releases (CHANGELOG), gouvernance vivante.

## 3) Données, connaissance & SharePoint

- **Bibliothèque documentaire (SharePoint)** — Conteneur de fichiers avec **colonnes** (métadonnées) et **types de contenu** ; socle de la gouvernance documentaire.  
- **Types de contenu & colonnes** — Schéma documentaire standard (métadonnées réutilisables) pour améliorer la **recherche** et la pertinence des réponses.  
- **Taxonomie (Managed Metadata)** — Vocabulaire contrôlé (termes/hiérarchies) appliqué aux colonnes pour homogénéiser l’indexation.  
- **SharePoint AutoFill (Copilot pour bibliothèques)** — **Suggère/extraie/classifie/résume** dans des **colonnes** à partir de fichiers ; **seules** les personnes autorisées valident ; **analyse limitée** à la **bibliothèque** concernée.  
- **Sources “On your data” (RAG Azure)** — Connexion des LLM aux **données privées** via **Azure AI Search** (index + embeddings) avec citations ; utile pour FAQ documentaire et recherche sémantique.

## 4) Sécurité, confidentialité, conformité

- **Modèle d’autorisations M365** — Copilot **hérite** des droits existants ; pas d’accès au-delà de ce que l’utilisateur peut voir ; **frontières de tenant** respectées ; **Semantic Index** respecte l’identité.  
- **Sensitivity labels (Purview)** — **Classification/Protection** (chiffrement, marque visuelle, contrôles d’accès). Activation spécifique pour **SharePoint/OneDrive**, ordre de priorité des labels, label par défaut de site/biblio, auto-étiquetage.  
- **Microsoft Purview DLP** — Politiques pour protéger **données au repos/en mouvement/à l’usage** ; applicable aux interactions Microsoft 365 Copilot.  
- **Journal d’audit (Microsoft Purview Audit)** — Traçabilité des activités (recherche, export) pour enquêtes et conformité.  
- **IA responsable (Microsoft)** — Principes (Accountability, Transparency, Fairness, Reliability & Safety, Privacy & Security) et standard d’ingénierie **Responsible AI** applicables aux agents.  
- **Menaces & consentements trompeurs** — Renforcer **MFA**, **politiques de consentement**, et surveillance des apps OAuth ; **restreindre** le consentement utilisateur, **activer** le workflow d’approbation admin.

## 5) Identité & permissions (Entra / Graph)

- **Microsoft Entra ID** — Service d’identité, politiques de **sécurité/accès conditionnel/MFA**, gestion des **consentements** aux applications et des **Workload Identities**.  
- **Microsoft Graph** — API unifiée vers M365 ; modèle de permissions **déléguées** (au nom d’un user) ou **application** (daemon/service).  
- **User vs Admin consent** — Politique qui détermine si l’utilisateur peut consentir ; sinon, **Admin consent workflow** pour file d’attente, revue et approbation.  
- **Least privilege** — Attribuer le **minimum nécessaire** (ressource.opération.contrainte), réviser régulièrement les consentements.

## 6) Gouvernance & rôles

- **PO (Product Owner)** — Porte la valeur métier, KPI, priorisation.  
- **Concepteur/Dev d’agent** — Dialogue design, connaissances, actions, tests, packaging.  
- **Admin (M365/Power Platform)** — Environnements, DLP (Power Platform), accès, logs.  
- **Sécurité/Conformité** — Purview (labels, DLP, audit), politiques, incidents.  
- **QA/Adoption** — Critères d’acceptation, UAT, formation, mesure d’usage.  
- **RACI** — Matrice qui précise qui **R**éalise, qui est **A**pprobateur, qui est **C**onsulté, qui est **I**nformé, **par phase**.

## 7) ALM, environnements & DevOps

- **ALM Power Platform** — Pratiques et **GitHub Actions** officielles pour **exporter/packager/déployer** solutions/artefacts (Dev→Test→Prod).  
- **Environments GitHub** — Couches avec **required reviewers** ; les **secrets** d’environnement ne sont accessibles **qu’après approbation**.  
- **CI/CD** — CI (lint, CodeQL, scan de secrets) ; CD à déclenchement contrôlé, **gates** d’approbation, rollback.  
- **RBAC Dataverse (si utilisé)** — Rôles accumulatifs, portée tables/apps, affectations par équipes/unité d’affaire.  
- **SemVer / Conventional Commits / CHANGELOG** — Versionner proprement, automatiser les notes de version.

## 8) Conception conversationnelle & qualité

- **Intent / Trigger phrase** — Formulations déclencheuses optimisées pour capter l’intention et router vers la bonne logique.  
- **Slot filling** — Collecte guidée des informations manquantes pour accomplir la tâche (contraintes, validations).  
- **Grounding** — Ancrage des réponses sur des **sources de confiance** (M365, connaissances) en respectant les **permissions** ; citations quand c’est prévu.  
- **Evaluation & UAT** — Scénarios d’acceptation, prompts tests “rouges”, jeux de données réalistes mais **non sensibles** en Test.  
- **KPI d’agent** — Précision utile (résolutions avec clics/citations), temps gagné, taux d’adoption, escalades.

## 9) SharePoint & gestion documentaire (spécifiques)

- **AutoFill (SharePoint)** — Extraction/étiquetage **dans les colonnes** avec **validation autorisée** et **périmètre bibliothèque**.  
- **Rétention/Archivage** — Politiques de cycle de vie (conservation, suppression) alignées avec les labels/règles de conformité.  
- **Recherche sémantique + citations** — Avec Azure AI Search / “On your data” pour **FAQ documentaire** et réponses traçables.

## 10) Observabilité, incidents & amélioration continue

- **Audit Purview** — Rechercher les activités pertinentes (accès, partages, opérations agents) et **exporter** pour enquête.  
- **Rapports d’usage M365 Copilot** — Mesure d’adoption, tendances de prompts, opérations ; utile pour la **valeur** et l’optimisation.  
- **Plan d’incident** — Désactivation ciblée, **révocation de consentements**, rotation des secrets, **post-mortem** et actions préventives.  
- **Boucle de feedback** — Collecte des retours (canaux internes), backlog d’améliorations, **release notes** (CHANGELOG).

---

## Acronymes utiles

**ALM** (Application Lifecycle Management), **RBAC** (Role-Based Access Control), **RAG** (Retrieval-Augmented Generation), **DLP** (Data Loss Prevention), **RAI** (Responsible AI), **UAT** (User Acceptance Testing), **PR** (Pull Request), **MFA** (Multi-Factor Authentication).

---

## Références (officielles, sélection)

- Copilot Studio (vue d’ensemble) — https://learn.microsoft.com/microsoft-copilot-studio/overview  
- Copilot Studio (créer et configurer des agents) — https://learn.microsoft.com/microsoft-copilot-studio/create-manage-copilot  
- Microsoft 365 Copilot (sécurité et autorisations) — https://learn.microsoft.com/microsoft-365-copilot/overview-security  
- SharePoint + Copilot (AutoFill, réponses) — https://learn.microsoft.com/sharepoint/copilot  
- Microsoft Graph (autorisations) — https://learn.microsoft.com/graph/permissions-reference  
- Power Platform DevOps (GitHub Actions) — https://learn.microsoft.com/power-platform/alm/devops-github-actions  
- Microsoft Purview — Sensitivity labels — https://learn.microsoft.com/purview/sensitivity-labels  
- Microsoft Purview — Data Loss Prevention — https://learn.microsoft.com/purview/dlp-learn-about-dlp  
- Microsoft Purview — Audit — https://learn.microsoft.com/purview/audit-overview  
- Microsoft Entra — Consentement des applications & workflow d’approbation — https://learn.microsoft.com/entra/identity/enterprise-apps/manage-consent-requests

